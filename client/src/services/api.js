// ── Base URL ─────────────────────────────────────────────────────────────────
// In development, Create React App's "proxy" field in package.json forwards
// /api/* requests to http://localhost:5000 automatically.
const BASE_URL = "https://scamshield-yifc.onrender.com";
/**
 * Sends job posting text to the backend for scam analysis.
 *
 * @param {string} text - The raw job description or recruiter message.
 * @returns {Promise<{ score: number, level: string, reasons: string[] }>}
 * @throws {Error} with a user-friendly message on failure.
 */
export async function analyzeJobPosting(text) {
  const response = await fetch(`${BASE_URL}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Something went wrong. Please try again.");
  }

  return response.json();
}