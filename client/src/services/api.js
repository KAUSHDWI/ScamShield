const BASE_URL = "https://scamshield-yifc.onrender.com";

export async function analyzeJobPosting(text) {
  const response = await fetch(`${BASE_URL}/api/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Something went wrong.");
  }

  return response.json();
}

export async function signupUser(userData) {
  const response = await fetch(`${BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }

  return data;
}

export async function loginUser(userData) {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

export async function reportScam(text, token) {
  const response = await fetch(`${BASE_URL}/api/report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Report failed");
  }

  return data;
}

export async function getScans(token) {
  const response = await fetch(`${BASE_URL}/api/analyze`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch scans");
  }

  return data;
}

export async function getReports() {
  const response = await fetch(`${BASE_URL}/api/report`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch reports");
  }

  return data;
}