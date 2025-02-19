'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const RecipeCalculator = () => {
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const formObject = {
            recipeName: formData.get('recipeName'),
            recipeCost: formData.get('recipeCost'),
            recipeServings: formData.get('recipeServings'),
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = await fetch('/api/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-200 font-sans leading-normal tracking-normal">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
                <h1 className="text-xl font-bold text-center text-gray-800 mb-4">Recipe Cost Calculator</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="recipeName" className="block text-sm font-medium text-gray-700">Recipe Name</label>
                        <input type="text" id="recipeName" name="recipeName" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-700" />
                    </div>
                    <div>
                        <label htmlFor="recipeCost" className="block text-sm font-medium text-gray-700">Recipe Cost</label>
                        <input type="number" id="recipeCost" name="recipeCost" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-700" />
                    </div>
                    <div>
                        <label htmlFor="recipeServings" className="block text-sm font-medium text-gray-700">Recipe Servings</label>
                        <input type="number" id="recipeServings" name="recipeServings" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-700" />
                    </div>
                    <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-lg">
                        Submit
                    </button>
                </form>
                <button
                    onClick={() => router.push('/table')}
                    className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg"
                >
                    View Recipes
                </button>
            </div>
        </div>
    );
};

export default RecipeCalculator;