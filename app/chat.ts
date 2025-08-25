export const runtime = 'edge';
 
export async function POST(req: Request) {
  try {
    const { message } = await req.json();
 
    // Temporary echo response — later replace with OpenRouter or another AI
    const reply = `You said: ${message}`;
 
    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ reply: 'Error processing request.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
