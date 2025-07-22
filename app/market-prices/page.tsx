'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Search,
  TrendingUp,
  TrendingDown,
  MapPin,
  Calendar,
  BarChart3,
  Leaf,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';

const marketData = [
  {
    crop: 'Tomato',
    hindiName: 'टमाटर',
    price: 45,
    unit: 'per kg',
    change: 12.5,
    market: 'Delhi Azadpur',
    lastUpdated: '2 hours ago',
    quality: 'Grade A'
  },
  {
    crop: 'Onion',
    hindiName: 'प्याज़',
    price: 28,
    unit: 'per kg',
    change: -8.2,
    market: 'Mumbai APMC',
    lastUpdated: '1 hour ago',
    quality: 'Grade A'
  },
  {
    crop: 'Wheat',
    hindiName: 'गेहूं',
    price: 2150,
    unit: 'per quintal',
    change: 5.3,
    market: 'Punjab Mandi',
    lastUpdated: '3 hours ago',
    quality: 'Grade B'
  },
  {
    crop: 'Rice',
    hindiName: 'चावल',
    price: 3200,
    unit: 'per quintal',
    change: 2.1,
    market: 'UP Meerut',
    lastUpdated: '1 hour ago',
    quality: 'Grade A'
  },
  {
    crop: 'Potato',
    hindiName: 'आलू',
    price: 18,
    unit: 'per kg',
    change: -15.2,
    market: 'West Bengal',
    lastUpdated: '4 hours ago',
    quality: 'Grade B'
  },
  {
    crop: 'Sugarcane',
    hindiName: 'गन्ना',
    price: 350,
    unit: 'per quintal',
    change: 1.8,
    market: 'UP Lucknow',
    lastUpdated: '2 hours ago',
    quality: 'Grade A'
  }
];

export default function MarketPricesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const filteredData = marketData.filter(item => 
    item.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.hindiName.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-green-50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 bg-green-600 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-32 w-48 h-48 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-1/3 w-44 h-44 bg-amber-600 rounded-full blur-3xl"></div>
      </div>
      
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-orange-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-orange-600 hover:text-orange-700">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center gap-3">
                <img 
                  src="/logo.png" 
                  alt="DhartiPutra AI Logo" 
                  className="w-10 h-10 object-contain drop-shadow-lg"
                />
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-green-700 to-orange-600 bg-clip-text text-transparent">Market Prices</h1>
                  <p className="text-xs text-amber-700 font-medium">Real-time crop pricing</p>
                </div>
              </div>
            </div>
            <Button 
              onClick={handleRefresh} 
              disabled={isRefreshing}
              className="bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 text-white shadow-lg"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
              <Input
                placeholder="Search crops... (e.g., Tomato, टमाटर)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-orange-200 focus:border-orange-500 focus:ring-orange-200"
              />
            </div>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-full sm:w-48 border-orange-200">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delhi">Delhi</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="punjab">Punjab</SelectItem>
                <SelectItem value="up">Uttar Pradesh</SelectItem>
                <SelectItem value="wb">West Bengal</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger className="w-full sm:w-48 border-orange-200">
                <SelectValue placeholder="Select Crop" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="grains">Grains</SelectItem>
                <SelectItem value="fruits">Fruits</SelectItem>
                <SelectItem value="cash-crops">Cash Crops</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Market Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-green-600 to-emerald-500 text-white border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-semibold">Markets Active</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <BarChart3 className="h-6 w-6 text-green-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-600 to-amber-500 text-white border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-semibold">Crops Tracked</p>
                  <p className="text-2xl font-bold">89</p>
                </div>
                <Leaf className="h-6 w-6 text-orange-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-amber-600 to-yellow-500 text-white border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm font-semibold">Price Alerts</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <TrendingUp className="h-6 w-6 text-amber-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-700 to-green-500 text-white border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-semibold">Last Update</p>
                  <p className="text-lg font-bold">1 hr ago</p>
                </div>
                <Calendar className="h-6 w-6 text-green-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Prices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item, index) => (
            <Card key={index} className="bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 border-0 ring-1 ring-orange-100 hover:ring-orange-200">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg text-amber-800 flex items-center gap-2 font-bold">
                      {item.crop}
                      <span className="text-sm text-gray-600">({item.hindiName})</span>
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="h-3 w-3 text-orange-600" />
                      <CardDescription className="text-amber-700 text-sm font-medium">
                        {item.market}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={item.quality === 'Grade A' ? 'border-green-500 text-green-700 font-semibold' : 'border-orange-500 text-orange-700 font-semibold'}
                  >
                    {item.quality}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-amber-800">₹{item.price}</p>
                      <p className="text-sm text-amber-600 font-medium">{item.unit}</p>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
                      item.change > 0 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {item.change > 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {Math.abs(item.change)}%
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Last updated</span>
                    <span>{item.lastUpdated}</span>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 text-white shadow-lg font-semibold">
                    View Details & Trends
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Price Alert Setup */}
        <Card className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border-orange-200 shadow-lg ring-1 ring-orange-100">
          <CardHeader>
            <CardTitle className="text-amber-800 flex items-center gap-2 font-bold">
              <TrendingUp className="h-5 w-5" />
              Set Price Alerts
            </CardTitle>
            <CardDescription className="text-amber-700 font-medium">
              Get notified when crop prices reach your target levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select>
                <SelectTrigger className="border-orange-200 focus:border-orange-500">
                  <SelectValue placeholder="Select Crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tomato">Tomato</SelectItem>
                  <SelectItem value="onion">Onion</SelectItem>
                  <SelectItem value="potato">Potato</SelectItem>
                </SelectContent>
              </Select>
              <Input 
                placeholder="Target price (₹)" 
                className="border-orange-200 focus:border-orange-500 focus:ring-orange-200"
              />
              <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg font-semibold">
                Set Alert
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}