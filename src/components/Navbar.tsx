import React from 'react';
import {
  ShieldCheck,
  Moon,
  Sun,
  PlusCircle,
  FileText,
  Info,
  Sparkles,
  Lock,
  Key,
} from 'lucide-react';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenCustomModal: () => void;
  onOpenPrivacyModal: () => void;
  onOpenHelpModal: () => void;
  onOpenApiKeyModal: () => void;
  hasApiKey: boolean;
  totalTemplatesCount: number;
  favoritesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  onOpenCustomModal,
  onOpenPrivacyModal,
  onOpenHelpModal,
  onOpenApiKeyModal,
  hasApiKey,
}) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 transition-colors duration-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white shadow-sm shadow-indigo-500/20">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
                민원 답변 가이드
              </h1>
              <span className="hidden rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 sm:inline-block">
                교원전용 SPA
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              법령·지침 기반 학교 민원 표준 답변 작성 및 개인정보 보호
            </p>
          </div>
        </div>

        {/* Center: Privacy Assurance Pill (Clickable) */}
        <button
          onClick={onOpenPrivacyModal}
          className="hidden md:flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-xs font-medium text-emerald-800 hover:bg-emerald-100 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-900/60 transition-colors"
          title="클릭 시 개인정보 수칙 확인"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <Lock className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>학생 개인정보 브라우저 내 안전 보존</span>
        </button>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Key Settings Button */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-2 text-xs font-bold transition-all sm:text-sm ${
              hasApiKey
                ? 'border-indigo-200 bg-indigo-50/80 text-indigo-700 hover:bg-indigo-100 dark:border-indigo-900/60 dark:bg-indigo-950/60 dark:text-indigo-300'
                : 'border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-300 animate-pulse'
            }`}
            title="Gemini API 키 설정"
          >
            <Key className="h-4 w-4" />
            <span>AI 키 설정</span>
            {hasApiKey ? (
              <span className="h-2 w-2 rounded-full bg-emerald-500" title="키 설정됨" />
            ) : (
              <span className="h-2 w-2 rounded-full bg-amber-500" title="키 미설정" />
            )}
          </button>

          {/* Create Custom Template Button */}
          <button
            onClick={onOpenCustomModal}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 active:scale-95 transition-all sm:text-sm"
          >
            <PlusCircle className="h-4 w-4" />
            <span className="hidden sm:inline">새 템플릿 등록</span>
            <span className="sm:hidden">등록</span>
          </button>

          {/* Privacy Guide Button */}
          <button
            onClick={onOpenPrivacyModal}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="개인정보 보호 수칙"
          >
            <FileText className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            <span className="hidden lg:inline">보안 가이드</span>
          </button>

          {/* Help Button */}
          <button
            onClick={onOpenHelpModal}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
            title="도움말"
          >
            <Info className="h-5 w-5" />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            title={theme === 'dark' ? '밝은 테마로 변경' : '어두운 테마로 변경'}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-amber-400" />
            ) : (
              <Moon className="h-5 w-5 text-indigo-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

