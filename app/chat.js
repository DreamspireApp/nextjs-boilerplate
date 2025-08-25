export const runtime = 'edge';
 
export async function POST(req) {
  try {
    const body = await req.json();
    const message = body.message;
 
    // Temporary echo response
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
}
