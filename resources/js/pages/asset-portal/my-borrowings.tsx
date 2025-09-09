import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BorrowRequest {
    id: number;
    request_code: string;
    borrower_name: string;
    borrower_employee_id: string;
    borrower_phone: string;
    borrower_email: string | null;
    borrower_department: string | null;
    purpose: string;
    requested_start_date: string;
    requested_end_date: string;
    status: string;
    notes: string | null;
    created_at: string;
    processed_at: string | null;
    rejection_reason: string | null;
    actual_start_date: string | null;
    actual_end_date: string | null;
    asset: {
        id: number;
        asset_code: string;
        name: string;
        category: {
            id: number;
            name: string;
        };
    };
    processedBy?: {
        id: number;
        name: string;
    } | null;
}

interface Props {
    borrowRequests: BorrowRequest[];
    employeeId: string;
    [key: string]: unknown;
}

export default function MyBorrowings({ borrowRequests, employeeId }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'approved':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            case 'completed':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return '⏳';
            case 'approved':
                return '✅';
            case 'rejected':
                return '❌';
            case 'completed':
                return '🏁';
            default:
                return '📋';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const pendingRequests = borrowRequests.filter(req => req.status === 'pending');
    const activeRequests = borrowRequests.filter(req => req.status === 'approved' && req.actual_start_date && !req.actual_end_date);
    const completedRequests = borrowRequests.filter(req => req.status === 'completed' || req.status === 'rejected' || (req.status === 'approved' && req.actual_end_date));

    return (
        <>
            <Head title={`My Borrowings - ${employeeId} - SIMAPRO`} />
            
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
                                    href={route('portal.my-borrowings')}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                                >
                                    ← Change Employee ID
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            📋 My Borrowing History
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Employee ID: <span className="font-semibold">{employeeId}</span>
                        </p>
                    </div>

                    {borrowRequests.length === 0 ? (
                        <div className="text-center py-12">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="text-6xl mb-4">📝</div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        No borrowing requests found
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                                        You haven't submitted any borrowing requests yet with this Employee ID.
                                    </p>
                                    <Link href={route('portal.assets')}>
                                        <Button>
                                            Browse Available Assets
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {/* Summary Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <Card>
                                    <CardContent className="p-4 text-center">
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{borrowRequests.length}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Total Requests</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-4 text-center">
                                        <div className="text-2xl font-bold text-yellow-600">{pendingRequests.length}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-4 text-center">
                                        <div className="text-2xl font-bold text-green-600">{activeRequests.length}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Currently Borrowed</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-4 text-center">
                                        <div className="text-2xl font-bold text-blue-600">{completedRequests.length}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Pending Requests */}
                            {pendingRequests.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                        ⏳ Pending Requests ({pendingRequests.length})
                                    </h2>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {pendingRequests.map((request) => (
                                            <Card key={request.id}>
                                                <CardHeader>
                                                    <div className="flex justify-between items-start">
                                                        <CardTitle className="text-lg">{request.asset.name}</CardTitle>
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                                            {getStatusIcon(request.status)} {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        Request: {request.request_code} • Asset: {request.asset.asset_code}
                                                    </p>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-2 text-sm">
                                                        <div>
                                                            <span className="font-medium">Purpose:</span> {request.purpose}
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">Requested Period:</span><br />
                                                            {formatDate(request.requested_start_date)} - {formatDate(request.requested_end_date)}
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">Submitted:</span> {formatDate(request.created_at)}
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Currently Borrowed */}
                            {activeRequests.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                        📦 Currently Borrowed ({activeRequests.length})
                                    </h2>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {activeRequests.map((request) => (
                                            <Card key={request.id} className="border-green-200 dark:border-green-800">
                                                <CardHeader>
                                                    <div className="flex justify-between items-start">
                                                        <CardTitle className="text-lg">{request.asset.name}</CardTitle>
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                                            {getStatusIcon(request.status)} Active
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        Request: {request.request_code} • Asset: {request.asset.asset_code}
                                                    </p>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-2 text-sm">
                                                        <div>
                                                            <span className="font-medium">Borrowed Since:</span> {request.actual_start_date ? formatDate(request.actual_start_date) : 'N/A'}
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">Expected Return:</span> {formatDate(request.requested_end_date)}
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">Purpose:</span> {request.purpose}
                                                        </div>
                                                        {request.processedBy && (
                                                            <div>
                                                                <span className="font-medium">Approved by:</span> {request.processedBy.name}
                                                            </div>
                                                        )}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* History */}
                            {completedRequests.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                        📚 History ({completedRequests.length})
                                    </h2>
                                    <div className="space-y-4">
                                        {completedRequests.map((request) => (
                                            <Card key={request.id}>
                                                <CardContent className="p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <h3 className="font-semibold text-gray-900 dark:text-white">{request.asset.name}</h3>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                {request.request_code} • {request.asset.asset_code} • {formatDate(request.created_at)}
                                                            </p>
                                                        </div>
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                                            {getStatusIcon(request.status)} {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                                        </span>
                                                    </div>
                                                    {request.status === 'rejected' && request.rejection_reason && (
                                                        <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 rounded text-sm text-red-800 dark:text-red-200">
                                                            <span className="font-medium">Rejection Reason:</span> {request.rejection_reason}
                                                        </div>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}