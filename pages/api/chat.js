export default async function handler(req, res) {
  try {
    const { message } = req.body;
    const reply = `You said: ${message}`; // Temporary echo
    res.status(200).json({ reply });
  } catch {
    res.status(500).json({ reply: 'Error processing request.' });
  }
}
