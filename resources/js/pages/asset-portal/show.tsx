import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Asset {
    id: number;
    asset_code: string;
    name: string;
    description: string | null;
    photos: string[] | null;
    brand: string | null;
    serial_number: string | null;
    specifications: string | null;
    purchase_date: string | null;
    purchase_price: string | null;
    status: string;
    category: {
        id: number;
        name: string;
    };
    location: {
        id: number;
        name: string;
    };
    supplier?: {
        id: number;
        name: string;
    } | null;
}

interface Props {
    asset: Asset;
    [key: string]: unknown;
}

export default function AssetPortalShow({ asset }: Props) {
    const [showBorrowForm, setShowBorrowForm] = useState(false);
    const [formData, setFormData] = useState({
        borrower_name: '',
        borrower_employee_id: '',
        borrower_phone: '',
        borrower_email: '',
        borrower_department: '',
        purpose: '',
        requested_start_date: '',
        requested_end_date: '',
        notes: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        router.post(route('portal.borrow.store'), {
            ...formData,
            asset_id: asset.id,
        }, {
            onFinish: () => setIsSubmitting(false),
            onError: () => setIsSubmitting(false),
        });
    };

    return (
        <>
            <Head title={`${asset.name} - SIMAPRO`} />
            
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
                                <span className="text-gray-600 dark:text-gray-300">Asset Details</span>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                <Link
                                    href={route('portal.assets')}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                                >
                                    ← Back to Catalog
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Asset Details */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {asset.name}
                                            </CardTitle>
                                            <p className="text-gray-600 dark:text-gray-300 mt-1">
                                                Asset Code: {asset.asset_code}
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                            ✅ Available
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Image Placeholder */}
                                    <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-lg flex items-center justify-center">
                                        <span className="text-6xl">📦</span>
                                    </div>

                                    {/* Asset Information */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Basic Information</h3>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500 dark:text-gray-400">Category:</span>
                                                    <span className="text-gray-900 dark:text-white">{asset.category.name}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500 dark:text-gray-400">Location:</span>
                                                    <span className="text-gray-900 dark:text-white">{asset.location.name}</span>
                                                </div>
                                                {asset.brand && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500 dark:text-gray-400">Brand:</span>
                                                        <span className="text-gray-900 dark:text-white">{asset.brand}</span>
                                                    </div>
                                                )}
                                                {asset.serial_number && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500 dark:text-gray-400">Serial Number:</span>
                                                        <span className="text-gray-900 dark:text-white">{asset.serial_number}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {(asset.purchase_date || asset.purchase_price || asset.supplier) && (
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Purchase Information</h3>
                                                <div className="space-y-2 text-sm">
                                                    {asset.purchase_date && (
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-500 dark:text-gray-400">Purchase Date:</span>
                                                            <span className="text-gray-900 dark:text-white">{new Date(asset.purchase_date).toLocaleDateString()}</span>
                                                        </div>
                                                    )}
                                                    {asset.purchase_price && (
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-500 dark:text-gray-400">Purchase Price:</span>
                                                            <span className="text-gray-900 dark:text-white">Rp {parseFloat(asset.purchase_price).toLocaleString('id-ID')}</span>
                                                        </div>
                                                    )}
                                                    {asset.supplier && (
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-500 dark:text-gray-400">Supplier:</span>
                                                            <span className="text-gray-900 dark:text-white">{asset.supplier.name}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Description */}
                                    {asset.description && (
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                                            <p className="text-gray-600 dark:text-gray-300">{asset.description}</p>
                                        </div>
                                    )}

                                    {/* Specifications */}
                                    {asset.specifications && (
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Specifications</h3>
                                            <p className="text-gray-600 dark:text-gray-300">{asset.specifications}</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Borrow Request Form */}
                        <div className="lg:col-span-1">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                                        📝 Submit Borrow Request
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {!showBorrowForm ? (
                                        <div className="text-center space-y-4">
                                            <div className="text-4xl">🤝</div>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                Ready to borrow this asset? Fill out the form to submit your request.
                                            </p>
                                            <Button 
                                                onClick={() => setShowBorrowForm(true)}
                                                className="w-full"
                                            >
                                                Start Request
                                            </Button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Full Name *
                                                </label>
                                                <Input
                                                    type="text"
                                                    name="borrower_name"
                                                    value={formData.borrower_name}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Employee ID *
                                                </label>
                                                <Input
                                                    type="text"
                                                    name="borrower_employee_id"
                                                    value={formData.borrower_employee_id}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Phone Number *
                                                </label>
                                                <Input
                                                    type="tel"
                                                    name="borrower_phone"
                                                    value={formData.borrower_phone}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Email
                                                </label>
                                                <Input
                                                    type="email"
                                                    name="borrower_email"
                                                    value={formData.borrower_email}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Department
                                                </label>
                                                <Input
                                                    type="text"
                                                    name="borrower_department"
                                                    value={formData.borrower_department}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Purpose of Borrowing *
                                                </label>
                                                <Textarea
                                                    name="purpose"
                                                    value={formData.purpose}
                                                    onChange={handleInputChange}
                                                    placeholder="Please describe why you need this asset..."
                                                    required
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Start Date *
                                                    </label>
                                                    <Input
                                                        type="date"
                                                        name="requested_start_date"
                                                        value={formData.requested_start_date}
                                                        onChange={handleInputChange}
                                                        min={new Date().toISOString().split('T')[0]}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        End Date *
                                                    </label>
                                                    <Input
                                                        type="date"
                                                        name="requested_end_date"
                                                        value={formData.requested_end_date}
                                                        onChange={handleInputChange}
                                                        min={formData.requested_start_date || new Date().toISOString().split('T')[0]}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Additional Notes
                                                </label>
                                                <Textarea
                                                    name="notes"
                                                    value={formData.notes}
                                                    onChange={handleInputChange}
                                                    placeholder="Any additional information..."
                                                />
                                            </div>

                                            <div className="flex space-x-3">
                                                <Button 
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => setShowBorrowForm(false)}
                                                    className="w-full"
                                                >
                                                    Cancel
                                                </Button>
                                                <Button 
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full"
                                                >
                                                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                                                </Button>
                                            </div>
                                        </form>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}