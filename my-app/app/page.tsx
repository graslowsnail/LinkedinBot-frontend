'use client';
import React, { useState } from 'react';

const Home = () => {
    const [url, setUrl] = useState('');
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setProfiles([]);

        try {
            const response = await fetch('http://localhost:8000/api/linkedin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch profile URLs');
            }

            const data = await response.json();
            setProfiles(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12">
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">LinkedIn Profiles</h1>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter LinkedIn post URL"
                        required
                        className="border border-gray-300 p-2 rounded mb-4"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Get Profile URLs
                    </button>
                </form>
            </div>

            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500 mt-4">{error}</div>}
            {profiles.length > 0 && (
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
                    <ul className="space-y-4">
                        {profiles.map((profile, index) => (
                            <li key={index} className="break-words">
                                <a href={profile} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                    {profile}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Home;

