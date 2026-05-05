import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface HeroFormProps {
    initialData?: any;
    onSubmit: (formData: FormData) => Promise<void>;
    isEdit?: boolean;
}

export const HeroForm: React.FC<HeroFormProps> = ({ initialData, onSubmit, isEdit }) => {
    const navigate = useNavigate();
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const formik = useFormik({
        initialValues: {
            name: initialData?.name || '',
            fullName: initialData?.biography?.fullName || '',
            publisher: initialData?.biography?.publisher || '',
            intelligence: initialData?.powerstats?.intelligence || 0,
            strength: initialData?.powerstats?.strength || 0,
            speed: initialData?.powerstats?.speed || 0,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            fullName: Yup.string(),
            publisher: Yup.string(),
            intelligence: Yup.number().min(0).max(100),
            strength: Yup.number().min(0).max(100),
            speed: Yup.number().min(0).max(100),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setError('');
            try {
                const formData = new FormData();
                formData.append('name', values.name);
                formData.append('biography', JSON.stringify({ fullName: values.fullName, publisher: values.publisher }));
                formData.append('powerstats', JSON.stringify({ intelligence: values.intelligence, strength: values.strength, speed: values.speed }));
                
                if (image) {
                    formData.append('image', image);
                }

                await onSubmit(formData);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="bg-surface p-8 rounded-xl shadow-lg border border-gray-700 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-4">
                {isEdit ? 'Edit Hero' : 'Add New Hero'}
            </h2>
            
            {error && <p className="text-red-500 mb-4 bg-red-900/20 p-3 rounded">{error}</p>}

            <div className="space-y-6">
                <div>
                    <label className="block text-gray-300 font-semibold mb-2">Hero Name *</label>
                    <input 
                        type="text" 
                        name="name"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                    ) : null}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-300 font-semibold mb-2">Full Name</label>
                        <input 
                            type="text" 
                            name="fullName"
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            onChange={formik.handleChange}
                            value={formik.values.fullName}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 font-semibold mb-2">Publisher</label>
                        <input 
                            type="text" 
                            name="publisher"
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            onChange={formik.handleChange}
                            value={formik.values.publisher}
                        />
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-primary mb-3">Powerstats</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-gray-400 mb-1 text-sm">Intelligence (0-100)</label>
                            <input 
                                type="number" 
                                name="intelligence"
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                onChange={formik.handleChange}
                                value={formik.values.intelligence}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1 text-sm">Strength (0-100)</label>
                            <input 
                                type="number" 
                                name="strength"
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                onChange={formik.handleChange}
                                value={formik.values.strength}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1 text-sm">Speed (0-100)</label>
                            <input 
                                type="number" 
                                name="speed"
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                onChange={formik.handleChange}
                                value={formik.values.speed}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-gray-300 font-semibold mb-2">Image Upload</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-secondary cursor-pointer"
                        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="flex-1 bg-primary hover:bg-secondary text-white font-bold py-3 px-4 rounded-md transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Hero'}
                    </button>
                    <button 
                        type="button" 
                        onClick={() => navigate(-1)}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-md transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    );
};
