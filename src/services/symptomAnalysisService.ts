 // src/services/symptomAnalysisService.ts
import { 
  SymptomAnalysisResult, 
  PrescriptionRecommendation,
  HerbModification,
  Formula,
  Herb,
  Symptom,
  MeridianId
} from '../types/tcm-entities';
import { sixMeridiansData } from '../data/sixMeridiansData';
import { formulaData } from '../data/formulaData';
import { herbData } from '../data/herbData';
import { symptomData } from '../data/symptomData';

// 症状权重配置（核心症状权重更高）
const SYMPTOM_WEIGHTS: Record<string, number> = {
  // 太阳经核心症状
  '恶寒': 2.0,
  '发热': 1.8,
  '头痛': 1.5,
  '项强': 1.5,
  '脉浮': 2.0,
  
  // 阳明经核心症状
  '壮热': 2.5,
  '大汗': 2.0,
  '大渴': 2.0,
  '便秘': 1.8,
  '脉洪大': 2.0,
  
  // 少阳经核心症状
  '往来寒热': 2.5,
  '胸胁苦满': 2.0,
  '口苦': 1.8,
  '咽干': 1.5,
  '脉弦': 2.0,
  
  // 太阴经核心症状
  '腹满': 2.0,
  '呕吐': 1.8,
  '自利': 1.8,
  '腹痛': 1.5,
  '脉弱': 1.8,
  
  // 少阴经核心症状
  '脉微细': 2.5,
  '但欲寐': 2.0,
  '四肢厥逆': 2.0,
  '畏寒': 2.0,
  
  // 厥阴经核心症状
  '消渴': 2.0,
  '气上撞心': 1.8,
  '心中疼热': 1.8,
  '饥不欲食': 1.5,
  '寒热错杂': 2.0
};

// 六经ID到中文名称映射
const MERIDIAN_NAME_MAP: Record<MeridianId, string> = {
  taiyang: '太阳',
  yangming: '阳明',
  shaoyang: '少阳',
  taiyin: '太阴',
  shaoyin: '少阴',
  jueyin: '厥阴'
};

// 中文名称到六经ID映射
const CHINESE_TO_MERIDIAN_ID: Record<string, MeridianId> = {
  '太阳': 'taiyang',
  '太阳经': 'taiyang',
  '阳明': 'yangming',
  '阳明经': 'yangming',
  '少阳': 'shaoyang',
  '少阳经': 'shaoyang',
  '太阴': 'taiyin',
  '太阴经': 'taiyin',
  '少阴': 'shaoyin',
  '少阴经': 'shaoyin',
  '厥阴': 'jueyin',
  '厥阴经': 'jueyin'
};

// 症状匹配器类
class SymptomMatcher {
  // 症状模糊匹配
  static symptomMatches(symptom: string, target: string): boolean {
    // 完全匹配
    if (symptom === target) return true;
    
    // 包含匹配
    if (symptom.includes(target) || target.includes(symptom)) return true;
    
    // 同义词匹配（简化版）
    const synonymGroups = [
      ['恶寒', '畏寒', '怕冷'],
      ['发热', '发烧', '身热'],
      ['头痛', '头胀痛'],
      ['咳嗽', '咳喘'],
      ['恶心', '欲呕'],
      ['腹泻', '下利'],
      ['便秘', '大便难']
    ];
    
    return synonymGroups.some(group => 
      group.includes(symptom) && group.includes(target)
    );
  }
  
  // 计算症状与六经的匹配度
  static calculateMeridianMatch(symptoms: string[], meridianId: MeridianId): {
    score: number;
    matchedSymptoms: string[];
    reason: string;
  } {
    const meridian = sixMeridiansData.find(m => m.id === meridianId);
    if (!meridian) return { score: 0, matchedSymptoms: [], reason: '六经未找到' };
    
    let totalScore = 0;
    const matchedSymptoms: string[] = [];
    
    // 检查每个症状是否在六经的常见症状中
    symptoms.forEach(symptom => {
      const isMatched = meridian.symptoms.some(meridianSymptom => 
        this.symptomMatches(symptom, meridianSymptom)
      );
      
      if (isMatched) {
        matchedSymptoms.push(symptom);
        const weight = SYMPTOM_WEIGHTS[symptom] || 1.0;
        totalScore += weight;
      }
    });
    
    // 计算置信度
    const confidence = Math.min(100, Math.round((totalScore / symptoms.length) * 50));
    
    const reason = matchedSymptoms.length > 0
      ? `匹配症状：${matchedSymptoms.join('、')}`
      : '症状匹配度较低';
    
    return {
      score: confidence,
      matchedSymptoms,
      reason
    };
  }
}

// 方剂选择器类
class FormulaSelector {
  // 选择最适合的方剂
  static selectBestFormula(
    primaryMeridianId: MeridianId,
    symptoms: string[],
    matchedSymptoms: string[]
  ): Formula | null {
    // 1. 获取该六经关联的方剂
    const meridianName = MERIDIAN_NAME_MAP[primaryMeridianId];
    const candidateFormulas = formulaData.filter((formula: Formula) => 
      formula.meridianRelation.includes(meridianName)
    );
    
    if (candidateFormulas.length === 0) {
      return this.findAlternativeFormula(symptoms);
    }
    
    // 2. 计算每个方剂的适用度
    const scoredFormulas = candidateFormulas.map((formula: Formula) => {
      const score = this.calculateFormulaScore(formula, symptoms, matchedSymptoms);
      return { formula, score };
    });
    
    // 3. 选择得分最高的方剂
    scoredFormulas.sort((a: {formula: Formula, score: number}, b: {formula: Formula, score: number}) => b.score - a.score);
    
    return scoredFormulas[0]?.formula || null;
  }
  
  // 计算方剂得分
  private static calculateFormulaScore(
    formula: Formula,
    allSymptoms: string[],
    meridianSymptoms: string[]
  ): number {
    let score = 0;
    
    // 1. 方剂主治症状匹配
    if (formula.indications) {
      const indicationList = formula.indications.split(/[，、；;]/);
      allSymptoms.forEach(symptom => {
        if (indicationList.some((indication: string) => 
          SymptomMatcher.symptomMatches(symptom, indication.trim())
        )) {
          score += 2.0; // 主治症状匹配得分高
        }
      });
    }
    
    // 2. 六经症状匹配度
    const meridianMatchRatio = meridianSymptoms.length / allSymptoms.length;
    score += meridianMatchRatio * 3.0;
    
    // 3. 方剂复杂度考虑（药材不宜过多）
    const herbCount = formula.composition?.length || 0;
    if (herbCount > 0 && herbCount <= 12) {
      score += 1.0; // 适中方剂加分
    } else if (herbCount > 15) {
      score -= 0.5; // 过大方剂减分
    }
    
    return score;
  }
  
  // 查找替代方剂
  private static findAlternativeFormula(symptoms: string[]): Formula | null {
    // 基于症状直接匹配方剂
    const scoredFormulas = formulaData.map((formula: Formula) => {
      let score = 0;
      
      if (formula.indications) {
        const indicationList = formula.indications.split(/[，、；;]/);
        symptoms.forEach(symptom => {
          if (indicationList.some((indication: string) => 
            SymptomMatcher.symptomMatches(symptom, indication.trim())
          )) {
            score += 1.5;
          }
        });
      }
      
      return { formula, score };
    });
    
    scoredFormulas.sort((a: {formula: Formula, score: number}, b: {formula: Formula, score: number}) => b.score - a.score);
    return scoredFormulas[0]?.score > 0 ? scoredFormulas[0].formula : null;
  }
}

// 药材加减处理器类
class HerbModificationProcessor {
  // 生成药材加减建议
  static generateModifications(
    baseFormula: Formula,
    allSymptoms: string[],
    matchedSymptoms: string[],
    primaryMeridianId: MeridianId
  ): HerbModification[] {
    const modifications: HerbModification[] = [];
    
    // 1. 找出未匹配的症状
    const unmatchedSymptoms = allSymptoms.filter(s => !matchedSymptoms.includes(s));
    
    // 2. 针对未匹配症状添加药材
    unmatchedSymptoms.forEach(symptom => {
      const additionalHerb = this.suggestHerbForSymptom(symptom, baseFormula);
      if (additionalHerb) {
        modifications.push(additionalHerb);
      }
    });
    
    // 3. 根据六经特性调整药材
    const meridianModifications = this.getMeridianSpecificModifications(primaryMeridianId, baseFormula);
    modifications.push(...meridianModifications);
    
    // 4. 平衡药方
    const balancingMods = this.addBalancingModifications(baseFormula);
    modifications.push(...balancingMods);
    
    // 限制加减数量
    return modifications.slice(0, 4);
  }
  
  // 为症状推荐药材
  private static suggestHerbForSymptom(
    symptom: string,
    baseFormula: Formula
  ): HerbModification | null {
    // 查找症状对应的常用药材
    const symptomHerbs = herbData.filter((herb: Herb) => {
      if (!herb.indications) return false;
      return herb.indications.includes(symptom) || symptom.includes(herb.indications);
    });
    
    if (symptomHerbs.length === 0) return null;
    
    // 选择第一个合适的药材
    const selectedHerb = symptomHerbs[0];
    
    // 检查是否已在方剂中
    const isAlreadyInFormula = baseFormula.composition?.some(herbName => 
      herbName.includes(selectedHerb.name)
    );
    
    if (isAlreadyInFormula) {
      // 如果已在方剂中，建议加量
      return {
        herbName: selectedHerb.name,
        action: 'increaseDosage',
        reason: `针对"${symptom}"症状，增加${selectedHerb.name}用量`,
        suggestedDosage: this.calculateIncreasedDosage(selectedHerb.usageDosage)
      };
    }
    
    // 否则添加新药材
    return {
      herbName: selectedHerb.name,
      action: 'add',
      reason: `添加${selectedHerb.name}以治疗"${symptom}"`,
      suggestedDosage: selectedHerb.usageDosage || '9g'
    };
  }
  
  // 获取六经特定的加减
  private static getMeridianSpecificModifications(
    meridianId: MeridianId,
    baseFormula: Formula
  ): HerbModification[] {
    const modifications: HerbModification[] = [];
    const meridian = sixMeridiansData.find(m => m.id === meridianId);
    
    if (!meridian) return modifications;
    
    // 六经常用药材
    meridian.herbs.forEach(herbName => {
      // 检查是否已在方剂中
      const isInFormula = baseFormula.composition?.some(name => 
        name.includes(herbName)
      );
      
      if (!isInFormula) {
        const herbDataItem = herbData.find((h: Herb) => h.name === herbName);
        if (herbDataItem) {
          modifications.push({
            herbName,
            action: 'add',
            reason: `${MERIDIAN_NAME_MAP[meridianId]}经常用药，增强疗效`,
            suggestedDosage: herbDataItem.usageDosage || '6g'
          });
        }
      }
    });
    
    return modifications.slice(0, 2);
  }
  
  // 添加平衡性调整
  private static addBalancingModifications(baseFormula: Formula): HerbModification[] {
    const modifications: HerbModification[] = [];
    
    // 检查是否有过于峻烈的药材
    const strongHerbs = ['附子', '大黄', '芒硝', '甘遂', '大戟'];
    
    strongHerbs.forEach(herbName => {
      const isInFormula = baseFormula.composition?.some(name => 
        name.includes(herbName)
      );
      
      if (isInFormula) {
        // 为峻烈药材添加佐制药
        const balancingHerb = this.getBalancingHerb(herbName);
        if (balancingHerb) {
          modifications.push({
            herbName: balancingHerb,
            action: 'add',
            reason: `佐制${herbName}的偏性`,
            suggestedDosage: '3-6g'
          });
        }
      }
    });
    
    return modifications;
  }
  
  // 获取平衡药材
  private static getBalancingHerb(herbName: string): string | null {
    const balancingPairs: Record<string, string> = {
      '附子': '甘草',
      '大黄': '甘草',
      '麻黄': '石膏',
      '桂枝': '白芍',
      '干姜': '黄连',
      '石膏': '粳米'
    };
    
    return balancingPairs[herbName] || null;
  }
  
  // 计算增加的剂量
  private static calculateIncreasedDosage(baseDosage?: string): string {
    if (!baseDosage) return '12g';
    
    // 提取数字部分
    const match = baseDosage.match(/(\d+)\s*(g|克)?/);
    if (match) {
      const baseAmount = parseInt(match[1]);
      const increased = Math.min(baseAmount * 1.5, 15); // 最多15g
      return `${increased}g`;
    }
    
    return '12g';
  }
}

// 处方生成器类
class PrescriptionGenerator {
  // 生成完整处方
  static generatePrescription(
    baseFormula: Formula,
    modifications: HerbModification[],
    primaryMeridianId: MeridianId,
    matchedSymptoms: string[]
  ): PrescriptionRecommendation {
    // 1. 构建药材列表
    const prescriptionHerbs = this.buildHerbList(baseFormula, modifications);
    
    // 2. 生成辨证依据
    const syndromeDifferentiation = this.generateDifferentiation(
      primaryMeridianId,
      matchedSymptoms
    );
    
    // 3. 生成剂量说明
    const dosageInstructions = this.generateDosageInstructions(baseFormula, modifications);
    
    return {
      formulaName: baseFormula.name,
      formulaId: baseFormula.id,
      baseFormula,
      herbs: prescriptionHerbs,
      modifications,
      dosageInstructions,
      syndromeDifferentiation,
      usage: baseFormula.dosage || '水煎服，每日1剂，分2次温服',
      precautions: baseFormula.contraindications || ['忌生冷油腻', '孕妇慎用'],
      totalHerbs: prescriptionHerbs.length,
      modificationSummary: this.generateModificationSummary(modifications)
    };
  }
  
  // 构建药材列表
  private static buildHerbList(
    baseFormula: Formula,
    modifications: HerbModification[]
  ): Array<{ herbName: string; standardDosage: string; modifiedDosage: string; function: string }> {
    const herbList: Array<{ herbName: string; standardDosage: string; modifiedDosage: string; function: string }> = [];
    
    // 从详细组成中提取药材信息
    if (baseFormula.detailedComposition) {
      baseFormula.detailedComposition.forEach(herbComponent => {
        // 检查是否有对该药材的调整
        const modification = modifications.find(m => m.herbName === herbComponent.herb.name);
        
        herbList.push({
          herbName: herbComponent.herb.name,
          standardDosage: herbComponent.dosage || herbComponent.herb.usageDosage || '9g',
          modifiedDosage: modification?.suggestedDosage || herbComponent.dosage || herbComponent.herb.usageDosage || '9g',
          function: herbComponent.herb.effects?.join('，') || '请参考药典'
        });
      });
    } else {
      // 如果没有详细组成，从简化组成中解析
      baseFormula.composition?.forEach(herbText => {
        // 解析如"桂枝三两"的格式
        const match = herbText.match(/^(\D+)(\d+(?:\.\d+)?)?/);
        if (match) {
          const herbName = match[1].trim();
          const standardDosage = match[2] ? `${match[2]}g` : '9g';
          const herbInfo = herbData.find((h: Herb) => h.name === herbName);
          
          // 检查是否有对该药材的调整
          const modification = modifications.find(m => m.herbName === herbName);
          
          herbList.push({
            herbName,
            standardDosage,
            modifiedDosage: modification?.suggestedDosage || standardDosage,
            function: herbInfo?.effects?.join('，') || '请参考药典'
          });
        }
      });
    }
    
    // 添加新增药材（来自modifications中的add动作）
    modifications
      .filter(m => m.action === 'add')
      .forEach(modification => {
        const herbInfo = herbData.find((h: Herb) => h.name === modification.herbName);
        if (herbInfo && !herbList.some(h => h.herbName === modification.herbName)) {
          herbList.push({
            herbName: modification.herbName,
            standardDosage: herbInfo.usageDosage || '9g',
            modifiedDosage: modification.suggestedDosage || herbInfo.usageDosage || '9g',
            function: herbInfo.effects?.join('，') || '请参考药典'
          });
        }
      });
    
    return herbList;
  }
  
  // 生成辨证依据
  private static generateDifferentiation(
    meridianId: MeridianId,
    matchedSymptoms: string[]
  ): string {
    const meridianName = MERIDIAN_NAME_MAP[meridianId];
    const meridian = sixMeridiansData.find(m => m.id === meridianId);
    
    let differentiation = `辨为${meridianName}证。`;
    differentiation += `主症：${matchedSymptoms.slice(0, 3).join('、')}。`;
    
    if (meridian) {
      differentiation += `病机：${meridian.description.split('。')[0]}。`;
    }
    
    return differentiation;
  }
  
  // 生成剂量说明
  private static generateDosageInstructions(
    formula: Formula,
    modifications: HerbModification[]
  ): string {
    let instructions = formula.dosage || '常规用量，水煎服';
    
    // 检查是否有需要特殊处理的药材
    const specialHerbs = modifications.filter(m => 
      ['附子', '乌头', '细辛', '半夏'].includes(m.herbName)
    );
    
    if (specialHerbs.length > 0) {
      instructions += '。注意：' + specialHerbs.map(h => 
        `${h.herbName}需特殊处理`
      ).join('，');
    }
    
    return instructions;
  }
  
  // 生成加减总结
  private static generateModificationSummary(modifications: HerbModification[]): string {
    if (modifications.length === 0) return '原方应用，未作加减';
    
    const addedHerbs = modifications.filter(m => m.action === 'add').map(m => m.herbName);
    const adjustedHerbs = modifications.filter(m => 
      m.action === 'increaseDosage' || m.action === 'decreaseDosage'
    ).map(m => `${m.herbName}(${m.action === 'increaseDosage' ? '加量' : '减量'})`);
    
    const parts = [];
    if (addedHerbs.length > 0) parts.push(`加${addedHerbs.join('、')}`);
    if (adjustedHerbs.length > 0) parts.push(`调整${adjustedHerbs.join('、')}`);
    
    return parts.join('，');
  }
}

// 主分析服务
export class SymptomAnalysisService {
  // 主分析方法
  async analyzeSymptoms(symptoms: string[]): Promise<SymptomAnalysisResult> {
    try {
      if (!symptoms || symptoms.length === 0) {
        throw new Error('请输入症状');
      }
      
      // 1. 六经辨证
      const meridianResults = this.differentiateMeridians(symptoms);
      const primaryMeridian = meridianResults[0];
      
      if (!primaryMeridian || primaryMeridian.confidence < 20) {
        return {
          meridianMatches: meridianResults,
          recommendedFormulas: [],
          recommendedHerbs: [],
          error: '症状不典型，无法明确辨证'
        };
      }
      
      // 2. 获取主要六经ID
      const primaryMeridianId = this.getMeridianIdByName(primaryMeridian.meridian);
      
      // 3. 计算症状匹配度
      const formulaMatch = SymptomMatcher.calculateMeridianMatch(
        symptoms,
        primaryMeridianId
      );
      
      // 4. 选择主方
      const selectedFormula = FormulaSelector.selectBestFormula(
        primaryMeridianId,
        symptoms,
        formulaMatch.matchedSymptoms
      );
      
      if (!selectedFormula) {
        return {
          meridianMatches: meridianResults,
          recommendedFormulas: [],
          recommendedHerbs: [],
          error: '未找到合适的方剂'
        };
      }
      
      // 5. 生成药材加减
      const modifications = HerbModificationProcessor.generateModifications(
        selectedFormula,
        symptoms,
        formulaMatch.matchedSymptoms,
        primaryMeridianId
      );
      
      // 6. 生成完整处方
      const prescription = PrescriptionGenerator.generatePrescription(
        selectedFormula,
        modifications,
        primaryMeridianId,
        formulaMatch.matchedSymptoms
      );
      
      // 7. 生成最终结果
      return {
        meridianMatches: meridianResults,
        recommendedFormulas: [selectedFormula.name], // 只推荐一个主方
        recommendedHerbs: prescription.herbs.map(h => h.herbName).slice(0, 8),
        prescription,
        analysisSummary: this.generateAnalysisSummary(
          primaryMeridian.meridian,
          selectedFormula.name,
          modifications.length
        ),
        diagnosticTips: this.generateDiagnosticTips(symptoms, primaryMeridianId)
      };
      
    } catch (error) {
      console.error('症状分析错误:', error);
      return {
        meridianMatches: [],
        recommendedFormulas: [],
        recommendedHerbs: [],
        error: error instanceof Error ? error.message : '分析过程中发生错误'
      };
    }
  }
  
  // 六经辨证
  private differentiateMeridians(symptoms: string[]): Array<{
    meridian: string;
    confidence: number;
    reason: string;
  }> {
    const results = Object.keys(MERIDIAN_NAME_MAP).map(meridianId => {
      const result = SymptomMatcher.calculateMeridianMatch(
        symptoms,
        meridianId as MeridianId
      );
      
      return {
        meridian: MERIDIAN_NAME_MAP[meridianId as MeridianId],
        confidence: result.score,
        reason: result.reason
      };
    });
    
    // 按置信度排序并转换为百分比
    return results
      .filter(r => r.confidence > 0)
      .sort((a, b) => b.confidence - a.confidence)
      .map(r => ({
        ...r,
        confidence: Math.min(100, r.confidence)
      }));
  }
  
  // 根据六经中文名称获取ID
  private getMeridianIdByName(meridianName: string): MeridianId {
    // 尝试直接从映射表中查找
    if (CHINESE_TO_MERIDIAN_ID[meridianName]) {
      return CHINESE_TO_MERIDIAN_ID[meridianName];
    }
    
    // 如果没有直接匹配，查找相似的名称
    for (const [chinese, id] of Object.entries(CHINESE_TO_MERIDIAN_ID)) {
      if (meridianName.includes(chinese) || chinese.includes(meridianName)) {
        return id as MeridianId;
      }
    }
    
    // 默认返回太阳经
    return 'taiyang';
  }
  
  // 生成分析摘要
  private generateAnalysisSummary(
    primaryMeridian: string,
    formulaName: string,
    modificationCount: number
  ): string {
    let summary = `辨证为${primaryMeridian}证，选用${formulaName}为主方。`;
    
    if (modificationCount > 0) {
      summary += `根据具体症状加减化裁${modificationCount}味药材。`;
    } else {
      summary += '原方应用。';
    }
    
    summary += '建议结合具体脉证进一步调整。';
    return summary;
  }
  
  // 生成诊断提示
  private generateDiagnosticTips(symptoms: string[], meridianId: MeridianId): string[] {
    const tips: string[] = [];
    
    // 根据症状生成提示
    if (symptoms.includes('发热') && !symptoms.includes('恶寒')) {
      tips.push('注意发热是否伴有恶寒，以辨表里');
    }
    
    if (symptoms.includes('口渴') && !symptoms.includes('饮水')) {
      tips.push('需询问口渴喜饮程度及饮水后反应');
    }
    
    if (symptoms.includes('腹泻')) {
      tips.push('需详细询问大便性状、颜色及伴随症状');
    }
    
    // 根据六经生成提示
    if (meridianId === 'shaoyang') {
      tips.push('少阳证需注意胸胁部体征检查');
    }
    
    if (meridianId === 'shaoyin') {
      tips.push('少阴证需特别注意脉诊和精神状态');
    }
    
    return tips.slice(0, 3);
  }
  
  // 获取快速症状选项（智能选择20个核心症状）
  getQuickSymptoms(): string[] {
    // 临床最常用、最具辨证价值的20个症状
    // 按《伤寒论》六经辨证重要性排序
    
    const clinicalPrioritySymptoms = [
      // 1. 太阳病核心症状（表证）
      '恶寒',     // 太阳病第一要症，权重最高
      '发热',     // 几乎所有外感病都有
      '头痛',     // 常见伴随症状
      '项强',     // 太阳病特征性症状
      '身痛',     // 太阳伤寒典型症状
      
      // 2. 阳明病核心症状（里热证）
      '口渴',     // 判断热证的黄金标准
      '便秘',     // 阳明腑实证特征
      '烦躁',     // 热扰心神
      '大汗',     // 阳明热盛迫津
      
      // 3. 少阳病核心症状（半表半里）
      '口苦',     // 少阳病特征性症状
      '咽干',     // 少阳热证
      '胸胁苦满', // 少阳病定位症状
      
      // 4. 太阴病核心症状（里虚寒）
      '腹痛',     // 太阴病主症
      '腹泻',     // 太阴虚寒特征
      '呕吐',     // 胃气上逆
      '食欲不振', // 脾虚不运
      
      // 5. 少阴病核心症状（危重证）
      '但欲寐',   // 少阴病特征性精神症状
      '四肢厥冷', // 阳虚不达四末
      
      // 6. 厥阴病代表性症状
      '消渴',     // 厥阴病特征
      
      // 7. 脉象（重要客观体征）
      '脉浮'      // 表证脉象
    ];
    
    // 验证这些症状是否存在于症状数据库中
    const availableSymptoms = clinicalPrioritySymptoms.filter(symptom => {
      const exists = symptomData.some(s => s.classicalTerm === symptom);
      if (!exists) {
        console.warn(`症状数据库中未找到: ${symptom}`);
      }
      return exists;
    });
    
    // 如果数据库完整，返回这20个症状
    if (availableSymptoms.length >= 20) {
      return availableSymptoms.slice(0, 20);
    }
    
    // 如果数据库不完整，补充其他症状
    console.warn(`症状数据库不完整，只有${availableSymptoms.length}个优先症状可用`);
    const allSymptoms = symptomData.map(s => s.classicalTerm);
    
    // 合并并去重
    const combinedSymptoms = [...new Set([...availableSymptoms, ...allSymptoms])];
    
    // 如果还是不够20个，有多少显示多少
    return combinedSymptoms.slice(0, 20);
  }
}

// 保持向后兼容的导出
export const analyzeSymptoms = async (symptoms: string[]): Promise<SymptomAnalysisResult> => {
  const service = new SymptomAnalysisService();
  return await service.analyzeSymptoms(symptoms);
};

export const getQuickSymptoms = () => {
  const service = new SymptomAnalysisService();
  return service.getQuickSymptoms();
};