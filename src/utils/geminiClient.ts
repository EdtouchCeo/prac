export async function callGeminiClientApi(apiKey: string, prompt: string): Promise<string> {
  const candidateModels = ["gemini-3.6-flash", "gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
  let lastErr: Error | null = null;

  for (const modelName of candidateModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${encodeURIComponent(apiKey)}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      const data = await res.json();
      if (res.ok && data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        return data.candidates[0].content.parts[0].text.trim();
      } else if (data.error) {
        lastErr = new Error(data.error.message || JSON.stringify(data.error));
      }
    } catch (err: any) {
      lastErr = err;
    }
  }

  throw lastErr || new Error('Gemini API 호출에 실패했습니다. 키를 확인해 주세요.');
}
