import React, { useState, useEffect } from 'react';
import { Key, ExternalLink, Trash2, CheckCircle2, X, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';
import { getApiKeyFromStorage, saveApiKeyToStorage, removeApiKeyFromStorage } from '../utils/storage';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  onKeyChange?: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
  onKeyChange,
}) => {
  const [apiKeyInput, setApiKeyInput] = useState<string>('');
  const [showKey, setShowKey] = useState<boolean>(false);
  const [savedKey, setSavedKey] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      const currentKey = getApiKeyFromStorage();
      setSavedKey(currentKey);
      setApiKeyInput(currentKey);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const trimmed = apiKeyInput.trim();
    if (!trimmed) {
      onShowToast('올바른 Gemini API 키를 입력해 주세요.', 'warning');
      return;
    }

    saveApiKeyToStorage(trimmed);
    setSavedKey(trimmed);
    if (onKeyChange) onKeyChange();
    onShowToast('Gemini API 키가 브라우저(localStorage)에 안전하게 저장되었습니다.', 'success');
    onClose();
  };

  const handleDelete = () => {
    removeApiKeyFromStorage();
    setSavedKey('');
    setApiKeyInput('');
    if (onKeyChange) onKeyChange();
    onShowToast('저장된 API 키가 삭제되었습니다.', 'info');
  };

  const maskedKey = savedKey
    ? `${savedKey.slice(0, 6)}••••••••${savedKey.slice(-4)}`
    : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              <Key className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Gemini AI 키 설정
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                AI 답변 다듬기 기능을 위한 사용자 고유 API 키
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Security Notice */}
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 dark:border-emerald-900/40 dark:bg-emerald-950/30">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
            <div className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
              <p className="font-bold">보안 및 개인정보 보호 안내</p>
              <p className="mt-0.5 text-emerald-800 dark:text-emerald-300">
                입력하신 API 키는 별도 서버 데이터베이스에 저장되지 않으며, <strong>교사 본인 기기의 브라우저(localStorage)</strong>에만 안전하게 보관됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* Current Key Status */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            <span>현재 상태</span>
            {savedKey ? (
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5" />
                API 키 등록됨 ({maskedKey})
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                <AlertCircle className="h-3.5 w-3.5" />
                등록된 키 없음
              </span>
            )}
          </div>

          {/* Key Input Field */}
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="Gemini API 키를 입력하세요 (예: AIzaSy...)"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-3.5 pr-10 text-sm font-mono text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* API Key Generation Guide Link */}
        <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50/60 p-3 dark:border-blue-900/40 dark:bg-blue-950/20">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-slate-300">
              API 키가 없으신가요? Google에서 무료 발급받기
            </span>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 hover:underline"
            >
              <span>키 발급 받기</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          {savedKey ? (
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-900/60 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>키 삭제</span>
            </button>
          ) : (
            <div></div>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
              닫기
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 active:scale-95 transition-all"
            >
              저장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
