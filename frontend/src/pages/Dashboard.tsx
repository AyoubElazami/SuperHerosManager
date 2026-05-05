import React, { useEffect, useState } from 'react';
import { getHeroes, deleteHero } from '../api/heroApi';
import { HeroCard } from '../components/HeroCard';
import { Search } from 'lucide-react';

export const Dashboard = () => {
    const [heroes, setHeroes] = useState<any[]>([]);
    const [filteredHeroes, setFilteredHeroes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [publisherFilter, setPublisherFilter] = useState('');

    useEffect(() => {
        fetchHeroes();
    }, []);

    useEffect(() => {
        let result = heroes;
        if (searchTerm) {
            result = result.filter(h => h.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        if (publisherFilter) {
            result = result.filter(h => h.biography?.publisher === publisherFilter);
        }
        setFilteredHeroes(result);
    }, [searchTerm, publisherFilter, heroes]);

    const fetchHeroes = async () => {
        try {
            const data = await getHeroes();
            setHeroes(data);
            setFilteredHeroes(data);
        } catch (error) {
            console.error('Failed to fetch heroes', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this hero?')) {
            try {
                await deleteHero(id);
                setHeroes(heroes.filter(h => h._id !== id));
            } catch (error) {
                console.error('Failed to delete hero', error);
            }
        }
    };

    const publishers = Array.from(new Set(heroes.map(h => h.biography?.publisher).filter(Boolean)));

    if (loading) return <div className="text-center text-white mt-20 text-2xl">Loading heroes...</div>;

    return (
        <div className="max-w-7xl mx-auto py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-surface/40 backdrop-blur-md p-6 rounded-3xl border border-white/5 shadow-2xl">
                <div className="text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">Hero Database</h1>
                    <p className="text-gray-400 font-medium tracking-wide">Manage and explore the multiverse</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md group-hover:bg-primary/30 transition-all"></div>
                        <input 
                            type="text" 
                            placeholder="Search heroes..." 
                            className="relative pl-12 pr-4 py-3 bg-gray-900/80 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full sm:w-72 transition-all shadow-inner placeholder-gray-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors z-10" />
                    </div>
                    
                    <div className="relative group">
                        <div className="absolute inset-0 bg-secondary/20 rounded-xl blur-md group-hover:bg-secondary/30 transition-all"></div>
                        <select 
                            className="relative bg-gray-900/80 border border-white/10 rounded-xl text-white px-5 py-3 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary appearance-none pr-10 shadow-inner w-full sm:w-48 cursor-pointer"
                            value={publisherFilter}
                            onChange={(e) => setPublisherFilter(e.target.value)}
                        >
                            <option value="">All Universes</option>
                            {publishers.map((pub: any) => (
                                <option key={pub} value={pub}>{pub}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredHeroes.map(hero => (
                    <HeroCard key={hero._id} hero={hero} onDelete={handleDelete} />
                ))}
            </div>

            {filteredHeroes.length === 0 && (
                <div className="text-center text-gray-400 mt-20 text-xl">
                    No heroes found matching your filters.
                </div>
            )}
        </div>
    );
};
