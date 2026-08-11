import React, { useState } from 'react';
import { X, Plus, PlusCircle, AlertCircle, Sparkles } from 'lucide-react';
import { CATEGORY_OPTIONS } from '../data/complaintsData';
import { ComplaintCategory, ComplaintTemplate } from '../types';
import { extractPlaceholdersFromText } from '../utils/templateParser';

interface CustomTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: ComplaintTemplate) => void;
}

export const CustomTemplateModal: React.FC<CustomTemplateModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ComplaintCategory>('STUDENT_LIFE');
  const [summary, setSummary] = useState('');
  const [keywordsStr, setKeywordsStr] = useState('');
  const [templateText, setTemplateText] = useState('');
  const [lawTitle, setLawTitle] = useState('');
  const [lawArticle, setLawArticle] = useState('');
  const [lawSummary, setLawSummary] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !templateText.trim()) return;

    const parsedFields = extractPlaceholdersFromText(templateText);
    const catOption = CATEGORY_OPTIONS.find((c) => c.id === category);

    const newTemplate: ComplaintTemplate = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      category: category,
      categoryLabel: catOption ? catOption.shortLabel : '자체 등록',
      keywords: keywordsStr
        ? keywordsStr.split(',').map((k) => k.trim()).filter(Boolean)
        : ['사용자등록'],
      summary: summary.trim() || '사용자가 직접 등록한 민원 답변 템플릿입니다.',
      relatedLaws: lawTitle
        ? [
            {
              title: lawTitle.trim(),
              codeOrArticle: lawArticle.trim() || '관련 규정',
              summary: lawSummary.trim() || '관련 지침 규정 항목',
              keyPoints: [],
            },
          ]
        : [],
      privacyAlerts: [
        '학생의 개인정보(실명, 주민등록번호)를 포함하지 마십시오.',
      ],
      fieldPlaceholders: parsedFields,
      templateText: templateText,
      recommendedTone: '원칙과 정중함을 갖춘 어조',
      isCustom: true,
      updatedAt: new Date().toISOString(),
    };

    onSave(newTemplate);
    onClose();

    // Reset fields
    setTitle('');
    setSummary('');
    setKeywordsStr('');
    setTemplateText('');
    setLawTitle('');
    setLawArticle('');
    setLawSummary('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              <PlusCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                새 민원 답변 템플릿 직접 등록
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                자주 사용하는 민원 답변 템플릿을 등록해 교사 PC 브라우저에 보관합니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                템플릿 제목 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: 현장체험학습 안전 수칙 이의 민원 답변"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                민원 카테고리
              </label>
              <select
                value={category}
                onChange={(e: any) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                {CATEGORY_OPTIONS.filter((c) => c.id !== 'ALL').map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              요약 설명
            </label>
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="민원 답변의 핵심 목적 및 개요"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              키워드 (쉼표 구분)
            </label>
            <input
              type="text"
              value={keywordsStr}
              onChange={(e) => setKeywordsStr(e.target.value)}
              placeholder="예: 체험학습, 안전수칙, 미참가, 환불"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          {/* Laws Optional fields */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3 dark:border-slate-800 dark:bg-slate-800/40">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
              참고 법령 / 교육청 지침 (선택사항)
            </span>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <input
                type="text"
                value={lawTitle}
                onChange={(e) => setLawTitle(e.target.value)}
                placeholder="법령/지침명 (예: 학교안전사고 예방법)"
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
              <input
                type="text"
                value={lawArticle}
                onChange={(e) => setLawArticle(e.target.value)}
                placeholder="조항 (예: 제12조 제1항)"
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                답변 템플릿 본문 <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                대괄호 <code className="bg-indigo-50 px-1 dark:bg-indigo-950">[가변 항목명]</code> 형태로 가변 인자를 넣으면 자동 폼이 생성됩니다!
              </span>
            </div>
            <textarea
              required
              rows={8}
              value={templateText}
              onChange={(e) => setTemplateText(e.target.value)}
              placeholder="안녕하십니까, [학부모님].
[A학생]의 체험학습 신청 건에 관해 답변드립니다.
본교는 [관련 지침명]에 의거하여..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-sans text-sm leading-relaxed text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
              <span>템플릿 등록하기</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
