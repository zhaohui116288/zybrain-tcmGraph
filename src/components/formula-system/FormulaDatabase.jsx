// src/components/formula-system/FormulaDatabase.jsx
import { useState, useMemo } from 'react'
import { formulaData } from '../../data/formulaData'

const FormulaDatabase = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedFormula, setSelectedFormula] = useState(null)

  // 获取所有类别
  const categories = useMemo(() => {
    const allCategories = formulaData
      .map(formula => formula.category)
      .filter(Boolean)
    return [...new Set(allCategories)]
  }, [])

  // 过滤方剂
  const filteredFormulas = useMemo(() => {
    return formulaData.filter(formula => {
      const matchesSearch = !searchTerm || 
        formula.name.includes(searchTerm) || 
        formula.pinyinName.includes(searchTerm) ||
        formula.functions.some(func => func.includes(searchTerm))
      
      const matchesCategory = !selectedCategory || formula.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">方剂数据库</h1>
      
      {/* 搜索和筛选 */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 搜索框 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              搜索方剂
            </label>
            <input
              type="text"
              placeholder="输入方剂名称、拼音或功效..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* 类别筛选 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              方剂类别
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">所有类别</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 方剂列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFormulas.map((formula) => (
          <div
            key={formula.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedFormula(formula)}
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {formula.name}
                </h3>
                {formula.category && (
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    {formula.category}
                  </span>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{formula.pinyinName}</p>
              
              <div className="mb-3">
                <p className="text-sm text-gray-700">
                  <strong>组成：</strong>
                  {formula.composition.join('，')}
                </p>
              </div>
              
              <div className="mb-2">
                <p className="text-sm text-gray-700">
                  <strong>功效：</strong>
                  {formula.functions.join('，')}
                </p>
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-2">
                {formula.indications}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 空状态 */}
      {filteredFormulas.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📜</div>
          <p className="text-gray-500">未找到匹配的方剂</p>
        </div>
      )}

      {/* 方剂详情模态框 */}
      {selectedFormula && (
        <FormulaDetailModal 
          formula={selectedFormula} 
          onClose={() => setSelectedFormula(null)} 
        />
      )}
    </div>
  )
}

// 方剂详情模态框组件
const FormulaDetailModal = ({ formula, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* 头部 */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{formula.name}</h2>
              <p className="text-xl text-gray-600 mt-1">{formula.pinyinName}</p>
              <div className="flex items-center mt-2 space-x-4">
                {formula.source && (
                  <span className="text-sm text-gray-500">出处：{formula.source}</span>
                )}
                {formula.category && (
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {formula.category}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 左侧信息 */}
            <div className="space-y-6">
              {/* 组成 */}
              <div>
                <h3 className="text-lg font-semibold mb-3">方剂组成</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  {formula.detailedComposition ? (
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">角色</th>
                          <th className="text-left py-2">药材</th>
                          <th className="text-left py-2">用量</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formula.detailedComposition.map((comp, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-2">
                              <span className={`inline-block px-2 py-1 rounded text-xs ${
                                comp.role === '君' ? 'bg-red-100 text-red-800' :
                                comp.role === '臣' ? 'bg-blue-100 text-blue-800' :
                                comp.role === '佐' ? 'bg-green-100 text-green-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {comp.role}
                              </span>
                            </td>
                            <td className="py-2 font-medium">{comp.herb.name}</td>
                            <td className="py-2">{comp.dosage}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-gray-700">{formula.composition.join('，')}</p>
                  )}
                </div>
              </div>

              {/* 功效主治 */}
              <div>
                <h3 className="text-lg font-semibold mb-3">功效主治</h3>
                <div className="space-y-2">
                  <p><strong>功效：</strong>{formula.functions.join('，')}</p>
                  <p><strong>主治：</strong>{formula.indications}</p>
                </div>
              </div>
            </div>

            {/* 右侧信息 */}
            <div className="space-y-6">
              {/* 用法用量 */}
              {(formula.dosage || formula.preparation) && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">用法用量</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    {formula.dosage && <p className="mb-2"><strong>用法：</strong>{formula.dosage}</p>}
                    {formula.preparation && <p><strong>制备：</strong>{formula.preparation}</p>}
                  </div>
                </div>
              )}

              {/* 现代应用 */}
              {formula.modernApplications && formula.modernApplications.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">现代应用</h3>
                  <div className="flex flex-wrap gap-2">
                    {formula.modernApplications.map((app, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 禁忌 */}
              {formula.contraindications && formula.contraindications.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-red-600">禁忌</h3>
                  <div className="bg-red-50 rounded-lg p-4">
                    <ul className="list-disc list-inside space-y-1">
                      {formula.contraindications.map((contra, index) => (
                        <li key={index} className="text-red-700">{contra}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 方解 */}
          {formula.analysis && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">方解</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">{formula.analysis}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FormulaDatabase 