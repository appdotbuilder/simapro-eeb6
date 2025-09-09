import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MyBorrowingsLookup() {
    const [employeeId, setEmployeeId] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (employeeId.trim()) {
            router.get(route('portal.my-borrowings'), { employee_id: employeeId.trim() });
        }
    };

    return (
        <>
            <Head title="My Borrowings - SIMAPRO" />
            
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 shadow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center space-x-3">
                                <Link href={route('home')} className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold">S</span>
                                    </div>
                                    <span className="font-bold text-xl text-gray-900 dark:text-white">SIMAPRO</span>
                                </Link>
                                <span className="text-gray-400">|</span>
                                <span className="text-gray-600 dark:text-gray-300">My Borrowings</span>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                <Link
                                    href={route('portal.assets')}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    🔍 Browse Assets
                                </Link>
                                <Link
                                    href={route('home')}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                                >
                                    ← Back to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <Card>
                        <CardHeader className="text-center">
                            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-4xl">📋</span>
                            </div>
                            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                                Track Your Borrowings
                            </CardTitle>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                                Enter your Employee ID to view your current and past borrowing requests.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Employee ID
                                    </label>
                                    <Input
                                        type="text"
                                        value={employeeId}
                                        onChange={(e) => setEmployeeId(e.target.value)}
                                        placeholder="Enter your Employee ID (e.g., EMP001)"
                                        className="text-center text-lg"
                                        required
                                    />
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                        Use the same Employee ID you provided when submitting borrowing requests.
                                    </p>
                                </div>

                                <Button type="submit" className="w-full" size="lg">
                                    View My Borrowings
                                </Button>
                            </form>

                            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                                    ℹ️ What you can track:
                                </h3>
                                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                                    <li>• Current pending requests</li>
                                    <li>• Approved borrowings</li>
                                    <li>• Items currently borrowed</li>
                                    <li>• Complete borrowing history</li>
                                    <li>• Request status updates</li>
                                </ul>
                            </div>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Don't have any requests yet?{' '}
                                    <Link 
                                        href={route('portal.assets')} 
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        Browse available assets
                                    </Link>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}