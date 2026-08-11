import React from 'react';
import {
  Search,
  X,
  Star,
  LayoutGrid,
  GraduationCap,
  HeartHandshake,
  ShieldAlert,
  UserCheck,
  CalendarCheck,
  Utensils,
  Plus,
} from 'lucide-react';
import { CATEGORY_OPTIONS } from '../data/complaintsData';
import { ComplaintCategory } from '../types';

interface CategoryFilterProps {
  selectedCategory: ComplaintCategory;
  onSelectCategory: (category: ComplaintCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  showCustomOnly: boolean;
  onToggleCustomOnly: () => void;
  categoryCounts: Record<ComplaintCategory, number>;
  favoritesCount: number;
  customCount: number;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  LayoutGrid: <LayoutGrid className="h-4 w-4" />,
  GraduationCap: <GraduationCap className="h-4 w-4" />,
  HeartHandshake: <HeartHandshake className="h-4 w-4" />,
  ShieldAlert: <ShieldAlert className="h-4 w-4" />,
  UserCheck: <UserCheck className="h-4 w-4" />,
  CalendarCheck: <CalendarCheck className="h-4 w-4" />,
  Utensils: <Utensils className="h-4 w-4" />,
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  showCustomOnly,
  onToggleCustomOnly,
  categoryCounts,
  favoritesCount,
  customCount,
}) => {
  return (
    <div className="space-y-3">
      {/* Search Input Box */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="민원 키워드, 법령 조항, 템플릿 검색 (예: 수행평가, 학폭, 교권)..."
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 transition-all shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Quick Filter Buttons: All, Favorites, Custom */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {/* Favorites Filter Pill */}
        <button
          onClick={onToggleFavoritesOnly}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
            showFavoritesOnly
              ? 'bg-amber-500 text-white shadow-sm ring-2 ring-amber-400/30'
              : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
          }`}
        >
          <Star className={`h-3.5 w-3.5 ${showFavoritesOnly ? 'fill-current' : 'text-amber-500'}`} />
          <span>즐겨찾기</span>
          <span
            className={`ml-0.5 rounded-full px-1.5 py-0.2 text-[11px] font-bold ${
              showFavoritesOnly
                ? 'bg-amber-600 text-white'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
            }`}
          >
            {favoritesCount}
          </span>
        </button>

        {/* Custom Templates Pill */}
        {customCount > 0 && (
          <button
            onClick={onToggleCustomOnly}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              showCustomOnly
                ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400/30'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            <Plus className="h-3.5 w-3.5" />
            <span>내 등록 템플릿</span>
            <span
              className={`ml-0.5 rounded-full px-1.5 py-0.2 text-[11px] font-bold ${
                showCustomOnly
                  ? 'bg-indigo-700 text-white'
                  : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
              }`}
            >
              {customCount}
            </span>
          </button>
        )}
      </div>

      {/* Category Pills Scrollable Row */}
      <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1">
        {CATEGORY_OPTIONS.map((cat) => {
          const isSelected = selectedCategory === cat.id && !showFavoritesOnly && !showCustomOnly;
          const count = categoryCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => {
                if (showFavoritesOnly) onToggleFavoritesOnly();
                if (showCustomOnly) onToggleCustomOnly();
                onSelectCategory(cat.id);
              }}
              className={`flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-sm dark:bg-slate-100 dark:text-slate-900'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              <span className={isSelected ? 'text-indigo-400 dark:text-indigo-600' : 'text-slate-400'}>
                {ICON_MAP[cat.iconName]}
              </span>
              <span>{cat.shortLabel}</span>
              <span
                className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  isSelected
                    ? 'bg-slate-700 text-slate-100 dark:bg-slate-300 dark:text-slate-900'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
