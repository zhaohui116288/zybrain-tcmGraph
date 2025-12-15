 // src/data/sixMeridiansData.ts
import { Meridian } from '../types/tcm-entities';

export const sixMeridiansData: Meridian[] = [
  {
    id: 'taiyang',
    name: '太阳经',
    type: 'yang',
    description: '太阳为开，主表证，涉及膀胱经和小肠经',
    symptoms: ['头痛', '项强', '恶寒', '发热', '脉浮'],
    formulas: ['麻黄汤', '桂枝汤', '葛根汤'],
    herbs: ['麻黄', '桂枝', '葛根'],
    relationships: [
      { source: 'taiyang', target: 'yangming', type: '表里关系', description: '太阳与阳明互为表里' },
      { source: 'taiyang', target: 'shaoyang', type: '相传关系', description: '太阳传至少阳' }
    ]
  },
  {
    id: 'yangming',
    name: '阳明经',
    type: 'yang',
    description: '阳明为阖，主里实热证，涉及胃经和大肠经',
    symptoms: ['壮热', '大汗', '大渴', '脉洪大', '便秘'],
    formulas: ['白虎汤', '承气汤', '调胃承气汤'],
    herbs: ['石膏', '知母', '大黄'],
    relationships: [
      { source: 'yangming', target: 'taiyang', type: '表里关系', description: '阳明与太阳互为表里' },
      { source: 'yangming', target: 'taiyin', type: '相传关系', description: '阳明传至太阴' }
    ]
  },
  {
    id: 'shaoyang',
    name: '少阳经',
    type: 'yang',
    description: '少阳为枢，主半表半里证，涉及胆经和三焦经',
    symptoms: ['往来寒热', '胸胁苦满', '口苦咽干', '目眩', '脉弦'],
    formulas: ['小柴胡汤', '大柴胡汤', '黄芩汤'],
    herbs: ['柴胡', '黄芩', '半夏'],
    relationships: [
      { source: 'shaoyang', target: 'jueyin', type: '表里关系', description: '少阳与厥阴互为表里' },
      { source: 'shaoyang', target: 'taiyin', type: '相传关系', description: '少阳传至太阴' }
    ]
  },
  {
    id: 'taiyin',
    name: '太阴经',
    type: 'yin',
    description: '太阴为开，主里虚寒证，涉及脾经和肺经',
    symptoms: ['腹满而吐', '食不下', '自利', '时腹自痛', '脉弱'],
    formulas: ['理中汤', '四逆汤', '桂枝人参汤'],
    herbs: ['人参', '白术', '干姜'],
    relationships: [
      { source: 'taiyin', target: 'yangming', type: '表里关系', description: '太阴与阳明互为表里' },
      { source: 'taiyin', target: 'shaoyin', type: '相传关系', description: '太阴传至少阴' }
    ]
  },
  {
    id: 'shaoyin',
    name: '少阴经',
    type: 'yin',
    description: '少阴为枢，主心肾阳虚证，涉及心经和肾经',
    symptoms: ['脉微细', '但欲寐', '四肢厥逆', '下利清谷'],
    formulas: ['四逆汤', '真武汤', '黄连阿胶汤'],
    herbs: ['附子', '肉桂', '黄连'],
    relationships: [
      { source: 'shaoyin', target: 'taiyang', type: '表里关系', description: '少阴与太阳互为表里' },
      { source: 'shaoyin', target: 'jueyin', type: '相传关系', description: '少阴传至厥阴' }
    ]
  },
  {
    id: 'jueyin',
    name: '厥阴经',
    type: 'yin',
    description: '厥阴为阖，主寒热错杂证，涉及肝经和心包经',
    symptoms: ['消渴', '气上撞心', '心中疼热', '饥而不欲食', '食则吐蛔'],
    formulas: ['乌梅丸', '当归四逆汤', '麻黄升麻汤'],
    herbs: ['乌梅', '当归', '细辛'],
    relationships: [
      { source: 'jueyin', target: 'shaoyang', type: '表里关系', description: '厥阴与少阳互为表里' },
      { source: 'jueyin', target: 'taiyin', type: '相传关系', description: '厥阴传至太阴' }
    ]
  }
];