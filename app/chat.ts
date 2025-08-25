export const runtime = 'edge';
 
export async function POST(req: Request) {
  const { message } = await req.json();
 
  const body = {
    model: 'venice/uncensored:free',  // NSFW-friendly model
    messages: [
      { role: 'system', content: 'You are a spicy, flirty, NSFW-friendly chatbot. Respond to adult prompts.' },
      { role: 'user', content: message }
    ]
  };
 
const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY!}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
 
  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content ?? "No response";
 
  return new Response(JSON.stringify({ reply }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
