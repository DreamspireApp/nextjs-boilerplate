import { useState } from 'react';
 
export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
 
  const sendMessage = async () => {
    if (!input.trim()) return;
 
    const newMessage = { role: 'user', content: input };
    setMessages([...messages, newMessage]);
    setInput('');
    setLoading(true);
 
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
 
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', content: 'Error: could not get response.' }]);
    }
 
    setLoading(false);
  };
 
  return (
    <main style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'2rem' }}>
      <h1>ThirstBot MVP</h1>
      <div style={{ border:'1px solid #ccc', padding:'1rem', width:'100%', maxWidth:'500px', height:'300px', overflowY:'auto', margin:'1rem 0' }}>
{messages.map((msg,i)=>(
          <p key={i} style={{ color: msg.role==='user'?'blue':'green' }}>
            <b>{msg.role==='user'?'You':'Bot'}:</b> {msg.content}
          </p>
        ))}
        {loading && <p style={{ color:'#999' }}>Bot is typing…</p>}
      </div>
      <div style={{ display:'flex', width:'100%', maxWidth:'500px' }}>
        <input
          style={{ flex:1, padding:'0.5rem' }}
          placeholder="Type your message..."
          value={input}
onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==='Enter' && sendMessage()}
        />
        <button onClick={sendMessage} disabled={loading} style={{ padding:'0.5rem' }}>Send</button>
      </div>
    </main>
  );
}
