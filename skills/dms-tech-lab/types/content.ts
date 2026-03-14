/**
 * 블로그 관련 타입
 */
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  tags: string[];
  publishedAt: Date;
  updatedAt?: Date;
  author: {
    name: string;
    avatar?: string;
  };
}

export interface BlogSeries {
  id: string;
  title: string;
  description: string;
  slug: string;
  posts: BlogPost[];
}

/**
 * 프로젝트 관련 타입
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

/**
 * 서비스 관련 타입
 */
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

/**
 * 회사 정보 관련 타입
 */
export interface CompanyInfo {
  name: string;
  description: string;
  foundedYear: number;
  teamSize: string;
  location: {
    address: string;
    city: string;
    country: string;
  };
}

/**
 * 연락처 관련 타입
 */
export interface ContactForm {
  email: string;
  firstName: string;
  lastName: string;
  message: string;
}

/**
 * 네비게이션 관련 타입
 */
export interface NavLink {
  name: string;
  href: string;
  children?: NavLink[];
}
