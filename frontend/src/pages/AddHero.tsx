import React from 'react';
import { HeroForm } from '../components/HeroForm';
import { createHero } from '../api/heroApi';
import { useNavigate } from 'react-router-dom';

export const AddHero = () => {
    const navigate = useNavigate();

    const handleSubmit = async (formData: FormData) => {
        await createHero(formData);
        navigate('/');
    };

    return (
        <div className="py-8">
            <HeroForm onSubmit={handleSubmit} isEdit={false} />
        </div>
    );
};
