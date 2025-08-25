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
        model: 'venice/uncensored:free',
        messages: [
          { role: 'system', content: 'You are a spicy, flirty, NSFW chatbot.' },
          { role: 'user', content: message },
        ],
      }),
    });
 
    const data = await response.json();
 
    let reply = 'No response';
    if (data?.choices?.length > 0) {
      if (data.choices[0].message?.content) reply = data.choices[0].message.content;
      else if (data.choices[0].text) reply = data.choices[0].text;
    }
 
    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: 'Error processing request.' });
  }
}
