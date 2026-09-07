// frontend/app/page.tsx
'use client';

export default function HomePage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Chat App</h1>
        <p className="text-xl mb-8">Chat dengan teman menggunakan Gmail 🚀</p>
        <div className="space-x-4">
          <button className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition">
            Login
          </button>
          <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}