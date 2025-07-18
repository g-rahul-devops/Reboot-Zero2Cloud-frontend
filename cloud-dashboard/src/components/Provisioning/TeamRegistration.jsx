import React, { useState } from 'react';

const TeamRegistration = () => {
    const [formData, setFormData] = useState({
        teamName: '',
        tag: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Basic validation
        if (!formData.teamName.trim() || !formData.tag.trim()) {
            setError('Both team name and tag are required');
            return;
        }

        // Validate tag format (you can adjust the rules as needed)
        const tagRegex = /^[A-Z0-9-]{2,10}$/;
        if (!tagRegex.test(formData.tag)) {
            setError('Tag must be 2-10 characters long and contain only uppercase letters, numbers, and hyphens');
            return;
        }

        // Here you would typically make an API call to save the team data
        console.log('Team registration:', formData);
        setSuccess('Team registered successfully!');

        // Reset form
        setFormData({
            teamName: '',
            tag: ''
        });
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Team Registration</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-2">
                        Team Name
                    </label>
                    <input
                        type="text"
                        id="teamName"
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter team name"
                    />
                </div>

                <div>
                    <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-2">
                        Team Tag
                    </label>
                    <input
                        type="text"
                        id="tag"
                        name="tag"
                        value={formData.tag}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter team tag (e.g., TEAM-1)"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        Tag must be 2-10 characters using uppercase letters, numbers, and hyphens only
                    </p>
                </div>

                {error && (
                    <div className="text-red-500 text-sm">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="text-green-500 text-sm">
                        {success}
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Register Team
                </button>
            </form>
        </div>
    );
};

export default TeamRegistration;