import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Shield, LogOut, PlusCircle } from 'lucide-react';

export const Navbar = () => {
    const { user, logoutUser, isAdmin, isEditor } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 bg-gray-900/60 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-black text-2xl tracking-tight gap-3 hover:scale-105 transition-transform duration-300">
                            <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl shadow-lg shadow-primary/30">
                                <Shield className="w-7 h-7 text-white" />
                            </div>
                            SuperHeroManager
                        </Link>
                    </div>
                    <div className="flex items-center gap-6">
                        {user ? (
                            <>
                                <div className="hidden md:flex flex-col items-end mr-2">
                                    <span className="text-white font-bold">{user.username}</span>
                                    <span className="text-xs text-primary uppercase tracking-widest font-semibold">{user.role}</span>
                                </div>
                                {(isAdmin || isEditor) && (
                                    <Link to="/add-hero" className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-blue-600 hover:to-purple-600 text-white px-5 py-2.5 rounded-full font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300">
                                        <PlusCircle className="w-5 h-5" /> Add Hero
                                    </Link>
                                )}
                                <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-red-400 font-medium transition-colors p-2 hover:bg-red-400/10 rounded-full">
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-2.5 rounded-full font-semibold backdrop-blur-sm transition-all duration-300">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
