import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardStats {
    total_assets: number;
    available_assets: number;
    borrowed_assets: number;
    under_repair_assets: number;
    pending_requests: number;
    active_borrowings: number;
}

interface BorrowRequest {
    id: number;
    request_code: string;
    borrower_name: string;
    borrower_employee_id: string;
    purpose: string;
    created_at: string;
    status: string;
    asset: {
        name: string;
        asset_code: string;
    };
    processedBy?: {
        name: string;
    } | null;
}

interface MaintenanceReport {
    id: number;
    type: string;
    description: string;
    severity: string;
    created_at: string;
    asset: {
        name: string;
        asset_code: string;
    };
}

interface Props extends SharedData {
    stats: DashboardStats;
    user_role: string;
    recent_requests?: BorrowRequest[];
    pending_maintenance?: MaintenanceReport[];
    [key: string]: unknown;
}

export default function Dashboard() {
    const { auth, stats, user_role, recent_requests, pending_maintenance } = usePage<Props>().props;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'critical':
                return 'text-red-600 dark:text-red-400';
            case 'high':
                return 'text-orange-600 dark:text-orange-400';
            case 'medium':
                return 'text-yellow-600 dark:text-yellow-400';
            case 'low':
                return 'text-green-600 dark:text-green-400';
            default:
                return 'text-gray-600 dark:text-gray-400';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard - SIMAPRO" />

            <div className="space-y-6 p-4">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
                    <h1 className="text-2xl font-bold mb-2">
                        Welcome back, {auth.user?.name}! 👋
                    </h1>
                    <p className="text-blue-100">
                        {user_role === 'admin' && 'You have full system access and can manage all aspects of SIMAPRO.'}
                        {user_role === 'petugas' && 'You can process borrowing requests and manage daily operations.'}
                        {user_role === 'user' && 'You can view reports and access your assigned features.'}
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.total_assets || 0}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">📦 Total Assets</div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-green-600">{stats?.available_assets || 0}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">✅ Available</div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-blue-600">{stats?.borrowed_assets || 0}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">📝 Borrowed</div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-orange-600">{stats?.under_repair_assets || 0}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">🔧 Under Repair</div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-yellow-600">{stats?.pending_requests || 0}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">⏳ Pending</div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-purple-600">{stats?.active_borrowings || 0}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">🤝 Active Loans</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Admin/Petugas Additional Dashboard Content */}
                {(user_role === 'admin' || user_role === 'petugas') && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Requests */}
                        {recent_requests && recent_requests.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <span>📋</span>
                                        <span>Recent Borrow Requests</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {recent_requests.slice(0, 5).map((request) => (
                                            <div key={request.id} className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-sm text-gray-900 dark:text-white">
                                                        {request.asset.name}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {request.borrower_name} • {request.request_code}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        {formatDate(request.created_at)}
                                                    </p>
                                                </div>
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                                    request.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                }`}>
                                                    {request.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Pending Maintenance */}
                        {pending_maintenance && pending_maintenance.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <span>🔧</span>
                                        <span>Pending Maintenance</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {pending_maintenance.slice(0, 5).map((maintenance) => (
                                            <div key={maintenance.id} className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-sm text-gray-900 dark:text-white">
                                                        {maintenance.asset.name}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {maintenance.asset.asset_code}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        {formatDate(maintenance.created_at)}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <span className={`text-xs font-medium ${getSeverityColor(maintenance.severity)}`}>
                                                        {maintenance.severity}
                                                    </span>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        {maintenance.type}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <span>⚡</span>
                            <span>Quick Actions</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Link 
                                href={route('portal.assets')} 
                                className="block p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                            >
                                <div className="text-center">
                                    <div className="text-2xl mb-2">🔍</div>
                                    <div className="font-medium text-gray-900 dark:text-white">Browse Assets</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">View available items</div>
                                </div>
                            </Link>
                            
                            <Link 
                                href={route('portal.my-borrowings')} 
                                className="block p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                            >
                                <div className="text-center">
                                    <div className="text-2xl mb-2">📋</div>
                                    <div className="font-medium text-gray-900 dark:text-white">Track Requests</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Check borrowing status</div>
                                </div>
                            </Link>
                            
                            {(user_role === 'admin' || user_role === 'petugas') && (
                                <>
                                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                        <div className="text-center">
                                            <div className="text-2xl mb-2">⚙️</div>
                                            <div className="font-medium text-gray-900 dark:text-white">Manage Assets</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">Add/edit inventory</div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                        <div className="text-center">
                                            <div className="text-2xl mb-2">📊</div>
                                            <div className="font-medium text-gray-900 dark:text-white">Generate Reports</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">View analytics</div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}