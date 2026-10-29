import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow p-8">
        <h1 className="text-2xl font-bold mb-6">Log in</h1>
        {error && (
          <p className="mb-4 rounded-md bg-red-100 text-red-700 px-3 py-2 text-sm">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input className="border border-slate-300 rounded-md px-3 py-2" type="email"
            placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
          <input className="border border-slate-300 rounded-md px-3 py-2" type="password"
            placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} required />
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 font-medium"
            type="submit">Log in</button>
        </form>
        <p className="mt-4 text-sm text-slate-600">
          No account? <Link className="text-blue-600 hover:underline" to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}