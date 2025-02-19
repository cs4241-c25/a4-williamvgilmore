import { signIn } from 'next-auth/react';

export default function SignIn() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form className="p-6 bg-white rounded-lg shadow-lg" onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                signIn('credentials', {
                    redirect: true,
                    username: data.get('username'),
                    password: data.get('password'),
                    callbackUrl: '/'
                });
            }}>
                <h2 className="mb-4 text-2xl font-bold">Sign In</h2>
                <input name="username" placeholder="Username" required className="block w-full mb-4 p-2 border rounded" />
                <input name="password" type="password" placeholder="Password" required className="block w-full mb-4 p-2 border rounded" />
                <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">Sign In</button>
            </form>
        </div>
    );
}