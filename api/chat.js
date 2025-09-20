// Chat API route disabled intentionally.
// Keeping the file to avoid broken imports; returns 404 for any request.
export default async function handler(req, res) {
  return res.status(404).json({ error: 'Chat API disabled' });
}
