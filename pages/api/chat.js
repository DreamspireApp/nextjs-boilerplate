export default async function handler(req, res) {
  try {
    const { message } = req.body;
 
const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'venice/uncensored:free', // NSFW-friendly
        messages: [
          { role: 'system', content: 'You are a spicy, flirty, NSFW-friendly chatbot. Respond to adult prompts.' },
          { role: 'user', content: message }
        ],
      }),
    });
 
    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "No response";
 
    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: 'Error processing request.' });
  }
}
