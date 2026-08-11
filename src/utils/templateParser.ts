import { FieldPlaceholder } from '../types';

/**
 * Replaces placeholders in templateText with user-provided form values.
 * Places clear visible brackets for empty/unfilled fields.
 */
export function renderTemplateWithValues(
  templateText: string,
  fieldPlaceholders: FieldPlaceholder[],
  formValues: Record<string, string>
): string {
  let result = templateText;

  fieldPlaceholders.forEach((field) => {
    const userVal = formValues[field.key]?.trim();
    const replacement = userVal ? userVal : `[${field.label}]`;
    
    // Replace key tokens in template text if used as [key] or [label]
    const keyRegex = new RegExp(`\\[${escapeRegExp(field.key)}\\]`, 'g');
    const labelRegex = new RegExp(`\\[${escapeRegExp(field.label)}\\]`, 'g');
    
    result = result.replace(keyRegex, replacement);
    result = result.replace(labelRegex, replacement);
  });

  return result;
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Parses bracket tokens like [민원인 성함] or [studentAlias] from raw text
 * if custom template is uploaded without structured fieldPlaceholders.
 */
export function extractPlaceholdersFromText(text: string): FieldPlaceholder[] {
  const matches = text.match(/\[(.*?)\]/g) || [];
  const uniqueKeys = Array.from(new Set(matches.map((m) => m.replace(/\[|\]/g, '').trim())));

  return uniqueKeys.map((key) => {
    const isStudent = key.includes('학생') || key.includes('자녀');
    const isDate = key.includes('일자') || key.includes('날짜') || key.includes('일');
    const isParent = key.includes('학부모') || key.includes('민원인') || key.includes('성함');

    return {
      key: key,
      label: key,
      placeholder: isStudent
        ? '예: A학생 (실명 표기 금지)'
        : isDate
        ? '예: 2026년 O월 O일'
        : isParent
        ? '예: 김철수 학부모님'
        : `예: ${key} 내용 입력`,
      defaultValue: isStudent ? 'A학생' : '',
      description: isStudent ? '※ 학생 개인정보 보호를 위해 별명 또는 익명 표기를 권장합니다.' : undefined,
      type: isDate ? 'date' : 'text',
    };
  });
}
