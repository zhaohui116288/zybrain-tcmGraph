 // src/components/meridian-system/MeridianGraph.jsx
import React, { useState, useEffect, useRef } from 'react';
import { getMeridianGraphData, getFixedLayoutPositions, getGraphDimensions } from '../../services/meridianGraphService';
import { sixMeridiansData } from '../../data/sixMeridiansData';

const MeridianGraph = () => {
  const [graphData, setGraphData] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [zoom, setZoom] = useState(0.8); // 默认缩小一点以显示全图
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef(null);

  useEffect(() => {
    const data = getMeridianGraphData();
    const positions = getFixedLayoutPositions();
    
    // 为节点添加固定位置
    data.nodes = data.nodes.map(node => ({
      ...node,
      ...positions[node.id]
    }));
    
    setGraphData(data);
  }, []);

  // 节点颜色根据阴阳类型
  const getNodeColor = (type) => {
    return type === 'yang' ? '#3B82F6' : '#EF4444';
  };

  // 连线颜色根据关系类型
  const getLinkColor = (type) => {
    return type === '表里关系' ? '#10B981' : '#F59E0B';
  };

  // 处理节点点击
  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  // 处理缩放
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.3));
  };

  const handleResetZoom = () => {
    setZoom(0.8);
    setPan({ x: 0, y: 0 });
  };

  // 拖拽处理
  const handleMouseDown = (e) => {
    if (e.target.tagName === 'svg') {
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPan(prev => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!graphData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">加载知识图谱...</div>
      </div>
    );
  }

  const graphDimensions = getGraphDimensions();

  return (
    <div className="meridian-graph p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">六经知识图谱</h2>
          <p className="text-gray-600 mt-1">可视化展示六经传变关系和网络结构</p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleZoomOut}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
            title="缩小"
          >
            🔍−
          </button>
          <button
            onClick={handleResetZoom}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
            title="重置视图"
          >
            🔍
          </button>
          <button
            onClick={handleZoomIn}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
            title="放大"
          >
            🔍+
          </button>
        </div>
      </div>

      <div className="graph-container relative border-2 border-gray-200 rounded-lg bg-gray-50 overflow-auto">
        {/* 图例 */}
        <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-md z-10 border">
          <h4 className="font-semibold text-gray-700 mb-2">图例</h4>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>阳经</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>阴经</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-green-500"></div>
              <span>表里关系</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-yellow-500"></div>
              <span>相传关系</span>
            </div>
          </div>
        </div>

        {/* SVG 图谱 - 使用更大的视图框 */}
        <div 
          className="overflow-auto min-h-96"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <svg
            ref={svgRef}
            width={graphDimensions.width + 200}
            height={graphDimensions.height + 200}
            style={{ 
              transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
              transformOrigin: '0 0'
            }}
            className="transition-transform duration-150"
          >
            {/* 连接线 */}
            {graphData.links.map((link, index) => {
              const sourceNode = graphData.nodes.find(n => n.id === link.source);
              const targetNode = graphData.nodes.find(n => n.id === link.target);
              
              if (!sourceNode || !targetNode) return null;

              const isHovered = hoveredLink === link;
              const strokeWidth = isHovered ? 3 : 2;
              const strokeColor = getLinkColor(link.type);
              
              // 计算连线中点坐标
              const midX = (sourceNode.x + targetNode.x) / 2;
              const midY = (sourceNode.y + targetNode.y) / 2;
              
              // 计算连线角度，用于调整文字方向
              const angle = Math.atan2(targetNode.y - sourceNode.y, targetNode.x - sourceNode.x) * 180 / Math.PI;
              
              return (
                <g key={index}>
                  <line
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={link.type === '相传关系' ? '5,5' : 'none'}
                    className="transition-all duration-200"
                    onMouseEnter={() => setHoveredLink(link)}
                    onMouseLeave={() => setHoveredLink(null)}
                  />
                  {/* 改进的连线标签 */}
                  <g transform={`translate(${midX}, ${midY}) rotate(${angle})`}>
                    <rect
                      x="-25"
                      y="-15"
                      width="50"
                      height="16"
                      fill="white"
                      fillOpacity="0.9"
                      stroke="#E5E7EB"
                      strokeWidth="0.5"
                      rx="3"
                    />
                    <text
                      x="0"
                      y="-3"
                      textAnchor="middle"
                      fontSize="10"
                      fill="#374151"
                      className="pointer-events-none"
                    >
                      {link.type === '表里关系' ? '表里' : '相传'}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* 节点 */}
            {graphData.nodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const isHovered = hoveredNode?.id === node.id;
              const nodeSize = isSelected ? 50 : isHovered ? 45 : 40;
              const strokeWidth = isSelected ? 3 : 2;
              const fillColor = getNodeColor(node.type);

              return (
                <g key={node.id}>
                  {/* 节点圆圈 */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={nodeSize / 2}
                    fill={fillColor}
                    stroke={isSelected ? '#1D4ED8' : '#FFFFFF'}
                    strokeWidth={strokeWidth}
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => handleNodeClick(node)}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                  />
                  {/* 节点文字 */}
                  <text
                    x={node.x}
                    y={node.y}
                    textAnchor="middle"
                    dy="0.3em"
                    fontSize={isSelected ? "12" : "11"}
                    fontWeight={isSelected ? "bold" : "normal"}
                    fill="white"
                    className="pointer-events-none select-none"
                  >
                    {node.name}
                  </text>
                  {/* 悬停提示 */}
                  {isHovered && (
                    <text
                      x={node.x}
                      y={node.y - 35}
                      textAnchor="middle"
                      fontSize="10"
                      fill="#374151"
                      fontWeight="500"
                      className="pointer-events-none"
                    >
                      {node.description}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* 节点详情面板 */}
        {selectedNode && (
          <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg border-2 border-blue-200 max-w-sm z-10">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-gray-800">{selectedNode.name}</h3>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                  selectedNode.type === 'yang' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {selectedNode.type === 'yang' ? '阳经' : '阴经'}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm">{selectedNode.description}</p>
              
              {/* 显示相关关系 */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">相关关系:</h4>
                <div className="space-y-1">
                  {graphData.links
                    .filter(link => link.source === selectedNode.id || link.target === selectedNode.id)
                    .map((link, index) => {
                      const relatedNodeId = link.source === selectedNode.id ? link.target : link.source;
                      const relatedNode = graphData.nodes.find(n => n.id === relatedNodeId);
                      return (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <span className="text-gray-500">→</span>
                          <span className="font-medium">{relatedNode?.name}</span>
                          <span className={`px-1 py-0.5 rounded text-xs ${
                            link.type === '表里关系' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {link.type}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 连线详情提示 */}
        {hoveredLink && (
          <div className="absolute top-20 right-4 bg-white p-3 rounded-lg shadow-md border z-10">
            <h4 className="font-semibold text-gray-700 mb-1">{hoveredLink.type}</h4>
            <p className="text-sm text-gray-600">{hoveredLink.description}</p>
          </div>
        )}
      </div>

      {/* 操作说明 */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex flex-wrap gap-4 text-sm text-blue-800 justify-center">
          <div className="flex items-center gap-1">
            <span>🖱️ 点击节点</span>
            <span>查看详情</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🔍 滚轮/按钮</span>
            <span>缩放视图</span>
          </div>
          <div className="flex items-center gap-1">
            <span>👆 拖拽空白处</span>
            <span>移动图谱</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🖱️ 悬停连线</span>
            <span>查看关系</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeridianGraph;