// src/components/meridian-system/MeridianExplanation.jsx
import React, { useState } from 'react';
import { sixMeridiansData } from '../../data/sixMeridiansData';

const MeridianExplanation = () => {
  const [selectedMeridian, setSelectedMeridian] = useState(null);

  const meridianExplanations = {
    taiyang: {
      name: '太阳经',
      metaphor: '🔵 身体的"边防部队"',
      stage: '疾病初起阶段',
      explanation: '就像国家的边防军，负责体表防御。敌人(病邪)刚入侵时最先交战的地方。',
      modernDescription: '相当于免疫系统的第一道防线，感冒发烧的初期阶段',
      characteristics: [
        '📍 病位最浅 - 就像敌人刚跨过国境线',
        '🌡️ 症状明显 - 发烧、怕冷、头痛，如同边防警报响起',
        '🚪 出路在外 - 治疗要发汗，像把敌人赶出国门'
      ],
      example: '普通感冒初期，发烧怕冷，浑身酸痛',
      treatmentPrinciple: '发汗解表'
    },
    yangming: {
      name: '阳明经', 
      metaphor: '🔥 身体的"高温熔炉"',
      stage: '疾病高峰期',
      explanation: '就像工厂的高温熔炉，邪气在这里会化热化火，产生高烧大汗。',
      modernDescription: '相当于急性感染的高热期，身体启动最强防御反应',
      characteristics: [
        '🌋 高热不退 - 熔炉火力全开，温度飙升',
        '💦 大汗淋漓 - 身体试图通过出汗降温',
        '📦 便秘腹胀 - 如同工厂原料堆积堵塞'
      ],
      example: '重感冒高烧，大便不通，口渴想喝冷水',
      treatmentPrinciple: '清热泻下'
    },
    shaoyang: {
      name: '少阳经',
      metaphor: '🔄 身体的"交通枢纽"',
      stage: '疾病徘徊期', 
      explanation: '就像重要的交通枢纽，病邪在这里进进出出，症状时好时坏。',
      modernDescription: '相当于疾病的迁延期，邪气在半表半里之间徘徊',
      characteristics: [
        '🔄 寒热往来 - 一会儿冷一会儿热，像交通信号灯交替',
        '🤢 口苦咽干 - 枢纽堵塞，津液运行不畅',
        '🔄 病情反复 - 病邪在关口进退两难'
      ],
      example: '疟疾样的寒热交替，慢性胆囊炎发作',
      treatmentPrinciple: '和解少阳'
    },
    taiyin: {
      name: '太阴经',
      metaphor: '🌾 身体的"粮食加工厂"',
      stage: '疾病影响消化',
      explanation: '就像食品加工厂，负责消化吸收。病邪影响这里就会脾胃功能失调。',
      modernDescription: '相当于消化系统功能紊乱阶段',
      characteristics: [
        '🍚 食欲不振 - 工厂停产，不想进食',
        '💩 腹泻腹痛 - 产品质量问题，排泄异常',
        '🥱 疲倦乏力 - 能源供应不足，全身无力'
      ],
      example: '肠胃型感冒，消化不良，慢性腹泻',
      treatmentPrinciple: '温中健脾'
    },
    shaoyin: {
      name: '少阴经',
      metaphor: '⚡ 身体的"核心电站"',
      stage: '疾病危重期',
      explanation: '就像核电站，负责生命核心能量。这里受影响就是重病危症。',
      modernDescription: '相当于心肾功能衰竭的危重阶段',
      characteristics: [
        '🔋 能量衰竭 - 电站故障，全身供能不足',
        '🥶 极度畏寒 - 核心温度下降，要穿很多衣服',
        '😴 精神萎靡 - 只想睡觉，意识模糊'
      ],
      example: '严重心力衰竭，肾功能衰竭，休克前期',
      treatmentPrinciple: '回阳救逆'
    },
    jueyin: {
      name: '厥阴经',
      metaphor: '🎭 身体的"矛盾调解中心"',
      stage: '疾病复杂期',
      explanation: '就像调解矛盾的机构，这里病变会出现寒热错杂的复杂症状。',
      modernDescription: '相当于疾病的终末阶段或慢性病的复杂表现',
      characteristics: [
        '🎭 寒热夹杂 - 上面热下面寒，症状矛盾',
        '🔄 虚实并存 - 既有功能亢进又有功能不足',
        '🌀 病情复杂 - 多种矛盾症状同时出现'
      ],
      example: '更年期综合征，疑难杂症，慢性病晚期',
      treatmentPrinciple: '寒热并用'
    }
  };

  const handleMeridianClick = (meridianId) => {
    const meridian = sixMeridiansData.find(m => m.id === meridianId);
    const explanation = meridianExplanations[meridianId];
    setSelectedMeridian({ ...meridian, ...explanation });
  };

  return (
    <div className="meridian-explanation p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">六经辨证通俗解读</h2>
      <p className="text-gray-600 mb-6">用现代比喻理解中医六经，让古老智慧更接地气</p>
      
      {/* 六经卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {sixMeridiansData.map((meridian) => {
          const explanation = meridianExplanations[meridian.id];
          return (
            <div
              key={meridian.id}
              onClick={() => handleMeridianClick(meridian.id)}
              className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer border-2 ${
                selectedMeridian?.id === meridian.id 
                  ? 'border-blue-500 ring-2 ring-blue-200' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{meridian.name}</h3>
                  <p className="text-sm text-blue-600 font-semibold mt-1">{explanation.stage}</p>
                </div>
                <span className="text-2xl">{explanation.metaphor.split(' ')[0]}</span>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-700 font-medium text-sm">{explanation.metaphor}</p>
                <p className="text-gray-600 text-xs mt-2">{explanation.explanation}</p>
              </div>
              
              <div className="modern-desc mb-3 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-xs text-gray-700">
                  <span className="font-semibold">现代理解:</span> {explanation.modernDescription}
                </p>
              </div>
              
              <div className="text-center">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                  点击查看详情
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* 详细信息面板 */}
      {selectedMeridian && (
        <div className="detail-panel bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{selectedMeridian.name}</h3>
              <p className="text-blue-600 font-semibold">{selectedMeridian.stage}</p>
            </div>
            <button
              onClick={() => setSelectedMeridian(null)}
              className="text-gray-500 hover:text-gray-700 text-lg"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 左侧：比喻解释 */}
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">现代比喻</h4>
                <p className="text-lg text-blue-800">{selectedMeridian.metaphor}</p>
                <p className="text-gray-600 mt-2">{selectedMeridian.explanation}</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">主要特征</h4>
                <ul className="space-y-2">
                  {selectedMeridian.characteristics.map((char, index) => (
                    <li key={index} className="text-gray-600 flex items-start">
                      <span className="mr-2">•</span>
                      {char}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">治疗原则</h4>
                <p className="text-yellow-800 font-medium">{selectedMeridian.treatmentPrinciple}</p>
              </div>
            </div>

            {/* 右侧：具体信息 */}
            <div className="space-y-4">
              <div className="p-4 bg-white border rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-3">典型症状</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMeridian.symptoms.map((symptom, index) => (
                    <span key={index} className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-white border rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-3">常用方剂</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMeridian.formulas.map((formula, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      {formula}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-white border rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-3">常用中药</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMeridian.herbs.map((herb, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                      {herb}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">临床实例</h4>
                <p className="text-gray-600">💡 {selectedMeridian.example}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 六经传变规律 */}
      <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">🌊 六经传变规律</h3>
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm mb-4">
          {sixMeridiansData.map((meridian, index) => (
            <React.Fragment key={meridian.id}>
              <div 
                className="text-center cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleMeridianClick(meridian.id)}
              >
                <div className={`font-semibold px-3 py-2 rounded-lg ${
                  meridian.type === 'yang' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                }`}>
                  {meridian.name}
                </div>
                <div className="text-xs text-gray-500 mt-1">{meridianExplanations[meridian.id].metaphor.split(' ')[1]}</div>
              </div>
              {index < sixMeridiansData.length - 1 && (
                <div className="text-gray-400">→</div>
              )}
            </React.Fragment>
          ))}
        </div>
        <p className="text-center text-gray-600 text-sm">
          疾病通常从体表(太阳)向体内深入发展，理解这个规律有助于判断病情阶段和预后
        </p>
      </div>
    </div>
  );
};

export default MeridianExplanation;