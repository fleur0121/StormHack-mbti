export default async function handler(req: any, res: any) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method Not Allowed' });
      return;
    }

    const { prompt, model = 'gemini-2.5-flash' } = req.body ?? {};
    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'prompt is required' });
      return;
    }

    const url =
      `https://generativelanguage.googleapis.com/v1beta/models/` +
      `${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const body = {
      contents: [{ parts: [{ text: prompt }] }],
    };

    const gemini = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!gemini.ok) {
      const errText = await gemini.text();
      res.status(gemini.status).json({ error: errText });
      return;
    }

    const json = await gemini.json();
    const text = json?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    res.status(200).json({ text });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e?.message ?? 'Internal Error' });
  }
}
