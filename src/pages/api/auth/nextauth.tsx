
/*
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '../../../../lib/mongodb'; // Adjust import path

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const db = await connectToDatabase();
                const usersCollection = db.collection('users');

                const user = await usersCollection.findOne({ username: credentials.username });

                if (user && user.password === credentials.password) {
                    return { id: user._id.toString(), name: user.username }; // Ensure `user._id` is converted to string
                }

                return null;
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user as { id: string; name: string }; // Correct typing for session.user
            return session;
        }
    },
    pages: {
        signIn: '/auth/signin',
    },
    secret: process.env.NEXTAUTH_SECRET,
});


 */