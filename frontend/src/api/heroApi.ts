import api from './axiosInstance';

export const getHeroes = async () => {
    const response = await api.get('/heroes');
    return response.data;
};

export const getHeroById = async (id: string) => {
    const response = await api.get(`/heroes/${id}`);
    return response.data;
};

export const createHero = async (heroData: FormData) => {
    const response = await api.post('/heroes', heroData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

export const updateHero = async (id: string, heroData: FormData) => {
    const response = await api.put(`/heroes/${id}`, heroData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

export const deleteHero = async (id: string) => {
    const response = await api.delete(`/heroes/${id}`);
    return response.data;
};
