export interface SocialLinks {
  github?: string;
  linkedin?: string;
  website?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  cities: string[];
  salary: string;
  avatarUrl?: string;
  resumeUrl?: string;
  social: SocialLinks;
}

export interface AboutInfo {
  paragraphs: string[];
  highlights: string[];
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string[];
  technologies?: string[];
}

export interface ProjectItem {
  title: string;
  role: string;
  duration: string;
  description: string[];
  achievements?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  achievements?: string[];
}

export interface ProfileData {
  personal: PersonalInfo;
  about: AboutInfo;
  skills: SkillCategory[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
}

export const SECTION_IDS = [
  { id: 'hero', label: '首页' },
  { id: 'about', label: '关于我' },
  { id: 'skills', label: '技能' },
  { id: 'experience', label: '工作经历' },
  { id: 'projects', label: '项目经历' },
  { id: 'education', label: '教育背景' },
  { id: 'contact', label: '联系方式' },
] as const;
