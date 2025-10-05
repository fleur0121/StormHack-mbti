import { useState } from 'react';

export default function FirstPage() {

  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');

  const ask = async () => {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setAnswer(data.text ?? '(no text)');
  };

  return (
    <main style={{ padding: 24 }}>
      <h1>Gemini Chat (Vite + Vercel)</h1>
      <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={4} style={{ width: '100%' }} />
      <br />
      <button onClick={ask}>Send</button>
      <pre>{answer}</pre>
    </main>
  );
}




