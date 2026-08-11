import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "민원 답변 가이드 API" });
  });

  // AI Polish & Tone Optimization Endpoint
  app.post("/api/ai/polish", async (req, res) => {
    try {
      const { text, tone, category, relatedLaws, userApiKey } = req.body;

      const apiKey = userApiKey || process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({
          error: "AI 키를 먼저 넣어 주세요. 화면 상단의 'AI 키 설정' 버튼을 통해 Gemini API 키를 입력해 주세요.",
        });
      }

      if (!text) {
        return res.status(400).json({ error: "다듬을 답변 본문이 필요합니다." });
      }

      const ai = new GoogleGenAI({ apiKey });

      const tonePromptMap: Record<string, string> = {
        polite: "매우 정중하고 공손하며, 학부모 및 민원인의 마음을 어루만지면서도 명확한 전달력이 돋보이는 어조",
        firm: "법령과 원칙에 기반하여 단호하고 단단하며, 학교 행정 절차의正當性(정당성)을 명확히 전달하는 원칙 중심 어조",
        empathetic: "따뜻하고 공감적인 어조로 학생의 성장을 함께 고민하는 동반자적 관점의 친절한 어조",
      };

      const selectedToneDescription = tonePromptMap[tone] || tonePromptMap.polite;

      const prompt = `당신은 대한민국 학교 현장의 교육 행정 및 법령·지침 민원 대응 전문 컨설턴트입니다.
교사가 작성한 아래의 학교 민원 답변 초안을 ${selectedToneDescription}로 다듬어 주세요.

[작성 시 절대 준수 사항]
1. 학생의 실제 이름이나 주민등록번호 등 민감한 개인정보는 절대 포함하지 마십시오 (필요 시 'A학생', '해당 학생' 등으로 표기).
2. 법령 및 교육청 지침 관련 내용(${relatedLaws || "관련 법령"})의 핵심 취지와 사실관계를 훼손하지 마십시오.
3. 교사의 명예와 학교의 정당한 교육활동을 보호할 수 있는 품격 있고 격식 있는 문체를 사용하십시오.
4. 오탈자, 맞춤법, 띄어쓰기를 완벽하게 교정하십시오.

[초안 내용]
${text}

오직 완성된 다듬어진 답변 텍스트만 출력해 주세요. (추가 설명이나 인사말 없이 본문만 출력)`;

      const candidateModels = ["gemini-3.6-flash", "gemini-flash-latest", "gemini-2.5-flash", "gemini-2.0-flash"];
      let response: any = null;
      let lastError: any = null;

      for (const modelName of candidateModels) {
        try {
          response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
          });
          if (response && response.text) {
            break;
          }
        } catch (err: any) {
          console.warn(`Model ${modelName} failed:`, err.message);
          lastError = err;
        }
      }

      if (!response || !response.text) {
        throw lastError || new Error("모든 AI 모델 호출에 실패했습니다.");
      }

      const polishedText = response.text ? response.text.trim() : text;

      res.json({ success: true, polishedText });
    } catch (error: any) {
      console.error("AI Polish error:", error);
      res.status(500).json({
        error: "AI 답변 다듬기 중 오류가 발생했습니다: " + (error.message || "알 수 없는 오류"),
      });
    }
  });

  // Vite middleware for development vs Production static serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`민원 답변 가이드 서버가 실행 중입니다: http://localhost:${PORT}`);
  });
}

startServer();
