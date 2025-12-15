 // src/App.jsx
import React, { useState } from 'react';
import HerbDatabase from './components/meridian-system/HerbDatabase';
import SymptomTranslation from './components/meridian-system/SymptomTranslation';
import MeridianExplanation from './components/meridian-system/MeridianExplanation';
import MeridianGraph from './components/meridian-system/MeridianGraph';
import SymptomAnalyzer from './components/meridian-system/SymptomAnalyzer';
import FormulaDatabase from './components/formula-system/FormulaDatabase'; // 新增方剂数据库

function App() {
  const [activeTab, setActiveTab] = useState('analyzer');

  // 标签页配置 - 在原来基础上添加方剂数据库
  const tabs = [
    { 
      id: 'analyzer', 
      name: '症状分析', 
      component: <SymptomAnalyzer />,
      description: '智能六经辨证分析',
      icon: '🔍'
    },
    { 
      id: 'graph', 
      name: '六经图谱', 
      component: <MeridianGraph />,
      description: '可视化网络关系图',
      icon: '🌐'
    },
    { 
      id: 'explanation', 
      name: '六经解读', 
      component: <MeridianExplanation />,
      description: '现代比喻通俗解释',
      icon: '📚'
    },
    { 
      id: 'herbs', 
      name: '中药数据库', 
      component: <HerbDatabase />,
      description: '完整中药信息查询',
      icon: '🌿'
    },
    { 
      id: 'formulas',  // 新增方剂数据库
      name: '方剂数据库', 
      component: <FormulaDatabase />,
      description: '经典方剂详细解析',
      icon: '📜'
    },
    { 
      id: 'symptoms', 
      name: '症状翻译', 
      component: <SymptomTranslation />,
      description: '古今症状对照翻译',
      icon: '💬'
    }
  ];

  const activeTabInfo = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* 头部 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                中医六经知识图谱系统
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                探索《伤寒论》六经辨证的智慧
              </p>
            </div>
            <div className="mt-4 sm:mt-0 text-center sm:text-right">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                系统运行中
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 导航栏 */}
      <nav className="bg-white shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto space-x-1 py-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-3 rounded-lg whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-800 border border-gray-200'
                }`}
              >
                <span className="text-lg mr-2">{tab.icon}</span>
                <div className="text-left">
                  <div className="font-semibold text-sm">{tab.name}</div>
                  <div className={`text-xs ${
                    activeTab === tab.id ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {tab.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 当前标签页信息 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{activeTabInfo?.icon}</span>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {activeTabInfo?.name}
                </h2>
                <p className="text-gray-600 text-sm">
                  {activeTabInfo?.description}
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              共 {tabs.length} 个功能模块
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {tabs.find(tab => tab.id === activeTab)?.component}
        </div>

        {/* 页脚信息 */}
        <footer className="mt-8 text-center">
          <div className="bg-white rounded-lg p-6 shadow border">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              🎯 系统特色功能
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm text-gray-600">
              <div className="flex flex-col items-center">
                <div className="text-2xl mb-1">🤖</div>
                <div>智能辨证</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl mb-1">📊</div>
                <div>数据可视化</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl mb-1">🎓</div>
                <div>学习辅助</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl mb-1">🌿</div>
                <div>中药查询</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl mb-1">📜</div>
                <div>方剂解析</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl mb-1">🔍</div>
                <div>精准分析</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t text-xs text-gray-500">
              <p>基于《伤寒论》六经辨证理论 • 现代技术赋能传统中医 • 仅供学习参考</p>
              <p className="mt-1">实际诊疗请咨询专业中医师</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;