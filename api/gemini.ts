// /api/gemini.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const { prompt } = req.body ?? {};
    if (!prompt || typeof prompt !== 'string') return res.status(400).json({ error: 'prompt is required' });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // 速さ重視。精度なら 'gemini-2.5-pro'
      contents: prompt,
    });

    // 必要ならここで検閲/トークン数ログ/レート制限など
    return res.status(200).json({ text: response.text });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ error: 'Gemini failed' });
  }
}
