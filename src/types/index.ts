export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  created_at: string;
  updated_at?: string;
  matched_clinics?: MatchedClinic[];
}

export interface MatchedClinic {
  clinic_id: string;
  clinic_name: string;
  match_score: number;
  matched_at: string;
}

export interface AuthError {
  message: string;
  status?: number;
  code?: string;
}

export interface Review {
  id: string;
  slug: string;
  title: string;
  author?: string;
  date: string;
  rating?: number;
  clinic_name?: string;
  content: string;
  meta_title?: string;
  meta_description?: string;
  featured_image?: string;
}

export interface PatientStory {
  id: string;
  slug: string;
  title: string;
  author: string;
  age?: string;
  location?: string;
  condition: string;
  treatment_duration?: string;
  rating: number;
  content: string;
  date: string;
  outcome?: string;
  timeline?: StoryTimelineEvent[];
  before_treatment?: StorySection;
  during_treatment?: StorySection;
  after_treatment?: StorySection;
  key_improvements?: string[];
}

export interface StoryTimelineEvent {
  date: string;
  event: string;
  details: string;
}

export interface StorySection {
  title: string;
  content: string;
}

export interface ClinicAvailability {
  clinic_id: string;
  next_available: string;
  wait_time_days: number;
  urgent_appointments: boolean;
  weekend_availability: boolean;
}

export interface ClinicStrain {
  id: string;
  name: string;
  type: 'indica' | 'sativa' | 'hybrid';
  thc_percentage?: number;
  cbd_percentage?: number;
  price?: number;
  availability: 'in-stock' | 'out-of-stock' | 'limited';
}

export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  type: 'load' | 'render' | 'api' | 'cache';
}

export interface CacheStats {
  hits: number;
  misses: number;
  size: number;
  hitRate: number;
}

export interface ConditionMetadata {
  icon: React.ComponentType;
  color: string;
  description: string;
  hasDetailedPage: boolean;
  evidenceLevel: string;
  mapTo?: string;
}

export interface ConditionData {
  name: string;
  slug: string;
  description: string;
  symptoms?: string[];
  treatment_info?: string;
  evidence_level?: string;
}

export interface RouteValidationResult {
  isValid: boolean;
  redirect?: string;
  statusCode?: number;
}

export interface RoutePattern {
  pattern: RegExp;
  validate: (slug: string, clinics: FullClinicProfile[]) => RouteValidationResult;
}

export interface SupabaseQueryResult<T> {
  data: T | null;
  error: Error | null;
}

export interface ErrorInfo {
  componentStack: string;
}

export interface AnalyticsEvent {
  event: string;
  category: string;
  label?: string;
  value?: number;
}

export interface WindowWithAnalytics extends Window {
  gtag: (...args: unknown[]) => void;
  dataLayer?: unknown[];
}

export * from './clinic';
