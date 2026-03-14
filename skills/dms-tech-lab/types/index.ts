/**
 * UI 관련 타입
 */
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * 테마 관련 타입
 */
export type Theme = "dark" | "light";

/**
 * 모달 관련 타입
 */
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  showCloseButton?: boolean;
}

/**
 * 버튼 관련 타입
 */
export interface ButtonProps extends BaseComponentProps {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

/**
 * 카드 관련 타입
 */
export interface CardProps extends BaseComponentProps {
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

/**
 * 애니메이션 관련 타입
 */
export interface AnimationProps {
  duration?: number;
  delay?: number;
  easing?: string;
}

/**
 * 스크롤 관련 타입
 */
export interface ScrollPosition {
  x: number;
  y: number;
}

/**
 * 폼 관련 타입
 */
export interface FormFieldProps extends BaseComponentProps {
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

/**
 * 로딩 상태 관련 타입
 */
export type LoadingState = "idle" | "loading" | "success" | "error";

/**
 * API 응답 관련 타입
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * SEO 관련 타입
 */
export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
}

/**
 * 소셜 링크 관련 타입
 */
export interface SocialLink {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}
