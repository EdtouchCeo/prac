export type ComplaintCategory =
  | 'ALL'
  | 'GRADES'
  | 'STUDENT_LIFE'
  | 'SCHOOL_VIOLENCE'
  | 'TEACHER_RIGHTS'
  | 'ADMIN_ATTENDANCE'
  | 'MEALS_FACILITIES';

export interface CategoryOption {
  id: ComplaintCategory;
  label: string;
  shortLabel: string;
  iconName: string;
  description: string;
  badgeColor: string;
}

export interface RelatedLaw {
  title: string;
  codeOrArticle: string;
  summary: string;
  keyPoints: string[];
}

export interface FieldPlaceholder {
  key: string;
  label: string;
  placeholder: string;
  description?: string;
  type?: 'text' | 'date' | 'select' | 'textarea';
  options?: string[];
  defaultValue?: string;
}

export interface ComplaintTemplate {
  id: string;
  title: string;
  category: ComplaintCategory;
  categoryLabel: string;
  keywords: string[];
  summary: string;
  relatedLaws: RelatedLaw[];
  privacyAlerts: string[];
  fieldPlaceholders: FieldPlaceholder[];
  templateText: string;
  recommendedTone: string;
  isCustom?: boolean;
  isFavorite?: boolean;
  updatedAt?: string;
}

export interface CustomTemplateInput {
  title: string;
  category: ComplaintCategory;
  summary: string;
  keywords: string[];
  templateText: string;
  relatedLaws: RelatedLaw[];
  privacyAlerts: string[];
  fieldPlaceholders: FieldPlaceholder[];
}

export interface PrivacyRuleTip {
  id: string;
  title: string;
  content: string;
  doText: string;
  dontText: string;
  category: string;
}
