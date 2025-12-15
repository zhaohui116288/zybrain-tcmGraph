// src/types/tcm-entities.ts

// 中药实体
export interface Herb {
  id: string;
  name: string;
  pinyinName: string;
  category: string;
  natureTaste: string;
  meridianAffinity: string[];
  effects: string[];
  indications: string;
  usageDosage?: string;
  contraindications?: string;
}

// 方剂中的药材组成（新增）
export interface FormulaHerb {
  herb: Herb;
  dosage: string;
  role: '君' | '臣' | '佐' | '使';
  notes?: string;
}

// 方剂加减变化（新增）
export interface FormulaModification {
  condition: string;
  changes: string;
}

// 扩展的方剂实体（保持原有字段，新增详细字段）
export interface Formula {
  id: string;
  name: string;
  pinyinName: string;
  composition: string[]; // 保持原有简化的组成格式
  functions: string[];
  indications: string;
  meridianRelation: string[];
  
  // 新增详细字段（可选）
  source?: string;
  category?: string;
  detailedComposition?: FormulaHerb[]; // 详细的组成信息
  analysis?: string;
  modifications?: FormulaModification[];
  contraindications?: string[];
  dosage?: string;
  preparation?: string;
  modernApplications?: string[];
  relatedFormulas?: string[];
  originalText?: string;
}

// 症状实体
export interface Symptom {
  id: string;
  classicalTerm: string;
  modernDescription: string;
  medicalExplanation: string;
  commonCauses: string[];
  severity: 'mild' | 'moderate' | 'severe';
  severityChinese: string;
  relatedTerms: string[];
  meridianRelation: string[];
}

// 六经ID类型定义
export type MeridianId = 'taiyang' | 'yangming' | 'shaoyang' | 'taiyin' | 'shaoyin' | 'jueyin';

// 六经实体
export interface Meridian {
  id: MeridianId;
  name: string;
  type: 'yang' | 'yin';
  description: string;
  symptoms: string[];
  formulas: string[];
  herbs: string[];
  relationships: MeridianRelationship[];
}

// 六经关系
export interface MeridianRelationship {
  source: string;
  target: string;
  type: string;
  description: string;
}

// ==================== 新增处方相关类型 ====================

// 药材加减类型
export interface HerbModification {
  herbName: string;
  action: 'add' | 'remove' | 'increaseDosage' | 'decreaseDosage';
  reason: string;
  suggestedDosage?: string;
  originalDosage?: string; // 原始剂量（用于increase/decrease时）
}

// 处方药材详情
export interface PrescriptionHerb {
  herbName: string;
  standardDosage: string;    // 标准剂量
  modifiedDosage: string;    // 调整后的剂量
  function: string;          // 功效
  role?: '君' | '臣' | '佐' | '使'; // 角色
  notes?: string;            // 备注
}

// 处方推荐
export interface PrescriptionRecommendation {
  formulaName: string;                // 方剂名称
  formulaId?: string;                 // 方剂ID
  baseFormula?: Formula;              // 基础方剂信息
  herbs: PrescriptionHerb[];          // 处方药材组成
  modifications: HerbModification[];  // 药材加减变化
  dosageInstructions: string;         // 剂量说明
  syndromeDifferentiation: string;    // 辨证依据
  usage: string;                      // 煎服方法
  precautions: string[];              // 注意事项
  totalHerbs: number;                 // 总药材数
  modificationSummary?: string;       // 加减总结
}

// 六经辨证结果详情
export interface MeridianDifferentiation {
  primaryMeridian: {
    name: string;
    confidence: number;
    matchedSymptoms: string[];
  };
  secondaryMeridians: Array<{
    name: string;
    confidence: number;
    matchedSymptoms: string[];
    influence: 'strong' | 'moderate' | 'weak';
  }>;
  unmatchedSymptoms: string[];
  differentiationLogic?: string; // 辨证逻辑说明
}

// 扩展的症状分析结果
export interface SymptomAnalysisResult {
  // 原有字段
  meridianMatches: {
    meridian: string;
    confidence: number;
    reason: string;
  }[];
  recommendedFormulas: string[];       // 保持原有，只包含主方名称
  recommendedHerbs: string[];          // 主要药材
  
  // 新增字段
  prescription?: PrescriptionRecommendation;  // 详细处方
  differentiation?: MeridianDifferentiation;  // 六经辨证详情
  analysisSummary?: string;                   // 分析摘要
  diagnosticTips?: string[];                  // 诊断提示
  
  // 错误处理
  error?: string;
  warning?: string;
}

// ==================== 保持原有类型 ====================

// 知识图谱节点
export interface GraphNode {
  id: string;
  name: string;
  type: 'yang' | 'yin';
  description: string;
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
}

// 知识图谱连线
export interface GraphLink {
  source: string;
  target: string;
  type: string;
  description: string;
}

// 知识图谱数据
export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

// 分析历史记录
export interface AnalysisHistory {
  id: number;
  symptoms: string[];
  result: SymptomAnalysisResult;
  timestamp: string;
}

// 搜索过滤器
export interface SearchFilter {
  category: string;
  meridian: string;
  severity: string;
  searchTerm: string;
}

// 分页信息
export interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

// API响应格式
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 用户设置
export interface UserSettings {
  theme: 'light' | 'dark';
  language: 'zh' | 'en';
  fontSize: 'small' | 'medium' | 'large';
  autoSave: boolean;
}

// 学习进度
export interface LearningProgress {
  completedLessons: string[];
  quizScores: { [lessonId: string]: number };
  totalStudyTime: number;
  lastStudied: Date;
}

// 医案实体
export interface MedicalCase {
  id: string;
  title: string;
  patientInfo: string;
  chiefComplaint: string;
  symptoms: string[];
  tongue: string;
  pulse: string;
  diagnosis: string;
  treatmentPrinciple: string;
  formula: string;
  outcome: string;
  notes: string;
  createdAt: Date;
  meridianRelation: MeridianId[];
}

// 学习卡片
export interface FlashCard {
  id: string;
  front: string;
  back: string;
  category: 'symptom' | 'herb' | 'formula' | 'meridian';
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed?: Date;
  nextReview?: Date;
}

// 统计数据
export interface Statistics {
  totalHerbs: number;
  totalSymptoms: number;
  totalFormulas: number;
  totalCases: number;
  mostCommonMeridian: string;
  mostUsedHerb: string;
  analysisCount: number;
}

// 方剂搜索参数（新增）
export interface FormulaSearchParams {
  name?: string;
  category?: string;
  herbs?: string[];
  functions?: string[];
  indications?: string[];
}

// 方剂推荐参数（新增）
export interface FormulaRecommendationParams {
  symptoms: string[];
  constitution?: string;
  tongue?: string;
  pulse?: string;
}

// 处方生成参数
export interface PrescriptionGenerationParams {
  primaryFormula: string;
  symptoms: string[];
  patientConstitution?: '气虚' | '血虚' | '阴虚' | '阳虚' | '痰湿' | '湿热' | '血瘀' | '气郁';
  ageGroup?: 'child' | 'adult' | 'elderly';
  weight?: number; // 体重（kg），用于剂量计算
}

// 症状分析参数
export interface SymptomAnalysisParams {
  symptoms: string[];
  tongue?: string;
  pulse?: string;
  constitution?: string;
  age?: number;
  detailedAnalysis?: boolean; // 是否进行详细分析
}

// ==================== 常量定义 ====================

// 方剂分类常量
export const FORMULA_CATEGORIES = {
  JIE_BIAO: '解表剂',
  XIE_XIA: '泻下剂',
  HE_JIE: '和解剂',
  QING_RE: '清热剂',
  SHU_SHOU: '祛暑剂',
  WEN_LI: '温里剂',
  BU_YI: '补益剂',
  GU_SE: '固涩剂',
  AN_SHEN: '安神剂',
  KAI_QIAO: '开窍剂',
  LI_QI: '理气剂',
  LI_XUE: '理血剂',
  ZHI_FENG: '治风剂',
  ZHI_ZAO: '治燥剂',
  QU_SHI: '祛湿剂',
  QU_TAN: '祛痰剂',
  XIAO_SHI: '消食剂',
  QU_CHONG: '驱虫剂'
} as const;

// 药材角色枚举
export const HERB_ROLES = {
  MONARCH: '君',
  MINISTER: '臣',
  ASSISTANT: '佐',
  ENVOY: '使'
} as const;

// 六经名称映射
export const MERIDIAN_NAMES: Record<MeridianId, string> = {
  taiyang: '太阳',
  yangming: '阳明',
  shaoyang: '少阳',
  taiyin: '太阴',
  shaoyin: '少阴',
  jueyin: '厥阴'
} as const;

// 药材加减动作说明
export const MODIFICATION_ACTIONS = {
  add: '加',
  remove: '减',
  increaseDosage: '加量',
  decreaseDosage: '减量'
} as const;

// 辨证依据级别
export const DIFFERENTIATION_LEVELS = {
  strong: '明显',
  moderate: '中度',
  weak: '轻微'
} as const;

// ==================== 工具类型 ====================

// 药材搜索建议
export interface HerbSuggestion {
  herb: Herb;
  relevance: number;
  reason: string;
}

// 方剂匹配度
export interface FormulaMatch {
  formula: Formula;
  matchScore: number;
  matchedIndications: string[];
  matchedSymptoms: string[];
}

// 症状匹配结果
export interface SymptomMatch {
  symptom: string;
  matchedMeridians: string[];
  confidence: number;
}

// ==================== 响应类型 ====================

// 分析结果响应
export interface AnalysisResultResponse {
  analysisId: string;
  result: SymptomAnalysisResult;
  timestamp: string;
  processingTime: number;
}

// 处方验证结果
export interface PrescriptionValidationResult {
  isValid: boolean;
  warnings: string[];
  suggestions: string[];
  herbConflicts: Array<{
    herb1: string;
    herb2: string;
    conflict: string;
  }>;
}

// ==================== 导出所有类型 ====================

export type {
  Herb as TCMHerb,
  Symptom as TCMSymptom,
  Formula as TCMFormula,
  Meridian as TCMMeridian,
  SymptomAnalysisResult as TCMSymptomAnalysisResult,
  PrescriptionRecommendation as TCMPrescriptionRecommendation,
  HerbModification as TCMHerbModification,
  MeridianDifferentiation as TCMMeridianDifferentiation,
};