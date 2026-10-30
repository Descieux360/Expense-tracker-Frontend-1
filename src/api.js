const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '');

export async function api(path, options = {}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const text = await res.text();
  let data;

  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Server returned an unexpected response (${res.status})`);
  }
  
  if (!res.ok) throw new Error(data.error || 'Something went wrong');

  return data;
}