import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await loginUser({ username, password });
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to login');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="relative w-full max-w-md">
                {/* Glowing background blob */}
                <div className="absolute -top-10 -left-10 w-48 h-48 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                
                <div className="relative bg-surface/60 backdrop-blur-2xl p-10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 z-10">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">Welcome Back</h2>
                        <p className="text-gray-400 font-medium">Sign in to manage your heroes</p>
                    </div>
                    
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 text-sm font-semibold text-center shadow-inner">
                            {error}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-300 mb-2 font-semibold text-sm tracking-wide">USERNAME</label>
                            <input 
                                type="text" 
                                className="w-full px-5 py-3 bg-gray-900/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-white transition-all shadow-inner placeholder-gray-500"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2 font-semibold text-sm tracking-wide">PASSWORD</label>
                            <input 
                                type="password" 
                                className="w-full px-5 py-3 bg-gray-900/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-white transition-all shadow-inner placeholder-gray-500"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transform hover:-translate-y-0.5 transition-all duration-300 mt-4">
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
