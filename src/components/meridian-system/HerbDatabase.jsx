// src/components/meridian-system/HerbDatabase.jsx
import React, { useState, useMemo } from 'react';
import { herbData } from '../../data/herbData';

const HerbDatabase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHerb, setSelectedHerb] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');

  // 获取所有分类
  const categories = useMemo(() => {
    const cats = [...new Set(herbData.map(herb => herb.category))];
    return ['all', ...cats];
  }, []);

  // 筛选中药
  const filteredHerbs = useMemo(() => {
    return herbData.filter(herb => {
      const matchesSearch = herb.name.includes(searchTerm) || 
                          herb.pinyinName.includes(searchTerm) ||
                          herb.effects.some(effect => effect.includes(searchTerm));
      const matchesCategory = filterCategory === 'all' || herb.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, filterCategory]);

  return (
    <div className="herb-database p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">中药数据库</h2>
      <p className="text-gray-600 mb-6">探索传统中药的功效与用法</p>
      
      {/* 搜索和筛选 */}
      <div className="filters mb-6 space-y-4 md:space-y-0 md:flex md:gap-4">
        <div className="search-box flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜索中药名称、拼音或功效..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        
        <div className="category-filter">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full md:w-48 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? '所有分类' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="herb-layout flex flex-col lg:flex-row gap-6">
        {/* 中药列表 */}
        <div className="herb-list flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredHerbs.map(herb => (
              <div
                key={herb.id}
                onClick={() => setSelectedHerb(herb)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedHerb?.id === herb.id 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{herb.name}</h3>
                    <p className="text-gray-600 text-sm">{herb.pinyinName}</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                    {herb.category}
                  </span>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {herb.effects.join('，')}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {herb.meridianAffinity.map(meridian => (
                    <span 
                      key={meridian} 
                      className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                    >
                      {meridian}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredHerbs.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              没有找到匹配的中药
            </div>
          )}
        </div>

        {/* 中药详情面板 */}
        {selectedHerb && (
          <div className="herb-detail lg:w-96">
            <div className="sticky top-6 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
              <button
                onClick={() => setSelectedHerb(null)}
                className="float-right text-gray-500 hover:text-gray-700 text-lg"
              >
                ✕
              </button>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{selectedHerb.name}</h3>
              <p className="text-gray-600 mb-4">{selectedHerb.pinyinName}</p>
              
              <div className="space-y-4">
                <div className="p-3 bg-white rounded-lg border">
                  <h4 className="font-semibold text-gray-700 mb-2">性味归经</h4>
                  <p className="text-gray-800">性味: {selectedHerb.natureTaste}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedHerb.meridianAffinity.map(meridian => (
                      <span key={meridian} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {meridian}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border">
                  <h4 className="font-semibold text-gray-700 mb-2">功效</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedHerb.effects.map((effect, index) => (
                      <li key={index} className="text-gray-800">{effect}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-white rounded-lg border">
                  <h4 className="font-semibold text-gray-700 mb-2">主治</h4>
                  <p className="text-gray-800">{selectedHerb.indications}</p>
                </div>

                {selectedHerb.usageDosage && (
                  <div className="p-3 bg-white rounded-lg border">
                    <h4 className="font-semibold text-gray-700 mb-2">用法用量</h4>
                    <p className="text-gray-800">{selectedHerb.usageDosage}</p>
                  </div>
                )}

                {selectedHerb.contraindications && (
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-700 mb-2">禁忌</h4>
                    <p className="text-red-600">{selectedHerb.contraindications}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 统计信息 */}
      <div className="mt-6 text-center text-sm text-gray-500">
        共 {filteredHerbs.length} 味中药 {filterCategory !== 'all' && `（${filterCategory}）`}
      </div>
    </div>
  );
};

export default HerbDatabase;