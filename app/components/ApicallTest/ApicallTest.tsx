import { useState } from 'react';
import { callGemini } from '../../utils/callGemini';

export default function ApicallTest() {
  const [out, setOut] = useState('');
  const [loading, setLoading] = useState(false);

  const onAsk = async () => {
    try {
      setLoading(true);
      const text = await callGemini('Explain about mbti in a few sentences.');
      setOut(text);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 16 }}>
      <h1>Play</h1>
      <button onClick={onAsk} disabled={loading}>
        {loading ? 'Loading…' : 'Ask Gemini'}
      </button>
      <pre style={{ whiteSpace: 'pre-wrap', marginTop: 12 }}>{out}</pre>
    </main>
  );
}
