import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connectToDatabase();
    const collection = db.collection('recipes');

    if (req.method === 'POST') {
        try {
            const { user, recipeName, recipeCost, recipeServings } = req.body;
            const newRecipe = {
                user,
                recipeName,
                recipeCost,
                recipeServings,
                createdAt: new Date(),
            };
            const result = await collection.insertOne(newRecipe);
            res.status(200).json({ message: 'Recipe added successfully', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Failed to add recipe' });
        }
    } else if (req.method === 'GET') {
        try {
            const recipes = await collection.find({}).toArray();
            res.status(200).json(recipes);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch recipes' });
        }
    } else if (req.method === 'PUT') {
        try {
            const { id, ...updateData } = req.body;
            const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
            if (result.modifiedCount === 0) {
                res.status(404).json({ message: 'Recipe not found or no changes made' });
                return;
            }

            res.status(200).json({ message: 'Recipe updated successfully', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Failed to update recipe' });
        }
    } else if (req.method === 'DELETE') {
        try {
            const { id } = req.body;

            if (!ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid recipe ID' });
            }

            const result = await collection.deleteOne({ _id: new ObjectId(id) });
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Recipe not found' });
            }

            res.status(200).json({ message: 'Recipe deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete recipe' });
        }
    } else {
        // Handling unsupported methods
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}