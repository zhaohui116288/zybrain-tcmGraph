// src/data/symptomData.ts
import { Symptom } from '../types/tcm-entities';

export const symptomData: Symptom[] = [
  // ==================== 全身症状 ====================
  {
    id: 's001',
    classicalTerm: "恶寒",
    modernDescription: "特别怕冷，即使多穿衣服或盖被子还是觉得冷，通常伴有发热",
    medicalExplanation: "卫阳被郁，不能温煦肌表；或阳气虚衰，不能温养肢体",
    commonCauses: ["风寒表证", "阳虚体质", "少阴病"],
    severity: "mild",
    severityChinese: "轻度至重度",
    relatedTerms: ["畏寒", "憎寒", "身寒"],
    meridianRelation: ["太阳经", "少阴经", "太阴经"]
  },
  {
    id: 's002',
    classicalTerm: "发热",
    modernDescription: "体温升高，自觉身体发热，或他人触摸感觉发热",
    medicalExplanation: "正邪相争，阳气亢盛；或阴液亏虚，阳气相对偏亢",
    commonCauses: ["外感病邪", "内伤发热", "阴虚发热"],
    severity: "moderate",
    severityChinese: "中度",
    relatedTerms: ["身热", "壮热", "潮热", "微热"],
    meridianRelation: ["太阳经", "阳明经", "少阳经", "少阴经"]
  },
  {
    id: 's003',
    classicalTerm: "无汗",
    modernDescription: "皮肤干燥，不出汗，即使天气热或活动后也不出汗",
    medicalExplanation: "寒邪束表，腠理闭塞；或津液亏虚，无源作汗",
    commonCauses: ["风寒表实证", "津液不足", "阳虚不化"],
    severity: "mild",
    severityChinese: "轻度",
    relatedTerms: ["汗闭", "不出汗"],
    meridianRelation: ["太阳经", "阳明经"]
  },
  {
    id: 's004',
    classicalTerm: "有汗",
    modernDescription: "不活动或天气不热时也出汗，或出汗比平时明显增多",
    medicalExplanation: "卫阳不固，腠理疏松；或里热迫津外泄",
    commonCauses: ["太阳中风证", "阳明热证", "气虚自汗", "阴虚盗汗"],
    severity: "mild",
    severityChinese: "轻度至中度",
    relatedTerms: ["自汗", "盗汗", "大汗", "微汗"],
    meridianRelation: ["太阳经", "阳明经", "少阴经"]
  },
  {
    id: 's005',
    classicalTerm: "大汗",
    modernDescription: "出汗量很多，衣服湿透，持续出汗",
    medicalExplanation: "阳明热盛，迫津外泄；或阳气虚脱，津液失固",
    commonCauses: ["阳明经证", "亡阳证", "暑热伤津"],
    severity: "severe",
    severityChinese: "重度",
    relatedTerms: ["汗出淋漓", "大汗淋漓"],
    meridianRelation: ["阳明经", "少阴经"]
  },

  // ==================== 头面颈部症状 ====================
  {
    id: 's010',
    classicalTerm: "头痛",
    modernDescription: "头部疼痛，可为胀痛、刺痛、跳痛或紧痛",
    medicalExplanation: "邪气上扰清窍；或气血亏虚，清窍失养",
    commonCauses: ["外感风寒", "肝阳上亢", "血虚头痛", "瘀血阻滞"],
    severity: "mild",
    severityChinese: "轻度至重度",
    relatedTerms: ["头胀痛", "头刺痛", "头重痛"],
    meridianRelation: ["太阳经", "少阳经", "阳明经"]
  },
  {
    id: 's011',
    classicalTerm: "项强",
    modernDescription: "后颈部僵硬，转动不灵活，伴有紧张感或疼痛",
    medicalExplanation: "太阳经气不利，经脉拘急；或津液不能濡养筋脉",
    commonCauses: ["太阳伤寒", "落枕", "颈椎病"],
    severity: "moderate",
    severityChinese: "中度",
    relatedTerms: ["颈项强直", "颈项拘急"],
    meridianRelation: ["太阳经"]
  },
  {
    id: 's012',
    classicalTerm: "头眩",
    modernDescription: "头晕眼花，感觉自身或周围物体旋转、晃动",
    medicalExplanation: "清阳不升，或浊阴上犯，清窍被扰",
    commonCauses: ["痰湿中阻", "肝阳上亢", "气血亏虚"],
    severity: "moderate",
    severityChinese: "中度",
    relatedTerms: ["头晕", "目眩", "头重脚轻"],
    meridianRelation: ["少阳经", "厥阴经"]
  },
  {
    id: 's013',
    classicalTerm: "目赤",
    modernDescription: "眼睛发红，白眼珠充血",
    medicalExplanation: "肝火上炎，或风热上攻",
    commonCauses: ["肝火上炎", "风热犯目", "阳明热盛"],
    severity: "mild",
    severityChinese: "轻度",
    relatedTerms: ["眼睛红", "目赤肿痛"],
    meridianRelation: ["少阳经", "厥阴经", "阳明经"]
  },
  {
    id: 's014',
    classicalTerm: "鼻鸣",
    modernDescription: "鼻塞呼吸时发出鸣响，或鼻涕在鼻腔内流动的声音",
    medicalExplanation: "风寒束表，肺窍不利",
    commonCauses: ["风寒感冒", "过敏性鼻炎"],
    severity: "mild",
    severityChinese: "轻度",
    relatedTerms: ["鼻塞", "流涕"],
    meridianRelation: ["太阳经"]
  },
  {
    id: 's015',
    classicalTerm: "面赤",
    modernDescription: "面部发红，颜色潮红或通红",
    medicalExplanation: "阳热上蒸，或虚阳上浮",
    commonCauses: ["阳明热证", "阴虚火旺", "虚阳外越"],
    severity: "mild",
    severityChinese: "轻度至中度",
    relatedTerms: ["面部潮红", "满面通红"],
    meridianRelation: ["阳明经", "少阴经"]
  },

  // ==================== 胸腹部症状 ====================
  {
    id: 's020',
    classicalTerm: "胸胁苦满",
    modernDescription: "胸胁部胀满不适，有堵塞感或压迫感",
    medicalExplanation: "少阳枢机不利，气机郁结",
    commonCauses: ["少阳病", "肝气郁结", "胆腑疾病"],
    severity: "moderate",
    severityChinese: "中度",
    relatedTerms: ["胸胁胀满", "胁肋不适"],
    meridianRelation: ["少阳经", "厥阴经"]
  },
  {
    id: 's021',
    classicalTerm: "心下痞",
    modernDescription: "胃脘部堵塞不通的感觉，不痛但非常不适",
    medicalExplanation: "中焦气机阻滞，升降失常",
    commonCauses: ["寒热错杂", "痰气互结", "水饮内停"],
    severity: "moderate",
    severityChinese: "中度",
    relatedTerms: ["胃脘痞满", "心下堵"],
    meridianRelation: ["太阴经", "阳明经", "少阳经"]
  },
  {
    id: 's022',
    classicalTerm: "腹痛",
    modernDescription: "腹部疼痛，可为隐痛、胀痛、绞痛或刺痛",
    medicalExplanation: "气机阻滞，或寒热湿邪内蕴",
    commonCauses: ["太阴虚寒", "阳明腑实", "寒凝气滞"],
    severity: "mild",
    severityChinese: "轻度至重度",
    relatedTerms: ["肚子痛", "腹中痛"],
    meridianRelation: ["太阴经", "阳明经", "少阴经"]
  },
  {
    id: 's023',
    classicalTerm: "腹胀",
    modernDescription: "腹部胀满，感觉气体充满腹部",
    medicalExplanation: "脾胃运化失常，气机阻滞",
    commonCauses: ["太阴病", "阳明腑实", "肝气犯胃"],
    severity: "mild",
    severityChinese: "轻度至中度",
    relatedTerms: ["腹满", "腹部胀气"],
    meridianRelation: ["太阴经", "阳明经"]
  },
  {
    id: 's024',
    classicalTerm: "心下悸",
    modernDescription: "心窝部或上腹部悸动不安，感觉心跳明显",
    medicalExplanation: "水气凌心，或气血亏虚",
    commonCauses: ["水饮内停", "心阳虚", "气血不足"],
    severity: "moderate",
    severityChinese: "中度",
    relatedTerms: ["心悸", "心慌"],
    meridianRelation: ["太阳经", "少阴经"]
  },

  // ==================== 四肢症状 ====================
  {
    id: 's030',
    classicalTerm: "身痛",
    modernDescription: "全身肌肉、关节疼痛，活动时加重",
    medicalExplanation: "风寒湿邪阻滞经络，气血运行不畅",
    commonCauses: ["太阳伤寒", "风湿痹证", "气血亏虚"],
    severity: "moderate",
    severityChinese: "中度",
    relatedTerms: ["周身疼痛", "全身酸痛"],
    meridianRelation: ["太阳经"]
  },
  {
    id: 's031',
    classicalTerm: "腰痛",
    modernDescription: "腰部疼痛，可为酸痛、胀痛或刺痛",
    medicalExplanation: "肾虚不固，或寒湿瘀血阻滞",
    commonCauses: ["肾阳虚", "寒湿腰痛", "瘀血阻滞"],
    severity: "moderate",
    severityChinese: "中度",
    relatedTerms: ["腰酸", "腰脊痛"],
    meridianRelation: ["太阳经", "少阴经"]
  },
  {
    id: 's032',
    classicalTerm: "四肢疼痛",
    modernDescription: "四肢关节或肌肉疼痛",
    medicalExplanation: "风寒湿邪痹阻经络",
    commonCauses: ["风寒湿痹", "气血亏虚"],
    severity: "moderate",
    severityChinese: "中度",
    relatedTerms: ["四肢关节痛", "手足疼痛"],
    meridianRelation: ["太阳经", "太阴经"]
  },
  {
    id: 's033',
    classicalTerm: "手足厥冷",
    modernDescription: "手脚冰凉，甚至冷至肘膝关节",
    medicalExplanation: "阳气虚衰，不能温煦四肢；或阳气郁遏，不达四末",
    commonCauses: ["少阴寒化证", "厥阴病", "阳郁不达"],
    severity: "moderate",
    severityChinese: "中度至重度",
    relatedTerms: ["四肢厥逆", "手脚冰凉"],
    meridianRelation: ["少阴经", "厥阴经"]
  },
  {
    id: 's034',
    classicalTerm: "四肢不温",
    modernDescription: "手脚温度偏低，感觉不暖和",
    medicalExplanation: "阳气不足，温煦功能减弱",
    commonCauses: ["阳虚体质", "太阴病", "气血不足"],
    severity: "mild",
    severityChinese: "轻度",
    relatedTerms: ["手足不温", "手脚凉"],
    meridianRelation: ["太阴经", "少阴经"]
  },
  {
    id: 's035',
    classicalTerm: "手足濈然汗出",
    modernDescription: "手心脚心微微持续出汗",
    medicalExplanation: "阳明燥热，迫津外泄",
    commonCauses: ["阳明腑实证"],
    severity: "mild",
    severityChinese: "轻度",
    relatedTerms: ["手足心汗"],
    meridianRelation: ["阳明经"]
  },

  // ==================== 消化系统症状 ====================
  {
    id: 's040',
    classicalTerm: "食欲不振",
    modernDescription: "不想吃东西，没有饥饿感",
    medicalExplanation: "脾胃运化功能减弱",
    commonCauses: ["太阴病", "少阳病", "脾胃虚弱"],
    severity: "mild",
    severityChinese: "轻度",
    relatedTerms: ["纳差", "食不下", "不思饮食"],
    meridianRelation: ["太阴经", "少阳经"]
  },
  {
    id: 's041',
    classicalTerm: "恶心",
    modernDescription: "胃部不适，想吐的感觉",
    medicalExplanation: "胃气上逆",
    commonCauses: ["水饮内停", "肝气犯胃", "食积"],
    severity: "mild",
    severityChinese: "轻度",
    relatedTerms: ["欲呕", "泛恶"],
    meridianRelation: ["少阳经", "太阴经"]
  },
  {
    id: 's042',
    classicalTerm: "呕吐",
    modernDescription: "胃内容物从口中吐出",
    medicalExplanation: "胃失和降，气逆于上",
    commonCauses: ["少阳病", "太阴病", "食积", "水饮"],
    severity: "moderate",
    severityChinese: "中度",
    relatedTerms: ["吐", "呕逆"],
    meridianRelation: ["少阳经", "太阴经", "阳明经"]
  },
  {
    id: 's043',
    classicalTerm: "腹泻",
    modernDescription: "大便次数增多，粪质稀薄",
    medicalExplanation: "脾虚湿盛，运化失常",
    commonCauses: ["太阴病", "少阴病", "湿热下注"],
    severity: "moderate",
    severityChinese: "中度",
    relatedTerms: ["下利", "泄泻", "拉肚子"],
    meridianRelation: ["太阴经", "少阴经", "阳明经"]
  },
  {
    id: 's044',
    classicalTerm: "便秘",
    modernDescription: "大便干结，排出困难，或排便间隔时间延长",
    medicalExplanation: "大肠传导失常，或津液不足",
    commonCauses: ["阳明腑实", "津亏肠燥", "气滞便秘"],
    severity: "moderate",
    severityChinese: "中度",
    relatedTerms: ["大便难", "便结", "不大便"],
    meridianRelation: ["阳明经", "太阴经"]
  },
  {
    id: 's045',
    classicalTerm: "饥而不欲食",
    modernDescription: "感觉饥饿但不想吃东西",
    medicalExplanation: "胃热脾寒，或胃强脾弱",
    commonCauses: ["厥阴病", "脾胃不和"],
    severity: "mild",
    severityChinese: "轻度",
    relatedTerms: ["能饥不食"],
    meridianRelation: ["厥阴经"]
  },

  // ==================== 二便症状 ====================
  {
    id: 's050',
    classicalTerm: "小便不利",
    modernDescription: "排尿困难，尿量减少，或尿流变细",
    medicalExplanation: "膀胱气化不利，或水液代谢失常",
    commonCauses: ["太阳蓄水证", "肾阳虚", "湿热下注"],
    severity: "moderate",
    severityChinese: "中度",
    relatedTerms: ["排尿困难", "尿少"],
    meridianRelation: ["太阳经", "少阴经"]
  },
  {
    id: 's051',
    classicalTerm: "小便清长",
    modernDescription: "尿量多，颜色清亮透明",
    medicalExplanation: "肾阳虚，固摄无权；或寒证",
    commonCauses: ["少阴寒化证", "肾阳虚"],
    severity: "mild",
    severityChinese: "轻度",
    relatedTerms: ["尿多清长"],
    meridianRelation: ["少阴经"]
  },
  {
    id: 's052',
    classicalTerm: "小便黄赤",
    modernDescription: "尿液颜色深黄或发红",
    medicalExplanation: "湿热下注，或热伤血络",
    commonCauses: ["湿热证", "热盛伤津", "血热"],
    severity: "mild",
    severityChinese: "轻度",
    relatedTerms: ["尿黄", "尿赤"],
    meridianRelation: ["阳明经", "少阳经"]
  },

  // ==================== 精神神经症状 ====================
  {
    id: 's060',
    classicalTerm: "烦躁",
    modernDescription: "心烦不安，容易发怒，坐卧不宁",
    medicalExplanation: "热扰心神，或阴虚火旺",
    commonCauses: ["阳明热盛", "阴虚火旺", "肝气郁结"],
    severity: "moderate",
    severityChinese: "中度",
    relatedTerms: ["心烦", "急躁易怒"],
    meridianRelation: ["阳明经", "少阴经", "厥阴经"]
  },
  {
    id: 's061',
    classicalTerm: "但欲寐",
    modernDescription: "精神萎靡，只想睡觉，但实际睡眠不深",
    medicalExplanation: "心肾阳虚，神失所养",
    commonCauses: ["少阴病", "阳气虚衰"],
    severity: "moderate",
    severityChinese: "中度",
    relatedTerms: ["嗜睡", "神疲欲寐"],
    meridianRelation: ["少阴经"]
  },
  {
    id: 's062',
    classicalTerm: "谵语",
    modernDescription: "神志不清，胡言乱语",
    medicalExplanation: "热扰心神，神明被蒙",
    commonCauses: ["阳明腑实", "热入心包"],
    severity: "severe",
    severityChinese: "重度",
    relatedTerms: ["说胡话", "神昏谵语"],
    meridianRelation: ["阳明经", "少阴经"]
  },
  {
    id: 's063',
    classicalTerm: "神昏",
    modernDescription: "意识丧失，呼之不应",
    medicalExplanation: "邪陷心包，或正气脱失",
    commonCauses: ["热入心包", "亡阳证", "痰蒙心窍"],
    severity: "severe",
    severityChinese: "重度",
    relatedTerms: ["昏迷", "不省人事"],
    meridianRelation: ["少阴经", "厥阴经"]
  },

  // ==================== 特殊症状 ====================
  {
    id: 's070',
    classicalTerm: "往来寒热",
    modernDescription: "恶寒和发热交替出现，寒时不热，热时不寒",
    medicalExplanation: "邪在半表半里，正邪相争",
    commonCauses: ["少阳病", "疟疾"],
    severity: "moderate",
    severityChinese: "中度",
    relatedTerms: ["寒热往来"],
    meridianRelation: ["少阳经"]
  },
  {
    id: 's071',
    classicalTerm: "潮热",
    modernDescription: "发热如潮水般定时而至，通常下午或傍晚发热",
    medicalExplanation: "阳明腑实，或阴虚火旺",
    commonCauses: ["阳明腑实证", "阴虚潮热"],
    severity: "moderate",
    severityChinese: "中度",
    relatedTerms: ["日晡潮热"],
    meridianRelation: ["阳明经", "少阴经"]
  },
  {
    id: 's072',
    classicalTerm: "口渴",
    modernDescription: "口舌干燥，想喝水",
    medicalExplanation: "津液不足，或气不化津",
    commonCauses: ["阳明热盛", "阴虚津亏", "水饮内停"],
    severity: "mild",
    severityChinese: "轻度至重度",
    relatedTerms: ["口干", "欲饮水"],
    meridianRelation: ["阳明经", "少阴经", "太阴经"]
  },
  {
    id: 's073',
    classicalTerm: "口苦",
    modernDescription: "口中感觉苦味",
    medicalExplanation: "胆火上炎，胆汁上泛",
    commonCauses: ["少阳病", "肝胆湿热"],
    severity: "mild",
    severityChinese: "轻度",
    relatedTerms: ["口发苦"],
    meridianRelation: ["少阳经"]
  },
  {
    id: 's074',
    classicalTerm: "咽干",
    modernDescription: "咽喉干燥，需要频繁喝水润喉",
    medicalExplanation: "津液不足，咽喉失润",
    commonCauses: ["少阳病", "阴虚火旺", "热盛伤津"],
    severity: "mild",
    severityChinese: "轻度",
    relatedTerms: ["喉咙干"],
    meridianRelation: ["少阳经", "少阴经"]
  },
  {
    id: 's075',
    classicalTerm: "消渴",
    modernDescription: "口渴多饮，多食易饥，多尿，身体消瘦",
    medicalExplanation: "阴虚燥热，津液耗伤",
    commonCauses: ["厥阴病", "消渴病"],
    severity: "severe",
    severityChinese: "重度",
    relatedTerms: ["三多一少"],
    meridianRelation: ["厥阴经"]
  },
  {
    id: 's076',
    classicalTerm: "气上撞心",
    modernDescription: "感觉有气从下向上冲撞心胸部",
    medicalExplanation: "肝气上逆，冲气上逆",
    commonCauses: ["厥阴病", "肝气上逆"],
    severity: "moderate",
    severityChinese: "中度",
    relatedTerms: ["气上冲胸"],
    meridianRelation: ["厥阴经"]
  },
  {
    id: 's077',
    classicalTerm: "心中疼热",
    modernDescription: "心窝部灼热疼痛",
    medicalExplanation: "肝火犯胃，或阴虚火旺",
    commonCauses: ["厥阴病", "肝胃郁热"],
    severity: "moderate",
    severityChinese: "中度",
    relatedTerms: ["心下灼热"],
    meridianRelation: ["厥阴经"]
  },

  // ==================== 舌象症状 ====================
  {
    id: 's080',
    classicalTerm: "舌淡",
    modernDescription: "舌质颜色淡白，比正常舌色浅",
    medicalExplanation: "气血不足，或阳气虚衰",
    commonCauses: ["气血两虚", "阳虚"],
    severity: "mild",
    severityChinese: "轻度",
    relatedTerms: ["舌色淡白"],
    meridianRelation: ["太阴经", "少阴经"]
  },
  {
    id: 's081',
    classicalTerm: "舌红",
    modernDescription: "舌质颜色鲜红或深红",
    medicalExplanation: "热盛伤阴，或阴虚火旺",
    commonCauses: ["实热证", "阴虚火旺"],
    severity: "mild",
    severityChinese: "轻度",
    relatedTerms: ["舌色红"],
    meridianRelation: ["阳明经", "少阴经"]
  },
  {
    id: 's082',
    classicalTerm: "苔白",
    modernDescription: "舌苔颜色白",
    medicalExplanation: "寒证、湿证或表证",
    commonCauses: ["风寒表证", "寒湿内停"],
    severity: "mild",
    severityChinese: "轻度",
    relatedTerms: ["白苔"],
    meridianRelation: ["太阳经", "太阴经"]
  },
  {
    id: 's083',
    classicalTerm: "苔黄",
    modernDescription: "舌苔颜色黄",
    medicalExplanation: "热证",
    commonCauses: ["阳明热证", "湿热证"],
    severity: "mild",
    severityChinese: "轻度",
    relatedTerms: ["黄苔"],
    meridianRelation: ["阳明经", "少阳经"]
  },
  {
    id: 's084',
    classicalTerm: "苔腻",
    modernDescription: "舌苔厚腻，刮之不去",
    medicalExplanation: "湿浊、痰饮、食积内停",
    commonCauses: ["湿浊内蕴", "痰饮", "食积"],
    severity: "mild",
    severityChinese: "轻度",
    relatedTerms: ["腻苔"],
    meridianRelation: ["太阴经", "阳明经"]
  },

  // ==================== 脉象症状 ====================
  {
    id: 's090',
    classicalTerm: "脉浮",
    modernDescription: "脉搏表浅，轻按即得",
    medicalExplanation: "邪在肌表，正气抗邪于外",
    commonCauses: ["太阳表证"],
    severity: "mild",
    severityChinese: "轻度",
    relatedTerms: ["浮脉"],
    meridianRelation: ["太阳经"]
  },
  {
    id: 's091',
    classicalTerm: "脉沉",
    modernDescription: "脉搏深沉，重按才得",
    medicalExplanation: "邪在里，正气郁闭于内",
    commonCauses: ["里证", "虚证"],
    severity: "mild",
    severityChinese: "轻度",
    relatedTerms: ["沉脉"],
    meridianRelation: ["少阴经", "太阴经"]
  },
  {
    id: 's092',
    classicalTerm: "脉数",
    modernDescription: "脉搏频率快，一息五至以上",
    medicalExplanation: "热证",
    commonCauses: ["实热证", "虚热证"],
    severity: "mild",
    severityChinese: "轻度",
    relatedTerms: ["数脉"],
    meridianRelation: ["阳明经", "少阴经"]
  },
  {
    id: 's093',
    classicalTerm: "脉迟",
    modernDescription: "脉搏频率慢，一息三至",
    medicalExplanation: "寒证，或阳虚",
    commonCauses: ["寒证", "阳虚"],
    severity: "mild",
    severityChinese: "轻度",
    relatedTerms: ["迟脉"],
    meridianRelation: ["少阴经", "太阴经"]
  },
  {
    id: 's094',
    classicalTerm: "脉弦",
    modernDescription: "脉搏如按琴弦，端直而长",
    medicalExplanation: "肝胆病，痛证，痰饮",
    commonCauses: ["少阳病", "肝气郁结", "痰饮"],
    severity: "mild",
    severityChinese: "轻度",
    relatedTerms: ["弦脉"],
    meridianRelation: ["少阳经", "厥阴经"]
  },
  {
    id: 's095',
    classicalTerm: "脉微细",
    modernDescription: "脉搏微弱细小，似有似无",
    medicalExplanation: "阴阳气血俱虚",
    commonCauses: ["少阴病", "气血大虚"],
    severity: "severe",
    severityChinese: "重度",
    relatedTerms: ["微脉", "细脉"],
    meridianRelation: ["少阴经"]
  },
  {
    id: 's096',
    classicalTerm: "脉洪大",
    modernDescription: "脉搏洪大有力，如波涛汹涌",
    medicalExplanation: "阳明热盛，气分大热",
    commonCauses: ["阳明经证"],
    severity: "moderate",
    severityChinese: "中度",
    relatedTerms: ["洪脉"],
    meridianRelation: ["阳明经"]
  }
]; 