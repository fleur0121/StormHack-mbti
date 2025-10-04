export async function callGemini(prompt: string): Promise<string> {
  const gemini = await fetch('/api/gemini_call', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, model: 'gemini-2.5-flash' }),
  });
  if (!gemini.ok) {
    const err = await gemini.json().catch(() => ({}));
    throw new Error(err.error ?? `HTTP ${gemini.status}`);
  }
  const data = await gemini.json();
  return (data.text as string) ?? '';
}