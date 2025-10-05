import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('[API] hit /api/gemini', req.method);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { prompt } = req.body ?? {};
  console.log('[API] prompt:', prompt);

  // キー未設定でも動作確認できるモック
  if (!process.env.GEMINI_API_KEY) {
    console.warn('[API] GEMINI_API_KEY is missing → return MOCK');
    return res.status(200).json({ text: `MOCK: ${prompt ?? 'no prompt'}` });
  }

  try {
    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt || 'hello',
    });
    console.log('[API] ok');
    return res.status(200).json({ text: result.text });
  } catch (e: any) {
    console.error('[API] error:', e?.message || e);
    return res.status(500).json({ error: 'Gemini failed' });
  }
}
