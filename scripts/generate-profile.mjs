import { readFileSync, writeFileSync, watch } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TXT_PATH = join(__dirname, '..', 'myfiles', 'my-info.txt');
const OUTPUT_PATH = join(__dirname, '..', 'src', 'data', 'profile.ts');

function parse(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  // === Personal info (lines 0-1) ===
  const personalLine = lines[0] || '';
  const contactLine = lines[1] || '';

  const nameMatch = personalLine.match(/姓名[：:]\s*(.+?)(?:\s*[|｜]\s*|$)/);
  const name = nameMatch ? nameMatch[1].trim() : '';

  const phoneMatch = contactLine.match(/联系电话[：:]\s*(\S+)/);
  const phone = phoneMatch ? phoneMatch[1].trim() : '';

  const emailMatch = contactLine.match(/电子邮箱[：:]\s*(\S+)/);
  const email = emailMatch ? emailMatch[1].trim() : '';

  // === Find section boundaries ===
  const sectionIndex = {};
  const sectionHeaders = ['求职意向', '教育背景', '工作经历', '核心业绩', '核心技能', '项目经历'];
  for (const header of sectionHeaders) {
    const idx = lines.findIndex(l => l.includes(header));
    if (idx !== -1) sectionIndex[header] = idx;
  }

  // === Job target ===
  let title = '', salary = '', cities = [];
  if (sectionIndex['求职意向'] !== undefined) {
    const start = sectionIndex['求职意向'] + 1;
    for (let i = start; i < lines.length; i++) {
      if (i === sectionIndex['教育背景']) break;
      const l = lines[i];
      if (l.includes('意向岗位')) {
        title = l.replace(/意向岗位[：:]\s*/, '').trim();
      } else if (l.includes('期望薪资')) {
        salary = l.replace(/期望薪资[：:]\s*/, '').trim();
      } else if (l.includes('期望城市')) {
        cities = l.replace(/期望城市[：:]\s*/, '').trim().split(/[、,，]/).map(s => s.trim());
      }
    }
  }

  // === Education ===
  let education = [];
  if (sectionIndex['教育背景'] !== undefined) {
    const start = sectionIndex['教育背景'] + 1;
    const end = sectionIndex['工作经历'] || lines.length;
    let current = null;
    for (let i = start; i < end; i++) {
      const l = lines[i];
      if (l.startsWith('•') || l.startsWith('核心课程') || l.startsWith('-')) {
        // continuation of previous education entry
        if (current) {
          const cleaned = l.replace(/^[•\-]\s*/, '').replace(/^核心课程[：:]\s*/, '').trim();
          if (cleaned) current.achievements.push(cleaned);
        }
      } else if (l.includes('|')) {
        // new education entry
        if (current) education.push(current);
        const parts = l.split(/[|｜]/).map(s => s.trim());
        current = {
          institution: parts[0] || '',
          degree: parts[1] ? parts[1].replace(/（.*）/, '').replace(/\(.*\)/, '').trim() : '',
          field: parts[1] ? parts[1].replace(/（.*）/, '').replace(/\(.*\)/, '').trim() : '',
          startDate: '',
          endDate: '',
          achievements: [],
        };
        // Parse date from the line
        const dateMatch = l.match(/(\d{4}\.\d{2})\s*[-–—]\s*(\d{4}\.\d{2})/);
        if (dateMatch) {
          current.startDate = dateMatch[1].replace('.', '-');
          current.endDate = dateMatch[2].replace('.', '-');
        }
        // Try to extract degree info
        const degreePart = parts[1] || '';
        const degreeMatch = degreePart.match(/(.+?)（(.+?)）/);
        if (degreeMatch) {
          current.field = degreeMatch[1].trim();
          current.degree = degreeMatch[2].trim();
        }
      }
    }
    if (current) education.push(current);
  }

  // === Experience ===
  let experience = [];
  if (sectionIndex['工作经历'] !== undefined) {
    const start = sectionIndex['工作经历'] + 1;
    const end = sectionIndex['核心业绩'] || lines.length;
    let current = null;
    for (let i = start; i < end; i++) {
      const l = lines[i];
      if ((l.startsWith('•') || l.startsWith('-')) && current) {
        current.description.push(l.replace(/^[•\-]\s*/, '').trim());
      } else if (l.includes('|')) {
        if (current) experience.push(current);
        const parts = l.split(/[|｜]/).map(s => s.trim());
        const company = parts[0] || '';
        const role = parts[1] || '';
        // Only strip parenthetical notes from the date part (parts[2]), not from company or role
        const dateStr = parts[2] ? parts[2].replace(/（[^）]*）/g, '').replace(/\([^)]*\)/g, '').trim() : '';
        const dateMatch = dateStr.match(/(\d{4}\.\d{2})\s*[-–—]\s*(\d{4}\.\d{2})/);
        const startDate = dateMatch ? dateMatch[1].replace('.', '-') : '';
        const endDate = dateMatch ? dateMatch[2].replace('.', '-') : undefined;
        current = { company, role, startDate, endDate, description: [], technologies: [] };
      }
    }
    if (current) experience.push(current);
  }

  // === Achievements ===
  let achievementsText = [];
  if (sectionIndex['核心业绩'] !== undefined) {
    const start = sectionIndex['核心业绩'] + 1;
    const end = sectionIndex['核心技能'] || lines.length;
    for (let i = start; i < end; i++) {
      const l = lines[i].replace(/^\d+\.\s*/, '').trim();
      if (l) achievementsText.push(l);
    }
  }

  // === Skills ===
  let skills = [];
  if (sectionIndex['核心技能'] !== undefined) {
    const start = sectionIndex['核心技能'] + 1;
    const end = sectionIndex['项目经历'] || lines.length;
    for (let i = start; i < end; i++) {
      const l = lines[i].replace(/^[•\-]\s*/, '').trim();
      if (!l) continue;
      // Split by ；to handle multiple categories on one line
      const segments = l.split(/[；;]\s*(?=•?[^：:]+[：:])/);
      for (const seg of segments) {
        const clean = seg.replace(/^•\s*/, '').trim();
        const colonIdx = clean.search(/[：:]/);
        if (colonIdx === -1) continue;
        const category = clean.substring(0, colonIdx).trim();
        const itemsStr = clean.substring(colonIdx + 1).trim();
        const items = itemsStr.split(/[、，,]/).map(s => {
          let name = s.replace(/熟练|精通|掌握|具备/g, '').replace(/[。；;.]$/g, '').trim();
          let level = 75;
          if (s.includes('精通')) level = 90;
          else if (s.includes('熟练')) level = 82;
          else if (s.includes('掌握')) level = 75;
          return { name, level };
        }).filter(item => item.name.length > 0);
        if (category && items.length > 0) {
          skills.push({ category, items });
        }
      }
    }
  }

  // === Projects ===
  let projects = [];
  if (sectionIndex['项目经历'] !== undefined) {
    const start = sectionIndex['项目经历'] + 1;
    let current = null;
    for (let i = start; i < lines.length; i++) {
      const l = lines[i];
      if (l.startsWith('•') || l.startsWith('-')) {
        if (current) current.description.push(l.replace(/^[•\-]\s*/, '').trim());
      } else if (l.includes('|')) {
        if (current) projects.push(current);
        const parts = l.split(/[|｜]/).map(s => s.trim());
        current = {
          title: parts[0] || '',
          role: parts[1] ? parts[1].replace(/（[^）]*）/g, '').replace(/\([^)]*\)/g, '').trim() : '',
          duration: parts[2] ? parts[2].replace(/（[^）]*）/g, '').replace(/\([^)]*\)/g, '').trim() : '',
          description: [],
          achievements: '',
        };
      }
    }
    if (current) projects.push(current);
  }

  // Build tagline and about paragraphs
  const tagline = `数据驱动决策，AI赋能运营 — ${experience.length}年数据分析与AI建模经验，专注跨境电商领域`;

  const aboutParagraphs = [
    `拥有${experience.length}年数据分析与AI建模经验，专注于跨境电商运营与数据分析领域。擅长运用SQL、Python等工具处理运营全链路数据，搭建自动化数据看板，通过AI技术驱动选品、销量预测与广告投放优化。`,
    '具备跨行业数据应用能力，曾主导智慧水务AI项目，实现月药剂节省14.4%。能够将数据建模、流程优化等核心能力迁移至跨境电商场景，为店铺运营提供数据支撑与决策依据。',
    '熟悉亚马逊等跨境电商平台规则，具备跨团队协同与项目管理经验。目前寻求跨境电商运营或数据分析相关岗位，期望用数据与AI能力助力业务增长。',
  ];

  const aboutHighlights = [
    `${experience.length}年+ 数据分析经验`,
    'AI建模与落地能力',
    '跨境电商运营经验',
    '跨团队协同管理',
    'Tableau自动化看板',
    'Python + SQL 数据栈',
  ];

  // Compute achievement strings for projects
  for (const proj of projects) {
    const desc = proj.description.join(' ');
    const metrics = [];
    if (desc.includes('86%') || (desc.includes('选品') && desc.includes('成功率'))) metrics.push('选品成功率86%');
    if (desc.includes('32%') || desc.includes('库存积压率降')) metrics.push('库存积压率降32%');
    if (desc.includes('20万')) metrics.push('月销20万');
    if (desc.includes('25%') || desc.includes('ACOS降至')) metrics.push('ACOS 25%');
    if (desc.includes('4.2') || desc.includes('ROI提升至')) metrics.push('ROI 1:4.2');
    if (desc.includes('月销增长18%')) metrics.push('月销增长18%');
    if (desc.includes('14.4%') || (desc.includes('药剂') && desc.includes('节省'))) metrics.push('月药剂节省14.4%');
    if (!proj.achievements) {
      proj.achievements = metrics.length > 0 ? metrics.join(' | ') : '';
    }
  }

  return {
    name,
    phone,
    email,
    title,
    salary,
    cities,
    tagline,
    aboutParagraphs,
    aboutHighlights,
    education,
    experience,
    achievementsText,
    skills,
    projects,
  };
}

function generateProfileTs(data) {
  const escape = (s) => s.replace(/'/g, "\\'").replace(/\n/g, '\\n');

  const personalStr = `  personal: {
    name: '${escape(data.name)}',
    title: '${escape(data.title)}',
    tagline: '${escape(data.tagline)}',
    email: '${escape(data.email)}',
    phone: '${escape(data.phone)}',
    location: '中国',
    cities: [${data.cities.map(c => `'${escape(c)}'`).join(', ')}],
    salary: '${escape(data.salary)}',
    social: {
      github: '',
      linkedin: '',
      website: '',
    },
  }`;

  const aboutStr = `  about: {
    paragraphs: [
${data.aboutParagraphs.map(p => `      '${escape(p)}'`).join(',\n')}
    ],
    highlights: [
${data.aboutHighlights.map(h => `      '${escape(h)}'`).join(',\n')}
    ],
  }`;

  const skillsStr = `  skills: [
${data.skills.map(cat => `    {
      category: '${escape(cat.category)}',
      items: [
${cat.items.map(item => `        { name: '${escape(item.name)}', level: ${item.level} }`).join(',\n')}
      ],
    }`).join(',\n')}
  ]`;

  const experienceStr = `  experience: [
${data.experience.map(job => `    {
      company: '${escape(job.company)}',
      role: '${escape(job.role)}',
      startDate: '${escape(job.startDate)}',
      ${job.endDate ? `endDate: '${escape(job.endDate)}',` : ''}
      description: [
${job.description.map(d => `        '${escape(d)}'`).join(',\n')}
      ],
      technologies: [${job.technologies.length > 0 ? job.technologies.map(t => `'${escape(t)}'`).join(', ') : `'数据分析'`}],
    }`).join(',\n')}
  ]`;

  const projectsStr = `  projects: [
${data.projects.map(p => `    {
      title: '${escape(p.title)}',
      role: '${escape(p.role)}',
      duration: '${escape(p.duration)}',
      description: [
${p.description.map(d => `        '${escape(d)}'`).join(',\n')}
      ],
      achievements: '${escape(p.achievements || '')}',
    }`).join(',\n')}
  ]`;

  const educationStr = `  education: [
${data.education.map(e => `    {
      institution: '${escape(e.institution)}',
      degree: '${escape(e.degree)}',
      field: '${escape(e.field)}',
      startDate: '${escape(e.startDate)}',
      endDate: '${escape(e.endDate)}',
      achievements: [
${e.achievements.map(a => `        '${escape(a)}'`).join(',\n')}
      ],
    }`).join(',\n')}
  ]`;

  return `import type { ProfileData } from '../types';

const profile: ProfileData = {
${personalStr},

${aboutStr},

${skillsStr},

${experienceStr},

${projectsStr},

${educationStr},
};

export default profile;
`;
}

function main() {
  try {
    const text = readFileSync(TXT_PATH, 'utf-8');
    const data = parse(text);
    const ts = generateProfileTs(data);
    writeFileSync(OUTPUT_PATH, ts, 'utf-8');
    console.log('[generate-profile] ✅ profile.ts 已从 my-info.txt 重新生成');
  } catch (err) {
    console.error('[generate-profile] ❌ 生成失败:', err.message);
  }
}

main();
