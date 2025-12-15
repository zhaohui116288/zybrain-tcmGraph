// src/components/meridian-system/SymptomTranslation.jsx
import React, { useState, useMemo } from 'react';
import { symptomData } from '../../data/symptomData';

const SymptomTranslation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSymptom, setSelectedSymptom] = useState(null);

  // 获取所有六经分类
  const meridianCategories = useMemo(() => {
    const allMeridians = symptomData.flatMap(symptom => symptom.meridianRelation);
    const uniqueMeridians = [...new Set(allMeridians)];
    return ['all', ...uniqueMeridians];
  }, []);

  // 筛选症状
  const filteredSymptoms = useMemo(() => {
    return symptomData.filter(symptom => {
      const matchesSearch = symptom.classicalTerm.includes(searchTerm) || 
                         symptom.modernDescription.includes(searchTerm);
      const matchesCategory = selectedCategory === 'all' || 
                            symptom.meridianRelation.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // 严重程度颜色
  const getSeverityColor = (severity) => {
    switch (severity) {
      case '重度': return 'bg-red-100 text-red-800 border-red-200';
      case '中度': return 'bg-orange-100 text-orange-800 border-orange-200';
      case '轻度': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="symptom-translation p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">伤寒论症状现代解读</h2>
      <p className="text-gray-600 mb-6">将古代症状描述翻译成现代人能理解的语言</p>
      
      {/* 搜索和筛选 */}
      <div className="filters mb-6 space-y-4 md:space-y-0 md:flex md:gap-4">
        <div className="search-box flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜索症状名称或现代描述..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="category-filter">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-48 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {meridianCategories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? '所有六经' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="symptoms-layout flex flex-col lg:flex-row gap-6">
        {/* 症状列表 */}
        <div className="symptoms-list flex-1">
          <div className="grid grid-cols-1 gap-4">
            {filteredSymptoms.map((symptom) => (
              <div
                key={symptom.id}
                onClick={() => setSelectedSymptom(symptom)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedSymptom?.id === symptom.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-blue-800">{symptom.classicalTerm}</h3>
                    <p className="text-gray-600 text-sm mt-1">{symptom.modernDescription}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(symptom.severity)}`}>
                    {symptom.severity}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {symptom.meridianRelation.map(meridian => (
                    <span key={meridian} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {meridian}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredSymptoms.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              没有找到匹配的症状
            </div>
          )}
        </div>

        {/* 症状详情面板 */}
        {selectedSymptom && (
          <div className="symptom-detail lg:w-96">
            <div className="sticky top-6 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
              <button
                onClick={() => setSelectedSymptom(null)}
                className="float-right text-gray-500 hover:text-gray-700 text-lg"
              >
                ✕
              </button>
              
              <h3 className="text-2xl font-bold text-blue-800 mb-2">{selectedSymptom.classicalTerm}</h3>
              
              <div className="space-y-4">
                <div className="p-3 bg-white rounded-lg border">
                  <h4 className="font-semibold text-gray-700 mb-2">现代描述</h4>
                  <p className="text-gray-800">{selectedSymptom.modernDescription}</p>
                </div>

                <div className="p-3 bg-white rounded-lg border">
                  <h4 className="font-semibold text-gray-700 mb-2">医学解释</h4>
                  <p className="text-gray-800 text-sm">{selectedSymptom.medicalExplanation}</p>
                </div>

                <div className="p-3 bg-white rounded-lg border">
                  <h4 className="font-semibold text-gray-700 mb-2">常见病因</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedSymptom.commonCauses.map((cause, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {cause}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border">
                  <h4 className="font-semibold text-gray-700 mb-2">相关六经</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedSymptom.meridianRelation.map((meridian, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {meridian}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedSymptom.relatedTerms.length > 0 && (
                  <div className="p-3 bg-white rounded-lg border">
                    <h4 className="font-semibold text-gray-700 mb-2">相关术语</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedSymptom.relatedTerms.map((term, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                          {term}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 统计信息 */}
      <div className="mt-6 text-center text-sm text-gray-500">
        共 {filteredSymptoms.length} 个症状 {selectedCategory !== 'all' && `（${selectedCategory}）`}
      </div>
    </div>
  );
};

export default SymptomTranslation;