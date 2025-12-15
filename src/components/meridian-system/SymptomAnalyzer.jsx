  // src/components/meridian-system/SymptomAnalyzer.jsx
import React, { useState, useEffect } from 'react';
import { analyzeSymptoms, getQuickSymptoms } from '../../services/symptomAnalysisService';
import { symptomData } from '../../data/symptomData';

const SymptomAnalyzer = () => {
  const [symptoms, setSymptoms] = useState('');
  const [symptomList, setSymptomList] = useState([]);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [showDetailedPrescription, setShowDetailedPrescription] = useState(false);
  const [showAllSymptoms, setShowAllSymptoms] = useState(false);
  const [symptomSearchTerm, setSymptomSearchTerm] = useState('');
  const [filteredAllSymptoms, setFilteredAllSymptoms] = useState([]);

  // 获取所有症状
  const allSymptoms = symptomData.map(s => s.classicalTerm);

  // 过滤症状的函数
  const filterSymptoms = (searchTerm) => {
    if (!searchTerm.trim()) {
      return allSymptoms;
    }
    
    return allSymptoms.filter(symptom => {
      const symptomInfo = symptomData.find(s => s.classicalTerm === symptom);
      return (
        symptom.includes(searchTerm) ||
        (symptomInfo?.modernDescription && symptomInfo.modernDescription.includes(searchTerm)) ||
        (symptomInfo?.relatedTerms && symptomInfo.relatedTerms.some(term => term.includes(searchTerm)))
      );
    });
  };

  // 当搜索词改变时更新过滤结果
  useEffect(() => {
    setFilteredAllSymptoms(filterSymptoms(symptomSearchTerm));
  }, [symptomSearchTerm]);

  // 快速症状选项
  const quickSymptoms = getQuickSymptoms();

  // 添加症状
  const addSymptom = () => {
    if (symptoms.trim()) {
      const newSymptoms = symptoms.split(/[,\n]/)
        .map(s => s.trim())
        .filter(s => s && !symptomList.includes(s));
      
      setSymptomList(prev => [...prev, ...newSymptoms]);
      setSymptoms('');
    }
  };

  // 快速选择症状
  const handleQuickSymptomSelect = (symptom) => {
    if (!symptomList.includes(symptom)) {
      setSymptomList(prev => [...prev, symptom]);
    }
  };

  // 移除症状
  const removeSymptom = (symptomToRemove) => {
    setSymptomList(prev => prev.filter(symptom => symptom !== symptomToRemove));
  };

  // 清空症状
  const clearSymptoms = () => {
    setSymptomList([]);
    setAnalysisResult(null);
    setShowDetailedPrescription(false);
  };

  // 分析症状
  const handleAnalyze = async () => {
    if (symptomList.length === 0) return;
    
    setIsLoading(true);
    setShowDetailedPrescription(false);
    try {
      const result = await analyzeSymptoms(symptomList);
      setAnalysisResult(result);
      
      // 保存到历史记录
      setAnalysisHistory(prev => [{
        id: Date.now(),
        symptoms: [...symptomList],
        result: result,
        timestamp: new Date().toLocaleTimeString()
      }, ...prev.slice(0, 4)]);
    } catch (error) {
      console.error('症状分析错误:', error);
      setAnalysisResult({
        meridianMatches: [],
        recommendedFormulas: [],
        recommendedHerbs: [],
        error: '分析失败，请重试'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 从历史记录加载
  const loadFromHistory = (historyItem) => {
    setSymptomList(historyItem.symptoms);
    setAnalysisResult(historyItem.result);
    setShowDetailedPrescription(false);
  };

  // 渲染所有症状的模态框
  const renderAllSymptomsModal = () => {
    if (!showAllSymptoms) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
          {/* 模态框头部 */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">🌿 所有症状 ({allSymptoms.length}个)</h3>
              <p className="text-gray-600 mt-1">选择症状添加到分析列表</p>
            </div>
            <button
              onClick={() => {
                setShowAllSymptoms(false);
                setSymptomSearchTerm('');
              }}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 搜索框 */}
          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                value={symptomSearchTerm}
                onChange={(e) => setSymptomSearchTerm(e.target.value)}
                placeholder="搜索症状名称或描述..."
                className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {symptomSearchTerm && (
                <button
                  onClick={() => setSymptomSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <div className="mt-2 text-sm text-gray-500">
              已过滤到 {filteredAllSymptoms.length} 个症状
            </div>
          </div>

          {/* 症状列表 */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredAllSymptoms.map((symptom, index) => {
                const symptomInfo = symptomData.find(s => s.classicalTerm === symptom);
                const isSelected = symptomList.includes(symptom);
                
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-green-50 border-green-300 shadow-sm'
                        : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm'
                    }`}
                    onClick={() => {
                      if (!isSelected) {
                        setSymptomList(prev => [...prev, symptom]);
                      }
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                          isSelected ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {isSelected ? '✓' : '+'}
                        </span>
                        <h4 className="font-semibold text-gray-800">{symptom}</h4>
                      </div>
                      {symptomInfo?.severityChinese && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          symptomInfo.severity === 'severe' ? 'bg-red-100 text-red-800' :
                          symptomInfo.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {symptomInfo.severityChinese}
                        </span>
                      )}
                    </div>
                    
                    {symptomInfo?.modernDescription && (
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {symptomInfo.modernDescription}
                      </p>
                    )}
                    
                    {symptomInfo?.meridianRelation && symptomInfo.meridianRelation.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {symptomInfo.meridianRelation.map((meridian, idx) => (
                          <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                            {meridian}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {isSelected && (
                      <div className="mt-2 text-xs text-green-600 font-medium">
                        已添加到分析列表
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {filteredAllSymptoms.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-700 mb-2">未找到相关症状</h4>
                <p className="text-gray-500">请尝试其他搜索词，或查看常用症状</p>
              </div>
            )}
          </div>

          {/* 底部按钮 */}
          <div className="p-6 border-t border-gray-200 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              已选择 {symptomList.length} 个症状
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setSymptomList([])}
                disabled={symptomList.length === 0}
                className={`px-4 py-2 rounded-lg ${
                  symptomList.length === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-red-50 text-red-600 hover:bg-red-100'
                }`}
              >
                清空已选
              </button>
              <button
                onClick={() => {
                  setShowAllSymptoms(false);
                  setSymptomSearchTerm('');
                }}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                完成选择
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 渲染详细处方信息
  const renderDetailedPrescription = () => {
    if (!analysisResult?.prescription) return null;
    
    const prescription = analysisResult.prescription;
    
    return (
      <div className="mt-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border-2 border-blue-200 p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
            📋 详细处方信息
            <span className="text-sm font-normal text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
              智能辨证论治
            </span>
          </h3>
          <button
            onClick={() => setShowDetailedPrescription(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* 辨证依据 */}
        <div className="mb-6 p-4 bg-white rounded-lg border border-blue-100">
          <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <span className="text-blue-600">🔍 辨证依据</span>
          </h4>
          <p className="text-gray-700 leading-relaxed">{prescription.syndromeDifferentiation}</p>
        </div>
        
        {/* 主方信息 */}
        <div className="mb-6 p-4 bg-white rounded-lg border border-green-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-bold text-xl text-green-800 mb-1">{prescription.formulaName}</h4>
              {prescription.baseFormula?.category && (
                <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
                  {prescription.baseFormula.category}
                </span>
              )}
            </div>
            {prescription.modificationSummary && (
              <span className="text-sm text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                {prescription.modificationSummary}
              </span>
            )}
          </div>
          
          {prescription.baseFormula?.analysis && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 italic">{prescription.baseFormula.analysis}</p>
            </div>
          )}
        </div>
        
        {/* 药材组成 */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span className="text-purple-600">🌿 处方组成 ({prescription.totalHerbs}味)</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {prescription.herbs.map((herb, index) => (
              <div key={index} className="bg-white rounded-lg border border-purple-100 p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h5 className="font-bold text-gray-800 text-lg">{herb.herbName}</h5>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-purple-700 bg-purple-50 px-2 py-1 rounded">
                        {herb.modifiedDosage}
                      </span>
                      {herb.modifiedDosage !== herb.standardDosage && (
                        <span className="text-xs text-gray-500 line-through">
                          原量: {herb.standardDosage}
                        </span>
                      )}
                    </div>
                  </div>
                  {herb.role && (
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      herb.role === '君' ? 'bg-red-100 text-red-800' :
                      herb.role === '臣' ? 'bg-orange-100 text-orange-800' :
                      herb.role === '佐' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {herb.role}药
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{herb.function}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* 药材加减说明 */}
        {prescription.modifications && prescription.modifications.length > 0 && (
          <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
              <span>🔄 药材加减说明</span>
            </h4>
            <div className="space-y-3">
              {prescription.modifications.map((mod, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    mod.action === 'add' ? 'bg-green-100 text-green-800' :
                    mod.action === 'remove' ? 'bg-red-100 text-red-800' :
                    mod.action === 'increaseDosage' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {mod.action === 'add' ? '+' :
                     mod.action === 'remove' ? '−' :
                     mod.action === 'increaseDosage' ? '↑' : '↓'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-800">{mod.herbName}</span>
                      <span className="text-sm text-gray-500 capitalize">
                        ({mod.action === 'add' ? '加' : 
                          mod.action === 'remove' ? '减' : 
                          mod.action === 'increaseDosage' ? '加量' : '减量'})
                      </span>
                      {mod.suggestedDosage && (
                        <span className="text-sm text-purple-600 font-medium">
                          {mod.suggestedDosage}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{mod.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* 煎服方法与注意事项 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 煎服方法 */}
          <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <h4 className="font-semibold text-emerald-800 mb-3 flex items-center gap-2">
              <span>🔥 煎服方法</span>
            </h4>
            <p className="text-gray-700">{prescription.usage}</p>
            {prescription.dosageInstructions && (
              <div className="mt-3 p-3 bg-white rounded border border-emerald-100">
                <p className="text-sm text-emerald-700">{prescription.dosageInstructions}</p>
              </div>
            )}
          </div>
          
          {/* 注意事项 */}
          <div className="p-4 bg-rose-50 rounded-lg border border-rose-200">
            <h4 className="font-semibold text-rose-800 mb-3 flex items-center gap-2">
              <span>⚠️ 注意事项</span>
            </h4>
            <ul className="space-y-2">
              {prescription.precautions.map((precaution, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-rose-500 mt-1">•</span>
                  <span className="text-gray-700">{precaution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* 分析摘要 */}
        {analysisResult?.analysisSummary && (
          <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <h4 className="font-semibold text-indigo-800 mb-2">💭 分析摘要</h4>
            <p className="text-gray-700">{analysisResult.analysisSummary}</p>
          </div>
        )}
        
        {/* 诊断提示 */}
        {analysisResult?.diagnosticTips && analysisResult.diagnosticTips.length > 0 && (
          <div className="mt-6 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
            <h4 className="font-semibold text-cyan-800 mb-3">💡 诊断提示</h4>
            <ul className="space-y-2">
              {analysisResult.diagnosticTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-cyan-500 mt-1">→</span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            📝 本处方基于AI辨证论治生成，仅供参考。实际用药请咨询专业中医师，根据患者具体情况调整。
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="symptom-analyzer p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">六经症状分析</h2>
        <p className="text-gray-600">输入症状，系统自动分析可能的六经证候并推荐治疗方案</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：症状输入 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 快速症状选择 */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-700">💊 快速选择症状 (20个常用):</h3>
              <button
                onClick={() => setShowAllSymptoms(true)}
                className="px-4 py-2 text-sm bg-white text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                查看全部 {allSymptoms.length} 个症状
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {quickSymptoms.map(symptom => {
                const isSelected = symptomList.includes(symptom);
                const symptomInfo = symptomData.find(s => s.classicalTerm === symptom);
                
                return (
                  <button
                    key={symptom}
                    onClick={() => handleQuickSymptomSelect(symptom)}
                    disabled={isSelected}
                    className={`relative px-3 py-2 rounded-full text-sm transition-all group ${
                      isSelected
                        ? 'bg-green-100 text-green-800 border border-green-300 cursor-not-allowed'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-blue-100 hover:border-blue-300'
                    }`}
                    title={symptomInfo?.modernDescription || ''}
                  >
                    {symptom}
                    {isSelected && ' ✓'}
                    
                    {/* 悬停提示 */}
                    {symptomInfo && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {symptomInfo.modernDescription}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-3 text-xs text-gray-500">
              💡 提示：点击上方按钮查看全部 {allSymptoms.length} 个症状，或直接在下方输入
            </div>
          </div>

          {/* 症状输入区域 */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
            <div className="flex gap-2 mb-4">
              <input
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSymptom()}
                placeholder="手动输入症状，按回车或点击添加"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={addSymptom}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                添加
              </button>
              <button
                onClick={clearSymptoms}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                清空
              </button>
            </div>

            {/* 症状列表 */}
            {symptomList.length > 0 && (
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-700">已选症状 ({symptomList.length}个):</h4>
                  <button
                    onClick={() => setShowAllSymptoms(true)}
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    + 继续添加症状
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {symptomList.map((symptom, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-800 rounded-full"
                    >
                      <span>{symptom}</span>
                      <button
                        onClick={() => removeSymptom(symptom)}
                        className="text-green-600 hover:text-green-800 ml-1"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 分析按钮 */}
          <div className="text-center">
            <button
              onClick={handleAnalyze}
              disabled={isLoading || symptomList.length === 0}
              className={`px-8 py-4 text-lg font-semibold rounded-lg transition-all ${
                isLoading || symptomList.length === 0
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  分析中...
                </div>
              ) : (
                `开始分析 (${symptomList.length}个症状)`
              )}
            </button>
          </div>
        </div>

        {/* 右侧：分析历史 */}
        {analysisHistory.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-3">分析历史</h3>
            <div className="space-y-2">
              {analysisHistory.map(history => (
                <div
                  key={history.id}
                  onClick={() => loadFromHistory(history)}
                  className="p-3 bg-white border rounded-lg cursor-pointer hover:border-blue-300 transition-colors"
                >
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>{history.timestamp}</span>
                    <span>{history.symptoms.length}个症状</span>
                  </div>
                  <div className="text-sm text-gray-700 line-clamp-2">
                    {history.symptoms.join('、')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 分析结果 */}
      {analysisResult && (
        <div className="mt-8 space-y-6">
          {/* 错误提示 */}
          {analysisResult.error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{analysisResult.error}</p>
            </div>
          )}

          {/* 六经匹配结果 */}
          {analysisResult.meridianMatches.length > 0 && (
            <div className="bg-white border-2 border-green-200 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">📊 六经辨证分析结果</h3>
                {/* 显示详细处方按钮 */}
                {analysisResult.prescription && !showDetailedPrescription && (
                  <button
                    onClick={() => setShowDetailedPrescription(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    查看详细处方
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {analysisResult.meridianMatches.map((match, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 ${
                      index === 0
                        ? 'bg-green-50 border-green-300 shadow-lg'
                        : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg text-gray-800">{match.meridian}</h4>
                      <div className={`px-2 py-1 rounded text-sm font-semibold ${
                        match.confidence > 70
                          ? 'bg-green-100 text-green-800'
                          : match.confidence > 40
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {match.confidence}% 匹配
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{match.reason}</p>
                    {index === 0 && (
                      <div className="mt-2 text-xs text-green-600 font-semibold">
                        🎯 最可能证候
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* 推荐治疗方案 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 推荐方剂 - 现在只显示一个主方 */}
                {analysisResult.recommendedFormulas.length > 0 && (
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                        <span>💊 推荐主方</span>
                      </h4>
                      {analysisResult.recommendedFormulas.length === 1 && (
                        <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                          精准确认
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.recommendedFormulas.map((formula, index) => (
                        <span
                          key={index}
                          className="px-4 py-3 bg-white border-2 border-yellow-400 text-yellow-800 rounded-lg font-bold text-lg"
                        >
                          {formula}
                        </span>
                      ))}
                    </div>
                    {analysisResult.recommendedFormulas.length === 1 && (
                      <div className="mt-3 text-sm text-yellow-700">
                        系统已为您选择最合适的主方进行加减化裁
                      </div>
                    )}
                  </div>
                )}

                {/* 推荐中药 */}
                {analysisResult.recommendedHerbs.length > 0 && (
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <span>🌿 核心药材</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.recommendedHerbs.map((herb, index) => (
                        <span
                          key={index}
                          className="px-3 py-2 bg-white border border-purple-300 text-purple-800 rounded-lg text-sm font-medium"
                        >
                          {herb}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 显示分析摘要（如果有） */}
              {analysisResult.analysisSummary && !showDetailedPrescription && (
                <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-indigo-600">📝 辨证要点</span>
                  </div>
                  <p className="text-gray-700">{analysisResult.analysisSummary}</p>
                </div>
              )}

              {/* 分析说明 */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  💡 本分析基于《伤寒论》六经辨证理论，结果为AI智能分析，仅供参考。
                  实际诊疗请咨询专业中医师。
                </p>
              </div>
            </div>
          )}

          {/* 无匹配结果 */}
          {analysisResult.meridianMatches.length === 0 && !analysisResult.error && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-yellow-800 mb-2">未找到匹配的六经证候</h3>
              <p className="text-yellow-700">
                请输入更具体的症状描述，或尝试使用系统提供的快速症状选项。
              </p>
            </div>
          )}
        </div>
      )}

      {/* 显示详细处方 */}
      {showDetailedPrescription && renderDetailedPrescription()}

      {/* 显示所有症状模态框 */}
      {renderAllSymptomsModal()}

      {/* 使用说明 */}
      {!analysisResult && symptomList.length === 0 && (
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-3">💡 使用说明</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h4 className="font-medium mb-2">推荐输入方式：</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>选择快速症状或手动输入</li>
                <li>点击"查看全部症状"浏览完整症状库</li>
                <li>可输入多个相关症状</li>
                <li>系统自动分析六经归属</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">新增功能：</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>单一主方推荐（更符合临床）</li>
                <li>智能药材加减化裁</li>
                <li>详细处方信息展示</li>
                <li>煎服方法与注意事项</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomAnalyzer;