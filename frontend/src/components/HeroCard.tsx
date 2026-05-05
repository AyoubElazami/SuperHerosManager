import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

interface HeroProps {
    hero: any;
    onDelete: (id: string) => void;
}

export const HeroCard: React.FC<HeroProps> = ({ hero, onDelete }) => {
    const { isAdmin, isEditor } = useContext(AuthContext);
    
    // Handle image paths for both seeded (e.g. md/1.jpg) and new uploads (e.g. uploads/lg/1.jpg)
    let imageUrl = 'https://via.placeholder.com/300x400?text=No+Image';
    if (hero.images?.md) {
        imageUrl = hero.images.md.startsWith('uploads/') 
            ? `http://localhost:5000/${hero.images.md}` 
            : `http://localhost:5000/uploads/${hero.images.md}`;
    }

    return (
        <div className="bg-surface/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-gray-700 hover:border-primary hover:shadow-primary/20 transition-all duration-500 group flex flex-col h-full transform hover:-translate-y-2">
            <div className="relative h-72 overflow-hidden bg-gray-900">
                <img src={imageUrl} alt={hero.name} className="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-80 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-90"></div>
                <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg border border-primary/50">
                    {hero.biography?.publisher || 'Unknown'}
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow relative z-10 -mt-6">
                <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-1 drop-shadow-md">{hero.name}</h3>
                <p className="text-gray-400 text-sm font-medium mb-5">{hero.biography?.fullName || 'Unknown Identity'}</p>
                
                <div className="grid grid-cols-3 gap-2 text-xs font-bold mb-auto">
                    <div className="flex flex-col items-center bg-blue-500/10 border border-blue-500/20 text-blue-400 py-2 rounded-lg">
                        <span className="text-gray-500 text-[10px] uppercase mb-1">INT</span>
                        <span className="text-lg">{hero.powerstats?.intelligence || 0}</span>
                    </div>
                    <div className="flex flex-col items-center bg-red-500/10 border border-red-500/20 text-red-400 py-2 rounded-lg">
                        <span className="text-gray-500 text-[10px] uppercase mb-1">STR</span>
                        <span className="text-lg">{hero.powerstats?.strength || 0}</span>
                    </div>
                    <div className="flex flex-col items-center bg-green-500/10 border border-green-500/20 text-green-400 py-2 rounded-lg">
                        <span className="text-gray-500 text-[10px] uppercase mb-1">SPD</span>
                        <span className="text-lg">{hero.powerstats?.speed || 0}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-700/50">
                    <Link to={`/hero/${hero._id}`} className="flex items-center text-primary hover:text-white transition-colors text-sm font-semibold group-hover:underline">
                        <Eye className="w-4 h-4 mr-1.5" /> Details
                    </Link>
                    <div className="flex gap-3">
                        {(isAdmin || isEditor) && (
                            <Link to={`/edit-hero/${hero._id}`} className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-full transition-all duration-300">
                                <Edit className="w-4 h-4" />
                            </Link>
                        )}
                        {isAdmin && (
                            <button onClick={() => onDelete(hero._id)} className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-full transition-all duration-300">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
