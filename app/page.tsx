'use client';
import { useState } from 'react';
 
export default function Home() {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
 
  const sendMessage = async () => {
    if (!input.trim()) return;
 
    const newMessage = { role: 'user', content: input };
    setMessages([...messages, newMessage]);
    setInput('');
    setLoading(true);
 
    try {
      const res = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
 
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', content: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', content: 'Error: could not get response.' }]);
    }
 
    setLoading(false);
  };
 
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">ThirstBot MVP</h1>
 
      <div className="w-full max-w-xl border rounded-md p-4 mb-4 h-64 overflow-y-auto">
{messages.map((msg, i) => (
          <p key={i} className={msg.role === 'user' ? 'text-blue-600' : 'text-green-600'}>
            <b>{msg.role === 'user' ? 'You' : 'Bot'}:</b> {msg.content}
          </p>
        ))}
        {loading && <p className="text-gray-500">Bot is typing…</p>}
      </div>
 
      <div className="flex w-full max-w-xl">
        <input
          className="flex-1 border rounded-l-md p-2"
          placeholder="Type your message..."
          value={input}
onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button className="bg-black text-white px-4 rounded-r-md" onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </main>
  );
}
