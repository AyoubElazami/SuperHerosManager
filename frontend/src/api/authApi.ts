import api from './axiosInstance';

export const login = async (credentials: any) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

export const register = async (credentials: any) => {
    const response = await api.post('/auth/register', credentials);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('user');
};
