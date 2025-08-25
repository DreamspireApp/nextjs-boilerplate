export const runtime = 'edge';
 
export async function POST(req: Request) {
  const { message } = await req.json();
 
  // Temporary echo response
  const reply = `You said: ${message}`;
 
  return new Response(JSON.stringify({ reply }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
