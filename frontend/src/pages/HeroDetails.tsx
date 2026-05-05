import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getHeroById, deleteHero } from '../api/heroApi';
import { AuthContext } from '../context/AuthContext';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

export const HeroDetails = () => {
    const { id } = useParams();
    const [hero, setHero] = useState<any>(null);
    const { isAdmin, isEditor } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHero = async () => {
            try {
                if (id) {
                    const data = await getHeroById(id);
                    setHero(data);
                }
            } catch (error) {
                console.error('Failed to fetch hero', error);
            }
        };
        fetchHero();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this hero?')) {
            try {
                if (id) {
                    await deleteHero(id);
                    navigate('/');
                }
            } catch (error) {
                console.error('Failed to delete hero', error);
            }
        }
    };

    if (!hero) return <div className="text-center text-white mt-20 text-2xl">Loading...</div>;

    let imageUrl = 'https://via.placeholder.com/600x800?text=No+Image';
    if (hero.images?.lg) {
        imageUrl = hero.images.lg.startsWith('uploads/') 
            ? `http://localhost:5000/${hero.images.lg}` 
            : `http://localhost:5000/uploads/${hero.images.lg}`;
    }

    return (
        <div className="max-w-6xl mx-auto bg-surface/60 backdrop-blur-xl rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-gray-700/50 mt-4 relative">
            {/* Background Blur Effect */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url(${imageUrl})`, filter: 'blur(100px)', backgroundPosition: 'center', backgroundSize: 'cover' }}></div>
            
            <div className="relative z-10 p-5 border-b border-gray-700/50 flex justify-between items-center bg-gray-900/60 backdrop-blur-md">
                <Link to="/" className="flex items-center text-gray-300 hover:text-white transition-colors group font-semibold">
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Database
                </Link>
                <div className="flex gap-4">
                    {(isAdmin || isEditor) && (
                        <Link to={`/edit-hero/${hero._id}`} className="flex items-center text-blue-400 bg-blue-500/10 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 font-semibold shadow-lg">
                            <Edit className="w-4 h-4 mr-2" /> Edit Hero
                        </Link>
                    )}
                    {isAdmin && (
                        <button onClick={handleDelete} className="flex items-center text-red-400 bg-red-500/10 px-4 py-2 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 font-semibold shadow-lg">
                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </button>
                    )}
                </div>
            </div>
            
            <div className="flex flex-col lg:flex-row relative z-10">
                <div className="lg:w-2/5 p-8 flex justify-center items-center">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-800 transform hover:scale-[1.02] transition-transform duration-500">
                        <img src={imageUrl} alt={hero.name} className="w-full max-w-md object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                            <span className="bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                                {hero.biography?.publisher || 'Unknown Publisher'}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className="p-8 lg:w-3/5 lg:py-12">
                    <h1 className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-2 drop-shadow-lg">{hero.name}</h1>
                    <h2 className="text-2xl text-primary font-medium mb-10 tracking-wide">{hero.biography?.fullName || 'Unknown Identity'}</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="bg-gray-900/40 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="w-8 h-1 bg-primary rounded-full"></span>
                                Powerstats
                            </h3>
                            <ul className="space-y-4">
                                {Object.entries(hero.powerstats || {}).map(([stat, value]) => {
                                    const val = value as number;
                                    let colorClass = 'bg-primary';
                                    if (val > 80) colorClass = 'bg-red-500';
                                    else if (val > 50) colorClass = 'bg-yellow-500';
                                    else colorClass = 'bg-blue-500';
                                    
                                    return (
                                        <li key={stat} className="text-gray-300 font-medium">
                                            <div className="flex justify-between items-end mb-1">
                                                <span className="capitalize text-sm tracking-wider text-gray-400">{stat}</span>
                                                <span className="font-mono text-white font-bold">{val}</span>
                                            </div>
                                            <div className="w-full bg-gray-800 rounded-full h-2.5 shadow-inner overflow-hidden border border-gray-700/50">
                                                <div className={`h-full rounded-full transition-all duration-1000 ease-out ${colorClass}`} style={{ width: `${val}%` }}></div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="bg-gray-900/40 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="w-8 h-1 bg-primary rounded-full"></span>
                                    Biography
                                </h3>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex flex-col"><span className="text-gray-500 uppercase text-[10px] font-bold tracking-wider">Alignment</span> <span className="capitalize text-white font-medium text-lg">{hero.biography?.alignment || '-'}</span></li>
                                    <li className="flex flex-col"><span className="text-gray-500 uppercase text-[10px] font-bold tracking-wider">Place of Birth</span> <span className="text-white font-medium">{hero.biography?.placeOfBirth || '-'}</span></li>
                                    <li className="flex flex-col"><span className="text-gray-500 uppercase text-[10px] font-bold tracking-wider">First Appearance</span> <span className="text-gray-300">{hero.biography?.firstAppearance || '-'}</span></li>
                                </ul>
                            </div>
                            
                            <div className="bg-gray-900/40 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="w-8 h-1 bg-primary rounded-full"></span>
                                    Appearance
                                </h3>
                                <ul className="grid grid-cols-2 gap-4 text-sm">
                                    <li className="flex flex-col"><span className="text-gray-500 uppercase text-[10px] font-bold tracking-wider">Gender</span> <span className="text-white font-medium">{hero.appearance?.gender || '-'}</span></li>
                                    <li className="flex flex-col"><span className="text-gray-500 uppercase text-[10px] font-bold tracking-wider">Race</span> <span className="text-white font-medium">{hero.appearance?.race || '-'}</span></li>
                                    <li className="flex flex-col"><span className="text-gray-500 uppercase text-[10px] font-bold tracking-wider">Height</span> <span className="text-white font-medium">{hero.appearance?.height?.[1] || '-'}</span></li>
                                    <li className="flex flex-col"><span className="text-gray-500 uppercase text-[10px] font-bold tracking-wider">Weight</span> <span className="text-white font-medium">{hero.appearance?.weight?.[1] || '-'}</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
