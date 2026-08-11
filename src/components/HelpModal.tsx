import React from 'react';
import { X, HelpCircle, Search, Edit, Copy, Sparkles, Star } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              <HelpCircle className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              민원 답변 가이드 사용법
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Steps */}
        <div className="mt-4 space-y-3 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
            <Search className="h-5 w-5 shrink-0 text-indigo-600 dark:text-indigo-400 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm">
                1. 민원 검색 및 템플릿 선택
              </span>
              <span>
                좌측 카테고리 칩이나 검색창에 키워드(예: 수행평가, 학폭, 출결)를 입력하여 원하는 민원 유형을 선택합니다.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
            <Edit className="h-5 w-5 shrink-0 text-indigo-600 dark:text-indigo-400 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm">
                2. 필수 정보 입력 및 관련 법령 확인
              </span>
              <span>
                상세 영역에서 관련 교육청 지침 및 법령 조항을 확인하고, 가변 입력 폼에 정보를 적습니다. 학생 이름은 실명 대신 별명(A학생)을 적어주세요.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
            <Sparkles className="h-5 w-5 shrink-0 text-purple-600 dark:text-purple-400 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm">
                3. 실시간 초안 미리보기 및 AI 다듬기
              </span>
              <span>
                입력 내용이 실시간 반영된 초안을 확인하고, 필요한 경우 직접 수정하거나 'AI 답변 다듬기' 버튼으로 어조를 변경할 수 있습니다.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
            <Copy className="h-5 w-5 shrink-0 text-indigo-600 dark:text-indigo-400 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm">
                4. 클립보드 복사 또는 .txt 파일 저장
              </span>
              <span>
                '클립보드에 복사하기' 버튼으로 한 번에 복사하거나 .txt 파일로 다운로드하여 나이스(NEIS), 이메일, 문서에 즉시 활용하세요.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50/50 p-3 dark:border-amber-900/40 dark:bg-amber-950/30">
            <Star className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" />
            <div>
              <span className="font-bold text-amber-950 dark:text-amber-200 block text-sm">
                즐겨찾기 및 직접 등록
              </span>
              <span>
                자주 사용하는 민원은 ⭐ 별표를 눌러 즐겨찾기에 등록하거나, '새 템플릿 등록' 버튼으로 나만의 표준 답변을 기기 내 보관할 수 있습니다.
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-end border-t border-slate-100 pt-3 dark:border-slate-800">
          <button
            onClick={onClose}
            className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-700"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
