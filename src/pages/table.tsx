'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const RecipeTable = () => {
    const [recipes, setRecipes] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetch('/api/recipes');
            const data = await response.json();
            setRecipes(data);
        };
        fetchRecipes();
    }, []);

    const handleEdit = (index: number, field: string, value: string) => {
        setRecipes(prevRecipes =>
            prevRecipes.map((recipe, i) =>
                i === index ? { ...recipe, [field]: value } : recipe
            )
        );
    };

    const handleSave = async (index: number) => {
        const updatedRecipe = recipes[index];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = await fetch('/api/recipes', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: updatedRecipe._id,
                recipeName: updatedRecipe.recipeName,
                recipeCost: updatedRecipe.recipeCost,
                recipeServings: updatedRecipe.recipeServings,
            }),
        });

    };

    const handleDelete = async (id: string) => {
        const response = await fetch(`/api/recipes`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });

        if (response.ok) {
            setRecipes(recipes.filter(recipe => recipe._id !== id));
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-green-200 p-6">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-3xl">
                <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Recipe List</h1>
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 rounded-lg shadow-md">
                        <thead className="bg-green-600 text-white">
                        <tr>
                            <th className="px-4 py-3 text-left">Recipe Name</th>
                            <th className="px-4 py-3 text-left">Cost ($)</th>
                            <th className="px-4 py-3 text-left">Servings</th>
                            <th className="px-4 py-3 text-left">Price/Serving ($)</th>
                            <th className="px-4 py-3 text-left">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {recipes.length > 0 ? (
                            recipes.map((recipe, index) => (
                                <tr key={index} className="border-b border-gray-200 hover:bg-green-100 transition duration-300">
                                    <td className="px-4 py-3 text-gray-900">
                                        <input
                                            type="text"
                                            value={recipe.recipeName}
                                            onChange={(e) => handleEdit(index, 'recipeName', e.target.value)}
                                            onBlur={() => handleSave(index)}
                                            className="w-full bg-transparent border border-gray-300 rounded-md px-2 py-1"
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-gray-900">
                                        <input
                                            type="number"
                                            value={recipe.recipeCost}
                                            onChange={(e) => handleEdit(index, 'recipeCost', e.target.value)}
                                            onBlur={() => handleSave(index)}
                                            className="w-full bg-transparent border border-gray-300 rounded-md px-2 py-1"
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-gray-900">
                                        <input
                                            type="number"
                                            value={recipe.recipeServings}
                                            onChange={(e) => handleEdit(index, 'recipeServings', e.target.value)}
                                            onBlur={() => handleSave(index)}
                                            className="w-full bg-transparent border border-gray-300 rounded-md px-2 py-1"
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-gray-900">
                                        {recipe.recipeCost && recipe.recipeServings
                                            ? (recipe.recipeCost / recipe.recipeServings).toFixed(2)
                                            : '0.00'}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            onClick={() => handleDelete(recipe._id)}
                                            className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-gray-500">No recipes found.</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                <button
                    onClick={() => router.push('/')}
                    className="w-full mt-6 bg-blue-600 text-white py-3 px-5 rounded-lg hover:bg-blue-700 transition duration-300">
                    Go to Form
                </button>
            </div>
        </div>
    );
};

export default RecipeTable;