import React, { useEffect, useState } from 'react';
import { HeroForm } from '../components/HeroForm';
import { getHeroById, updateHero } from '../api/heroApi';
import { useParams, useNavigate } from 'react-router-dom';

export const EditHero = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hero, setHero] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                if (id) {
                    const data = await getHeroById(id);
                    setHero(data);
                }
            } catch (error) {
                console.error('Failed to fetch hero', error);
            } finally {
                setLoading(false);
            }
        };
        fetchHero();
    }, [id]);

    const handleSubmit = async (formData: FormData) => {
        if (id) {
            await updateHero(id, formData);
            navigate(`/hero/${id}`);
        }
    };

    if (loading) return <div className="text-center text-white mt-20 text-2xl">Loading...</div>;
    if (!hero) return <div className="text-center text-white mt-20 text-2xl">Hero not found.</div>;

    return (
        <div className="py-8">
            <HeroForm initialData={hero} onSubmit={handleSubmit} isEdit={true} />
        </div>
    );
};
