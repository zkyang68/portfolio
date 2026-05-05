import type { ProfileData } from '../types';

const profile: ProfileData = {
  personal: {
    name: '杨志科',
    title: '跨境电商运营 / 跨境电商数据分析',
    tagline: '数据驱动决策，AI赋能运营 — 5年数据分析与AI建模经验，专注跨境电商领域',
    email: '15221141663@163.com',
    phone: '15821141108',
    location: '中国',
    cities: ['南昌', '义乌', '杭州'],
    salary: '8K-15K',
    social: {
      github: '',
      linkedin: '',
      website: '',
    },
    avatarUrl: './images/ph.jpg',
    heroBackgroundUrl: './images/bg.png',
  },

  about: {
    paragraphs: [
      '拥有5年数据分析与AI建模经验，专注于跨境电商运营与数据分析领域。擅长运用SQL、Python等工具处理运营全链路数据，搭建自动化数据看板，通过AI技术驱动选品、销量预测与广告投放优化。',
      '具备跨行业数据应用能力，曾主导智慧水务AI项目，实现月药剂节省14.4%。能够将数据建模、流程优化等核心能力迁移至跨境电商场景，为店铺运营提供数据支撑与决策依据。',
      '熟悉亚马逊等跨境电商平台规则，具备跨团队协同与项目管理经验。目前寻求跨境电商运营或数据分析相关岗位，期望用数据与AI能力助力业务增长。'
    ],
    highlights: [
      '5年+ 数据分析经验',
      'AI建模与落地能力',
      '跨境电商运营经验',
      '跨团队协同管理',
      'Tableau自动化看板',
      'Python + SQL 数据栈'
    ],
  },

  skills: [
    {
      category: '数据处理',
      items: [
        { name: 'SQL', level: 82 },
        { name: 'Excel高级功能', level: 75 },
        { name: '跨境数据标注', level: 90 }
      ],
    },
    {
      category: 'AI建模',
      items: [
        { name: 'Python', level: 82 },
        { name: '模型开发', level: 75 },
        { name: '优化能力', level: 75 }
      ],
    },
    {
      category: '跨境运营',
      items: [
        { name: '熟悉亚马逊等平台规则', level: 75 },
        { name: '选品', level: 75 },
        { name: '广告投放', level: 75 },
        { name: 'Tableau', level: 82 }
      ],
    },
    {
      category: '综合能力',
      items: [
        { name: '跨团队协同', level: 75 },
        { name: '痛点分析与落地能力', level: 75 }
      ],
    }
  ],

  experience: [
    {
      company: '逸菁（上海）科技有限公司',
      role: '数据分析师（运营方向）',
      startDate: '2022-07',
      endDate: '2024-10',
      description: [
        '用SQL+Python处理运营全链路数据，优化流程、输出分析报告，搭建Tableau自动化看板，对接多团队提供数据支撑，积累跨境运营数据实践经验。'
      ],
      technologies: ['数据分析'],
    },
    {
      company: '上海上实龙创智能科技股份有限公司',
      role: 'AI算法工程师',
      startDate: '2019-03',
      endDate: '2022-04',
      description: [
        '主导智慧污水智能加药项目（2019.4-2021.4），负责数据埋点、模型构建与部署优化，项目在杭州湾水厂运行，实现月药剂节省14.4%。',
        '负责数据埋点设计、AI算法研发调试，运用Python解决工艺痛点，积累的建模、落地能力适配跨境AI选品、销量预测需求。'
      ],
      technologies: ['数据分析'],
    },
    {
      company: 'YEH BROTHERS MALAYSIA SDN BHD',
      role: '生产制造经理',
      startDate: '2016-10',
      endDate: '2018-09',
      description: [
        '搭建生产供应链数据管理流程，通过数据分析优化工艺、降低成本，对接多部门推进项目，适配跨境运营数据分析与协同需求。'
      ],
      technologies: ['数据分析'],
    },
    {
      company: 'YEH BROTHERS MALAYSIA SDN BHD',
      role: '项目经理',
      startDate: '2014-11',
      endDate: '2016-10',
      description: [
        '统筹生产多环节运营与成本管控，主导工艺改进与新品开发，积累的统筹、优化能力可迁移至跨境选品、店铺运营。'
      ],
      technologies: ['数据分析'],
    },
    {
      company: 'YEH BROTHERS MALAYSIA SDN BHD',
      role: '项目技术专员',
      startDate: '2013-08',
      endDate: '2014-10',
      description: [
        '参与设备调试、模具优化及项目工艺开发，推动项目落地，能力适配跨境运营工具调试、Listing优化。'
      ],
      technologies: ['数据分析'],
    }
  ],

  projects: [
    {
      title: '跨境电商AI选品与销量预测项目',
      role: '项目负责人',
      duration: '20XX.10 - 20XX.12',
      description: [
        '搭建AI选品与销量预测模型，推动选品成功率提升至86%，库存积压率降低32%，核心店铺月销达20万。'
      ],
      achievements: '选品成功率86% | 库存积压率降32% | 月销20万',
    },
    {
      title: '跨境电商AI广告投放优化项目',
      role: '核心成员',
      duration: '20XX.04 - 20XX.05',
      description: [
        '优化广告投放策略，将ACOS降至25%，ROI提升至1:4.2，带动月销增长18%。'
      ],
      achievements: 'ACOS 25% | ROI 1:4.2 | 月销增长18%',
    },
    {
      title: '智慧污水智能加药项目',
      role: '项目负责人',
      duration: '2019.04 - 2021.04',
      description: [
        '搭建精确加药体系，负责数据埋点与模型部署，项目落地后月药剂节省14.4%，锤炼的统筹、建模能力适配跨境场景。'
      ],
      achievements: '月药剂节省14.4%',
    }
  ],

  education: [
    {
      institution: '哈尔滨商业大学',
      degree: '本科',
      field: '工业工程',
      startDate: '2009-08',
      endDate: '2013-07',
      achievements: [
        '工业工程基础、统计学、数据挖掘、供应链管理、生产运作管理（专业前10%）'
      ],
    }
  ],
};

export default profile;
