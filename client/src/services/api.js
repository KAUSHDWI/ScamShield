const BASE_URL = "https://scamshield-yifc.onrender.com";

export const analyzeText = async (text) => {
  const response = await fetch(`${BASE_URL}/api/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  return response.json();
};