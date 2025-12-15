// src/services/meridianGraphService.ts
import { sixMeridiansData } from '../data/sixMeridiansData';

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

export interface GraphLink {
  source: string;
  target: string;
  type: string;
  description: string;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export const getMeridianGraphData = (): GraphData => {
  const nodes: GraphNode[] = sixMeridiansData.map(meridian => ({
    id: meridian.id,
    name: meridian.name,
    type: meridian.type,
    description: meridian.description
  }));

  const links: GraphLink[] = [];
  
  sixMeridiansData.forEach(meridian => {
    meridian.relationships.forEach(relationship => {
      links.push({
        source: meridian.id,
        target: relationship.target,
        type: relationship.type,
        description: relationship.description
      });
    });
  });

  return { nodes, links };
};

// 改进的固定布局 - 更好的分布
export const getFixedLayoutPositions = () => {
  return {
    taiyang: { x: 300, y: 100 },    // 顶部中间
    yangming: { x: 500, y: 200 },   // 右上
    shaoyang: { x: 500, y: 400 },   // 右下
    taiyin: { x: 100, y: 200 },     // 左上
    shaoyin: { x: 100, y: 400 },    // 左下
    jueyin: { x: 300, y: 500 }      // 底部中间
  };
};

// 获取图谱的边界尺寸
export const getGraphDimensions = () => {
  const positions = getFixedLayoutPositions();
  const allX = Object.values(positions).map(p => p.x);
  const allY = Object.values(positions).map(p => p.y);
  
  return {
    width: Math.max(...allX) - Math.min(...allX) + 200, // 增加边距
    height: Math.max(...allY) - Math.min(...allY) + 200
  };
};