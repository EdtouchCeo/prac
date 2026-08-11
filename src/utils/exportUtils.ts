/**
 * Exports the finished complaint response draft as a .txt file.
 * Automatically triggers browser download and returns filename.
 */
export function downloadDraftAsTextFile(title: string, content: string): string {
  const sanitizedTitle = title.replace(/[^a-zA-Z0-9가-힣]/g, '_').slice(0, 30);
  const dateStr = new Date().toISOString().slice(0, 10);
  const fileName = `민원답변초안_${sanitizedTitle}_${dateStr}.txt`;

  const disclaimerBanner = `================================================================
[안내] 본 민원 답변 초안 파일은 교사의 PC 브라우저 내에서 직접 생성되었습니다.
- 외부 서버나 데이터베이스로 전송되지 않으며 교사의 기기에만 저장됩니다.
- 발송 전 학생 실명, 주민번호 등 학생 개인정보가 포함되어 있지 않은지 최종 확인해 주십시오.
================================================================\n\n`;

  const fullText = disclaimerBanner + content;

  const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return fileName;
}

/**
 * Copies draft text to user clipboard.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for non-secure context or older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy to clipboard', err);
    return false;
  }
}
