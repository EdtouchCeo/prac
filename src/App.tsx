/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { CategoryFilter } from './components/CategoryFilter';
import { ComplaintList } from './components/ComplaintList';
import { TemplateDetail } from './components/TemplateDetail';
import { CustomTemplateModal } from './components/CustomTemplateModal';
import { PrivacyGuideModal } from './components/PrivacyGuideModal';
import { HelpModal } from './components/HelpModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { Toast, ToastMessage } from './components/Toast';

import { INITIAL_COMPLAINT_TEMPLATES } from './data/complaintsData';
import { ComplaintCategory, ComplaintTemplate } from './types';
import {
  getFavoritesFromStorage,
  toggleFavoriteInStorage,
  getCustomTemplatesFromStorage,
  saveCustomTemplateToStorage,
  deleteCustomTemplateFromStorage,
  getThemeFromStorage,
  saveThemeToStorage,
  getApiKeyFromStorage,
} from './utils/storage';
import { FileText, Edit3, ShieldAlert, BookOpen, Layers } from 'lucide-react';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getThemeFromStorage());

  // Category & Filter state
  const [selectedCategory, setSelectedCategory] = useState<ComplaintCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  const [showCustomOnly, setShowCustomOnly] = useState<boolean>(false);

  // Favorites & Custom templates state
  const [favorites, setFavorites] = useState<string[]>(() => getFavoritesFromStorage());
  const [customTemplates, setCustomTemplates] = useState<ComplaintTemplate[]>(() =>
    getCustomTemplatesFromStorage()
  );

  // Selected Template
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('grade-01');

  // Mobile View Tab state (for small screens)
  const [mobileTab, setMobileTab] = useState<'list' | 'detail'>('list');

  // Modals
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [hasApiKey, setHasApiKey] = useState<boolean>(() => Boolean(getApiKeyFromStorage()));

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toggle Theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveThemeToStorage(theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Toast Handler
  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random()}`,
      message,
      type,
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 3500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Combine initial templates + custom templates
  const allTemplates = useMemo(() => {
    return [...customTemplates, ...INITIAL_COMPLAINT_TEMPLATES];
  }, [customTemplates]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<ComplaintCategory, number> = {
      ALL: allTemplates.length,
      GRADES: 0,
      STUDENT_LIFE: 0,
      SCHOOL_VIOLENCE: 0,
      TEACHER_RIGHTS: 0,
      ADMIN_ATTENDANCE: 0,
      MEALS_FACILITIES: 0,
    };

    allTemplates.forEach((t) => {
      if (counts[t.category] !== undefined) {
        counts[t.category]++;
      }
    });

    return counts;
  }, [allTemplates]);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return allTemplates.filter((t) => {
      // Favorites filter
      if (showFavoritesOnly && !favorites.includes(t.id)) {
        return false;
      }
      // Custom filter
      if (showCustomOnly && !t.isCustom) {
        return false;
      }
      // Category filter
      if (!showFavoritesOnly && !showCustomOnly && selectedCategory !== 'ALL' && t.category !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = t.title.toLowerCase().includes(q);
        const inSummary = t.summary.toLowerCase().includes(q);
        const inKeywords = t.keywords.some((k) => k.toLowerCase().includes(q));
        const inLaws = t.relatedLaws.some(
          (l) => l.title.toLowerCase().includes(q) || l.summary.toLowerCase().includes(q)
        );
        const inCategory = t.categoryLabel.toLowerCase().includes(q);

        return inTitle || inSummary || inKeywords || inLaws || inCategory;
      }

      return true;
    });
  }, [allTemplates, selectedCategory, searchQuery, showFavoritesOnly, showCustomOnly, favorites]);

  // Get currently selected template object
  const selectedTemplate = useMemo(() => {
    const found = allTemplates.find((t) => t.id === selectedTemplateId);
    return found || allTemplates[0] || INITIAL_COMPLAINT_TEMPLATES[0];
  }, [allTemplates, selectedTemplateId]);

  // Handle Favorite Toggle
  const handleToggleFavorite = (templateId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = toggleFavoriteInStorage(templateId);
    setFavorites(updated);
    const isFav = updated.includes(templateId);
    showToast(isFav ? '즐겨찾기에 추가되었습니다.' : '즐겨찾기에서 해제되었습니다.', 'info');
  };

  // Handle Custom Template Save
  const handleSaveCustomTemplate = (newTemplate: ComplaintTemplate) => {
    const updated = saveCustomTemplateToStorage(newTemplate);
    setCustomTemplates(updated);
    setSelectedTemplateId(newTemplate.id);
    showToast(`'${newTemplate.title}' 템플릿이 등록되었습니다!`, 'success');
  };

  // Handle Custom Template Delete
  const handleDeleteCustomTemplate = (templateId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteCustomTemplateFromStorage(templateId);
    setCustomTemplates(updated);
    if (selectedTemplateId === templateId) {
      setSelectedTemplateId('grade-01');
    }
    showToast('등록된 템플릿이 삭제되었습니다.', 'info');
  };

  // When selecting a template in list, switch tab on mobile
  const handleSelectTemplate = (template: ComplaintTemplate) => {
    setSelectedTemplateId(template.id);
    setMobileTab('detail');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenCustomModal={() => setIsCustomModalOpen(true)}
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
        onOpenHelpModal={() => setIsHelpModalOpen(true)}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasApiKey={hasApiKey}
        totalTemplatesCount={allTemplates.length}
        favoritesCount={favorites.length}
      />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Mobile Navigation Tab Selector (Visible on small screens) */}
        <div className="mb-4 flex rounded-xl bg-slate-200/80 p-1 lg:hidden dark:bg-slate-800">
          <button
            onClick={() => setMobileTab('list')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition-all ${
              mobileTab === 'list'
                ? 'bg-white text-indigo-600 shadow-xs dark:bg-slate-900 dark:text-indigo-400'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>1. 민원 템플릿 목록 ({filteredTemplates.length})</span>
          </button>
          <button
            onClick={() => setMobileTab('detail')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition-all ${
              mobileTab === 'detail'
                ? 'bg-white text-indigo-600 shadow-xs dark:bg-slate-900 dark:text-indigo-400'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Edit3 className="h-4 w-4" />
            <span>2. 답변 작성 및 복사</span>
          </button>
        </div>

        {/* 2-Column Split Screen Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
          {/* Left Column: Category Filter, Search, Template List (lg:col-span-5) */}
          <div
            className={`lg:col-span-5 space-y-4 ${
              mobileTab === 'detail' ? 'hidden lg:block' : 'block'
            }`}
          >
            {/* Category Filter Component */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-colors">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                showFavoritesOnly={showFavoritesOnly}
                onToggleFavoritesOnly={() => {
                  setShowFavoritesOnly(!showFavoritesOnly);
                  if (showCustomOnly) setShowCustomOnly(false);
                }}
                showCustomOnly={showCustomOnly}
                onToggleCustomOnly={() => {
                  setShowCustomOnly(!showCustomOnly);
                  if (showFavoritesOnly) setShowFavoritesOnly(false);
                }}
                categoryCounts={categoryCounts}
                favoritesCount={favorites.length}
                customCount={customTemplates.length}
              />
            </div>

            {/* Template List Cards */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1 text-xs text-slate-500 dark:text-slate-400">
                <span>
                  조회된 템플릿 <strong>{filteredTemplates.length}</strong>개
                </span>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    검색 초기화
                  </button>
                )}
              </div>

              <ComplaintList
                templates={filteredTemplates}
                selectedTemplateId={selectedTemplateId}
                onSelectTemplate={handleSelectTemplate}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onDeleteCustomTemplate={handleDeleteCustomTemplate}
                searchQuery={searchQuery}
              />
            </div>
          </div>

          {/* Right Column: Selected Template Detail, Dynamic Form, Real-Time Draft Preview (lg:col-span-7) */}
          <div
            className={`lg:col-span-7 ${
              mobileTab === 'list' ? 'hidden lg:block' : 'block'
            }`}
          >
            {selectedTemplate ? (
              <TemplateDetail
                template={selectedTemplate}
                isFavorite={favorites.includes(selectedTemplate.id)}
                onToggleFavorite={handleToggleFavorite}
                onShowToast={showToast}
                onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
              />
            ) : (
              <div className="flex h-96 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
                <FileText className="mb-3 h-12 w-12 text-slate-300 dark:text-slate-600" />
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                  선택된 민원 템플릿이 없습니다.
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  왼쪽 목록에서 원하시는 민원 항목을 클릭해 주세요.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-white py-6 dark:border-slate-800 dark:bg-slate-900 transition-colors">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-center text-xs text-slate-500 dark:text-slate-400 sm:flex-row sm:text-left">
          <div className="space-y-1">
            <p className="font-semibold text-slate-700 dark:text-slate-300">
              민원 답변 가이드 · 교원용 교육 행정 프로세스 최적화 도구
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              초·중등교육법, 학교폭력예방법, 교원의 지위 향상 및 교육활동 보호를 위한 특별법 및 시·도교육청 지침 준수
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              onClick={() => setIsPrivacyModalOpen(true)}
              className="text-emerald-600 hover:underline dark:text-emerald-400"
            >
              개인정보 보호 수칙
            </button>
            <button
              onClick={() => setIsHelpModalOpen(true)}
              className="text-indigo-600 hover:underline dark:text-indigo-400"
            >
              사용자 도움말
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CustomTemplateModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onSave={handleSaveCustomTemplate}
      />

      <PrivacyGuideModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onShowToast={showToast}
        onKeyChange={() => setHasApiKey(Boolean(getApiKeyFromStorage()))}
      />

      {/* Floating Toast Feedback */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
