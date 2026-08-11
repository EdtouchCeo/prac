import React, { useState, useEffect } from 'react';
import {
  Shield,
  Copy,
  Download,
  RotateCcw,
  Star,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Lock,
  ChevronDown,
  ChevronUp,
  FileText,
  Send,
} from 'lucide-react';
import { ComplaintTemplate } from '../types';
import { renderTemplateWithValues } from '../utils/templateParser';
import { copyToClipboard, downloadDraftAsTextFile } from '../utils/exportUtils';
import { getApiKeyFromStorage } from '../utils/storage';

interface TemplateDetailProps {
  template: ComplaintTemplate;
  isFavorite: boolean;
  onToggleFavorite: (templateId: string, e: React.MouseEvent) => void;
  onShowToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  onOpenApiKeyModal: () => void;
}

export const TemplateDetail: React.FC<TemplateDetailProps> = ({
  template,
  isFavorite,
  onToggleFavorite,
  onShowToast,
  onOpenApiKeyModal,
}) => {
  // Form input values
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  // Editable output text
  const [draftText, setDraftText] = useState<string>('');
  // Show laws details accordion toggle
  const [showLawsDetails, setShowLawsDetails] = useState<boolean>(true);
  // Copy state
  const [copied, setCopied] = useState<boolean>(false);
  // AI Polish state
  const [isPolishing, setIsPolishing] = useState<boolean>(false);
  const [selectedTone, setSelectedTone] = useState<'polite' | 'firm' | 'empathetic'>('polite');

  // Initialize form default values when template changes
  useEffect(() => {
    const initial: Record<string, string> = {};
    template.fieldPlaceholders.forEach((field) => {
      initial[field.key] = field.defaultValue || '';
    });
    setFormValues(initial);
  }, [template]);

  // Sync draft text whenever formValues or template changes
  useEffect(() => {
    const rendered = renderTemplateWithValues(template.templateText, template.fieldPlaceholders, formValues);
    setDraftText(rendered);
  }, [formValues, template]);

  const handleInputChange = (key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetForm = () => {
    const initial: Record<string, string> = {};
    template.fieldPlaceholders.forEach((field) => {
      initial[field.key] = field.defaultValue || '';
    });
    setFormValues(initial);
    onShowToast('입력 정보가 초기화되었습니다.', 'info');
  };

  const handleCopyDraft = async () => {
    const success = await copyToClipboard(draftText);
    if (success) {
      setCopied(true);
      onShowToast('완성된 민원 답변 초안이 클립보드에 복사되었습니다!', 'success');
      setTimeout(() => setCopied(false), 2500);
    } else {
      onShowToast('클립보드 복사에 실패했습니다. 직접 선택하여 복사해 주세요.', 'warning');
    }
  };

  const handleDownloadTxt = () => {
    const filename = downloadDraftAsTextFile(template.title, draftText);
    onShowToast(`'${filename}' 파일이 PC 다운로드 폴더에 저장되었습니다. (서버 저장 없음)`, 'success');
  };

  // Quick copy of related law citation
  const handleCopyLawCitation = (lawTitle: string, article: string) => {
    const citation = `[관련 규정] ${lawTitle} (${article})`;
    copyToClipboard(citation);
    onShowToast(`법령 인용문구 '${citation}'가 복사되었습니다.`, 'info');
  };

  // AI Polish Handler
  const handleAIPolish = async () => {
    const userApiKey = getApiKeyFromStorage();

    setIsPolishing(true);
    try {
      const response = await fetch('/api/ai/polish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: draftText,
          tone: selectedTone,
          category: template.categoryLabel,
          relatedLaws: template.relatedLaws.map((l) => `${l.title} ${l.codeOrArticle}`).join(', '),
          userApiKey,
        }),
      });

      const data = await response.json();
      if (response.ok && data.polishedText) {
        setDraftText(data.polishedText);
        onShowToast('AI가 어조를 더욱 정중하고 완벽하게 다듬었습니다!', 'success');
      } else {
        if (!userApiKey) {
          onShowToast('AI 키를 먼저 넣어 주세요. 상단의 [AI 키 설정]을 클릭해 주세요.', 'warning');
          onOpenApiKeyModal();
        } else {
          onShowToast(data.error || 'AI 다듬기 기능 실행 중 오류가 발생했습니다.', 'warning');
        }
      }
    } catch (err: any) {
      onShowToast('AI 서버 응답 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.', 'warning');
    } finally {
      setIsPolishing(false);
    }
  };

  // Privacy Scan Warning Check
  const hasPhonePattern = /01[016789]-?\d{3,4}-?\d{4}/.test(draftText);
  const hasResidentNumPattern = /\d{6}-?[1-4]\d{6}/.test(draftText);

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-colors">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                {template.categoryLabel}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                권장 어조: {template.recommendedTone}
              </span>
            </div>
            <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
              {template.title}
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {template.summary}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetForm}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
              title="입력 양식 초기화"
            >
              <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
              <span>초기화</span>
            </button>

            <button
              onClick={(e) => onToggleFavorite(template.id, e)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                isFavorite
                  ? 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              <Star className={`h-3.5 w-3.5 ${isFavorite ? 'fill-amber-400 text-amber-500' : ''}`} />
              <span>{isFavorite ? '즐겨찾김' : '즐겨찾기'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Relevant Laws & Guidelines Accordion */}
      {template.relatedLaws.length > 0 && (
        <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 dark:border-blue-900/40 dark:bg-blue-950/20 transition-colors">
          <div
            onClick={() => setShowLawsDetails(!showLawsDetails)}
            className="flex cursor-pointer items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
                <Shield className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-blue-950 dark:text-blue-200">
                  관련 교육청 지침 및 법령 근거 ({template.relatedLaws.length}건)
                </h3>
                <p className="text-xs text-blue-700/80 dark:text-blue-300/70">
                  클릭 시 관련 조항 요약 및 공식 인용문구 확인
                </p>
              </div>
            </div>

            <button className="text-blue-600 dark:text-blue-400">
              {showLawsDetails ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>

          {showLawsDetails && (
            <div className="mt-3 space-y-3 pt-2 border-t border-blue-200/60 dark:border-blue-900/50">
              {template.relatedLaws.map((law, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-blue-200/80 bg-white p-3.5 dark:border-blue-900/60 dark:bg-slate-900/90 shadow-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                      {law.title}{' '}
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {law.codeOrArticle}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopyLawCitation(law.title, law.codeOrArticle)}
                      className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-[11px] font-semibold text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900 transition-colors"
                      title="법령 인용문구 복사"
                    >
                      <Copy className="h-3 w-3" />
                      <span>조항 복사</span>
                    </button>
                  </div>

                  <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {law.summary}
                  </p>

                  {law.keyPoints.length > 0 && (
                    <ul className="mt-2 space-y-1 pl-3 text-[11px] text-slate-500 dark:text-slate-400 list-disc">
                      {law.keyPoints.map((pt, pIdx) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Privacy Notice Banner */}
      <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50/80 p-3.5 dark:border-rose-900/50 dark:bg-rose-950/30">
        <AlertTriangle className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
        <div className="text-xs text-rose-900 dark:text-rose-200 space-y-1">
          <div className="font-bold">
            실시간 개인정보 보호 및 작성 주의사항
          </div>
          <ul className="list-disc pl-4 space-y-0.5 text-rose-800 dark:text-rose-300">
            {template.privacyAlerts.map((alert, aIdx) => (
              <li key={aIdx}>{alert}</li>
            ))}
            <li>학생 이름이나 주민등록번호는 절대 기재하지 말고, 필요 시 별명을 사용하십시오.</li>
          </ul>
        </div>
      </div>

      {/* Dynamic Required Info Form */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-colors">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span>1. 필수 가변 정보 입력</span>
          <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
            (입력 시 아래 완성 초안에 실시간 반영됩니다)
          </span>
        </h3>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {template.fieldPlaceholders.map((field) => {
            const val = formValues[field.key] || '';
            const isStudentField = field.key.includes('student') || field.label.includes('학생');

            return (
              <div key={field.key} className="space-y-1">
                <label className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>{field.label}</span>
                  {isStudentField && (
                    <span className="text-[10px] font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-0.5">
                      <Lock className="h-3 w-3" />
                      실명 금지 (별명 권장)
                    </span>
                  )}
                </label>

                {field.type === 'textarea' ? (
                  <textarea
                    rows={2}
                    value={val}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 transition-all"
                  />
                ) : (
                  <input
                    type={field.type === 'date' ? 'date' : 'text'}
                    value={val}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 transition-all"
                  />
                )}

                {field.description && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {field.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-time Draft Completion Box & Actions */}
      <div className="rounded-2xl border border-indigo-200 bg-white p-5 shadow-sm dark:border-indigo-900/60 dark:bg-slate-900 transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <span>2. 실시간 완성된 답변 미리보기</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              필요시 아래 텍스트를 직접 수정하거나 AI 다듬기 버튼을 활용하세요.
            </p>
          </div>

          {/* AI Polish Tone Options & Button */}
          <div className="flex items-center gap-2">
            <select
              value={selectedTone}
              onChange={(e: any) => setSelectedTone(e.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="polite">정중·공손 톤</option>
              <option value="firm">원칙·단호 톤</option>
              <option value="empathetic">공감·친절 톤</option>
            </select>

            <button
              onClick={handleAIPolish}
              disabled={isPolishing}
              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all"
            >
              <Sparkles className={`h-3.5 w-3.5 ${isPolishing ? 'animate-spin' : ''}`} />
              <span>{isPolishing ? '다듬는 중...' : 'AI 답변 다듬기'}</span>
            </button>
          </div>
        </div>

        {/* Live Textarea Draft Output */}
        <div className="relative mt-4">
          <textarea
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            rows={12}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/40 p-4 font-sans text-sm leading-relaxed text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-100 transition-all resize-y"
            placeholder="답변 완성이 진행되고 있습니다..."
          />

          {/* Character Counter & Privacy Scan Status */}
          <div className="mt-2 flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <div className="flex items-center gap-2">
              <span>글자 수: <strong>{draftText.length}</strong>자</span>
              <span>·</span>
              <span>단어 수: <strong>{draftText.trim().split(/\s+/).filter(Boolean).length}</strong>개</span>
            </div>

            <div className="flex items-center gap-1">
              {hasPhonePattern || hasResidentNumPattern ? (
                <span className="font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  전화번호/주민번호 형태 감지됨! 확인 필요
                </span>
              ) : (
                <span className="font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  민감 패턴 검서 완료 (안전)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Button Bar */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Lock className="h-3.5 w-3.5 text-emerald-600" />
            <span>작성한 모든 내용은 교사 PC 브라우저에만 유지됩니다.</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Download TXT File Button */}
            <button
              onClick={handleDownloadTxt}
              className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-xs hover:bg-slate-50 active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              <Download className="h-4 w-4 text-slate-600 dark:text-slate-300" />
              <span>.txt 파일 저장</span>
            </button>

            {/* One-Click Copy to Clipboard Button */}
            <button
              onClick={handleCopyDraft}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-md active:scale-95 transition-all ${
                copied
                  ? 'bg-emerald-600 shadow-emerald-500/20'
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20'
              }`}
            >
              {copied ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>복사 완료!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>클립보드에 복사하기</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
