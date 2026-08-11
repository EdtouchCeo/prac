import React from 'react';
import { X, ShieldCheck, Lock, AlertOctagon, CheckCircle2, HardDrive } from 'lucide-react';
import { PRIVACY_RULE_TIPS } from '../data/complaintsData';

interface PrivacyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyGuideModal: React.FC<PrivacyGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                학교 민원 대응 개인정보 보호 가이드
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                개인정보보호법 및 교육부 지침 기반 교사 보안 준수 수칙
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

        {/* Highlight Banner */}
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <div className="flex items-start gap-3">
            <HardDrive className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
            <div className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
              <span className="font-bold text-emerald-950 dark:text-emerald-100 text-sm block mb-1">
                로컬 전용 데이터 보존 원칙 (Client-Only Security)
              </span>
              본 시스템은 외부 데이터베이스를 사용하지 않으며, 교사께서 입력하신 민원 정보와 작성 중인 초안, 즐겨찾기는 오직 <strong>사용 중인 PC의 브라우저(LocalStorage)</strong>에만 보관됩니다. 인터넷 저장소로 유출되지 않으므로 안심하고 활용하실 수 있습니다.
            </div>
          </div>
        </div>

        {/* Rules Checklist */}
        <div className="mt-5 space-y-4 max-h-96 overflow-y-auto pr-1">
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <Lock className="h-4 w-4 text-indigo-600" />
            <span>교사를 위한 개인정보 보호 4대 핵심 원칙</span>
          </h4>

          {PRIVACY_RULE_TIPS.map((tip) => (
            <div
              key={tip.id}
              className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-800/40 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  {tip.title}
                </span>
                <span className="rounded-md bg-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                  {tip.category}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {tip.content}
              </p>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 pt-2 text-xs">
                <div className="flex items-start gap-1.5 rounded-lg bg-emerald-100/60 p-2 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                  <div>
                    <span className="font-bold block">권장 (DO):</span>
                    <span>{tip.doText}</span>
                  </div>
                </div>

                <div className="flex items-start gap-1.5 rounded-lg bg-rose-100/60 p-2 text-rose-900 dark:bg-rose-950/60 dark:text-rose-200">
                  <AlertOctagon className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
                  <div>
                    <span className="font-bold block">금지 (DON'T):</span>
                    <span>{tip.dontText}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-end border-t border-slate-100 pt-3 dark:border-slate-800">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
