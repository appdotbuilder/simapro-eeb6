import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Asset {
    id: number;
    asset_code: string;
    name: string;
    description: string | null;
    photos: string[] | null;
    brand: string | null;
    status: string;
    category: {
        id: number;
        name: string;
    };
    location: {
        id: number;
        name: string;
    };
}

interface Category {
    id: number;
    name: string;
}

interface Location {
    id: number;
    name: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
}

interface Props {
    assets: {
        data: Asset[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    categories: Category[];
    locations: Location[];
    filters: {
        search?: string;
        category?: string;
        location?: string;
    };
    [key: string]: unknown;
}

export default function AssetPortalIndex({ assets, categories, locations, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
    const [selectedLocation, setSelectedLocation] = useState(filters.location || '');

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        if (selectedCategory) params.append('category', selectedCategory);
        if (selectedLocation) params.append('location', selectedLocation);
        
        router.get(route('portal.assets'), Object.fromEntries(params));
    };

    const handleReset = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setSelectedLocation('');
        router.get(route('portal.assets'));
    };

    return (
        <>
            <Head title="Browse Assets - SIMAPRO" />
            
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
                                <span className="text-gray-600 dark:text-gray-300">Asset Catalog</span>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                <Link
                                    href={route('portal.my-borrowings')}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    📋 My Borrowings
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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            🔍 Browse Available Assets
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Find the perfect asset for your needs. Click on any item to view details and submit a borrowing request.
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="md:col-span-2">
                                <Input
                                    type="text"
                                    placeholder="Search assets by name, code, or brand..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Categories" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All Categories</SelectItem>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Locations" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All Locations</SelectItem>
                                        {locations.map((location) => (
                                            <SelectItem key={location.id} value={location.id.toString()}>
                                                {location.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Showing {assets.data.length} of {assets.meta.total} available assets
                            </p>
                            <div className="flex space-x-2">
                                <Button variant="outline" onClick={handleReset}>
                                    Clear Filters
                                </Button>
                                <Button onClick={handleSearch}>
                                    Search
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Assets Grid */}
                    {assets.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                                {assets.data.map((asset) => (
                                    <Link
                                        key={asset.id}
                                        href={route('portal.assets.show', asset.id)}
                                        className="block group"
                                    >
                                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-200 dark:border-gray-700 overflow-hidden">
                                            {/* Image Placeholder */}
                                            <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center">
                                                <span className="text-4xl">📦</span>
                                            </div>
                                            
                                            <div className="p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
                                                        {asset.name}
                                                    </h3>
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 ml-2">
                                                        ✅ Available
                                                    </span>
                                                </div>
                                                
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                                    {asset.asset_code}
                                                </p>
                                                
                                                {asset.brand && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                                        Brand: {asset.brand}
                                                    </p>
                                                )}
                                                
                                                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                                                    <span>📂 {asset.category.name}</span>
                                                    <span>📍 {asset.location.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            {assets.meta.last_page > 1 && (
                                <div className="flex justify-center">
                                    <div className="flex space-x-2">
                                        {assets.links.map((link: PaginationLink, index: number) => (
                                            <Button
                                                key={index}
                                                variant={link.active ? "default" : "outline"}
                                                disabled={!link.url}
                                                onClick={() => link.url && router.get(link.url)}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">😔</div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                No assets found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Try adjusting your search criteria or check back later.
                            </p>
                            <Button onClick={handleReset}>
                                Clear all filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}