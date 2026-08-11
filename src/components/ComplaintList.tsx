import React from 'react';
import { Star, Shield, ArrowRight, FileText, Trash2 } from 'lucide-react';
import { ComplaintTemplate } from '../types';

interface ComplaintListProps {
  templates: ComplaintTemplate[];
  selectedTemplateId: string | null;
  onSelectTemplate: (template: ComplaintTemplate) => void;
  favorites: string[];
  onToggleFavorite: (templateId: string, e: React.MouseEvent) => void;
  onDeleteCustomTemplate?: (templateId: string, e: React.MouseEvent) => void;
  searchQuery: string;
}

export const ComplaintList: React.FC<ComplaintListProps> = ({
  templates,
  selectedTemplateId,
  onSelectTemplate,
  favorites,
  onToggleFavorite,
  onDeleteCustomTemplate,
  searchQuery,
}) => {
  if (templates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-800">
        <FileText className="mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" />
        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
          검색된 민원 템플릿이 없습니다
        </h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {searchQuery
            ? `'${searchQuery}' 키워드와 일치하는 항목을 찾을 수 없습니다.`
            : '해당 조건에 해당하는 템플릿이 없습니다.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {templates.map((template) => {
        const isSelected = selectedTemplateId === template.id;
        const isFav = favorites.includes(template.id);

        return (
          <div
            key={template.id}
            onClick={() => onSelectTemplate(template)}
            className={`group relative cursor-pointer rounded-2xl border p-4 transition-all duration-200 ${
              isSelected
                ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-2 ring-indigo-500/20 dark:border-indigo-500 dark:bg-indigo-950/30'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'
            }`}
          >
            {/* Header row: Category Badge & Favorite Star */}
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {template.categoryLabel}
                </span>
                {template.isCustom && (
                  <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                    직접 등록
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1">
                {/* Custom Delete Button */}
                {template.isCustom && onDeleteCustomTemplate && (
                  <button
                    onClick={(e) => onDeleteCustomTemplate(template.id, e)}
                    className="rounded-lg p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/50 dark:hover:text-rose-400 transition-colors"
                    title="템플릿 삭제"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}

                {/* Favorite Star Button */}
                <button
                  onClick={(e) => onToggleFavorite(template.id, e)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-amber-50 hover:text-amber-500 dark:hover:bg-slate-800 transition-colors"
                  title={isFav ? '즐겨찾기 해제' : '즐겨찾기 추가'}
                >
                  <Star
                    className={`h-4 w-4 transition-transform active:scale-125 ${
                      isFav ? 'fill-amber-400 text-amber-400' : ''
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Template Title */}
            <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 dark:text-slate-100 dark:group-hover:text-indigo-400 transition-colors leading-snug">
              {template.title}
            </h3>

            {/* Summary */}
            <p className="mt-1.5 line-clamp-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {template.summary}
            </p>

            {/* Laws Preview Tag & Keywords */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {template.relatedLaws.length > 0 && (
                <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300">
                  <Shield className="h-3 w-3 text-indigo-500" />
                  <span>{template.relatedLaws[0].title}</span>
                </span>
              )}

              {template.keywords.slice(0, 3).map((kw, idx) => (
                <span
                  key={idx}
                  className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500 dark:bg-slate-800/80 dark:text-slate-400"
                >
                  #{kw}
                </span>
              ))}
            </div>

            {/* Selection indicator arrow */}
            <div className="mt-2 flex items-center justify-end text-xs font-semibold text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <span>답변 작성하기</span>
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
