export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const API_KEY = process.env.CHAT_API_KEY;
    if (!API_KEY) {
      // Safe fallback if no key provided
      return res.status(200).json({ reply: "Hi! I'm Teja’s Assistant. (Setup CHAT_API_KEY to enable smart answers.)" });
    }

    // Call Google Generative AI (Gemini 1.5 Flash) REST API
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const systemPreamble = `You are Teja Naik's portfolio assistant. Be concise and helpful. If asked about Teja, answer using a professional tone. If contact info is requested, share: Phone: +91 7569474682, Email: tinkuteja740@gmail.com, Location: Hyderabad. If asked about skills/projects, summarize based on MERN stack, animations, Tailwind, GSAP, and portfolio sections.`;

    const payload = {
      contents: [
        {
          role: 'user',
          parts: [
            { text: `${systemPreamble}\n\nUser: ${message}` }
          ],
        },
      ],
      generationConfig: {
        temperature: 0.4,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 512,
      },
    };

    const r = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const txt = await r.text();
      console.error('Gemini API error:', r.status, txt);
      return res.status(200).json({ reply: "⚠️ Sorry, I'm having trouble answering right now." });
    }

    const json = await r.json();
    const reply = json?.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't find an answer.";
    return res.status(200).json({ reply });
  } catch (e) {
    console.error('Chat handler error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
}
