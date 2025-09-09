import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="SIMAPRO - Sistem Manajemen Aset & Peminjaman Pro">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100">
                {/* Navigation */}
                <header className="w-full p-6">
                    <nav className="flex items-center justify-between mx-auto max-w-7xl">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">S</span>
                            </div>
                            <span className="font-bold text-xl text-gray-900 dark:text-white">SIMAPRO</span>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
                                >
                                    📊 Dashboard
                                </Link>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <Link
                                        href={route('portal.assets')}
                                        className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                                    >
                                        🔍 Browse Assets
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="flex-1 flex items-center justify-center px-6 py-12">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="mb-8">
                            <div className="inline-block p-3 bg-blue-100 rounded-full mb-6 dark:bg-blue-900">
                                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                                    <span className="text-3xl">📦</span>
                                </div>
                            </div>
                            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                <span className="text-blue-600">SIMAPRO</span>
                                <br />
                                <span className="text-3xl">Sistem Manajemen Aset & Peminjaman Pro</span>
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                                🚀 Comprehensive web-based solution for managing your organization's assets and borrowing processes with modern, intuitive interface.
                            </p>
                        </div>

                        {/* Key Features */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="text-3xl mb-3">📋</div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Asset Management</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Complete asset lifecycle tracking with QR codes</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="text-3xl mb-3">🤝</div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Self-Service Portal</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Easy borrowing requests without login required</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="text-3xl mb-3">🔧</div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Maintenance Tracking</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Schedule and track asset maintenance history</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="text-3xl mb-3">📊</div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Smart Reports</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Comprehensive reporting and analytics</p>
                            </div>
                        </div>

                        {/* User Roles */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12 border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">👥 Three User Roles</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <span className="text-2xl">👑</span>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Admin</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Full system access, manage all master data and configurations</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <span className="text-2xl">👨‍💼</span>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Petugas Sarpras</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Daily operations, process requests, manage inventory</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <span className="text-2xl">👤</span>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">User/Peminjam</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Browse catalog, submit loan requests, track status</p>
                                </div>
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                                <Link
                                    href={route('portal.assets')}
                                    className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg"
                                >
                                    🔍 Browse Available Assets
                                </Link>
                                {!auth.user && (
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center px-8 py-4 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg"
                                    >
                                        🚀 Get Started
                                    </Link>
                                )}
                            </div>
                            
                            <div className="text-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Demo Credentials: admin@simapro.com / petugas@simapro.com (password: password)
                                </p>
                            </div>
                        </div>

                        {/* Screenshots Mockup */}
                        <div className="mt-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                            <h3 className="text-2xl font-bold mb-4">📱 Modern Interface</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 h-32 flex items-center justify-center">
                                    <span className="text-4xl">📊</span>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 h-32 flex items-center justify-center">
                                    <span className="text-4xl">📦</span>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 h-32 flex items-center justify-center">
                                    <span className="text-4xl">📝</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                    <div className="max-w-7xl mx-auto px-6">
                        <p>
                            Built with ❤️ using Laravel & React • SIMAPRO v1.0
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}