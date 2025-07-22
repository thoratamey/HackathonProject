'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  MapPin, 
  TrendingUp, 
  FileText, 
  CloudRain, 
  Users, 
  MessageCircle, 
  Smartphone, 
  Wifi,
  Leaf,
  User,
  Bell,
  Settings,
  LogOut
} from 'lucide-react';
import Link from 'next/link';

const dashboardModules = [
  {
    id: 'crop-disease',
    title: 'Crop Disease Diagnosis',
    description: 'Take a photo of affected leaves for instant diagnosis',
    icon: Camera,
    color: 'bg-red-500',
    href: '/crop-disease'
  },
  {
    id: 'soil-analysis',
    title: 'Soil Analysis',
    description: 'Upload soil images with GPS tracking for analysis',
    icon: MapPin,
    color: 'bg-brown-500',
    href: '/soil-analysis'
  },
  {
    id: 'market-prices',
    title: 'Market Prices',
    description: 'Get real-time crop prices and market trends',
    icon: TrendingUp,
    color: 'bg-green-600',
    href: '/market-prices',
    active: true
  },
  {
    id: 'government-schemes',
    title: 'Government Schemes',
    description: 'Find subsidies and government support programs',
    icon: FileText,
    color: 'bg-blue-500',
    href: '/government-schemes'
  },
  {
    id: 'weather-updates',
    title: 'Weather Updates',
    description: 'Get weather forecasts and rainfall alerts',
    icon: CloudRain,
    color: 'bg-sky-500',
    href: '/weather-updates'
  },
  {
    id: 'community-discussion',
    title: 'Community Discussion',
    description: 'Connect and chat with fellow farmers',
    icon: Users,
    color: 'bg-purple-500',
    href: '/community'
  },
  {
    id: 'ai-assistant',
    title: 'AI Assistant Chat',
    description: 'Ask questions about farming and crops',
    icon: MessageCircle,
    color: 'bg-orange-500',
    href: '/ai-assistant'
  },
  {
    id: 'whatsapp-setup',
    title: 'WhatsApp Setup',
    description: 'Get alerts and chat via WhatsApp',
    icon: Smartphone,
    color: 'bg-green-500',
    href: '/whatsapp-setup'
  },
  {
    id: 'offline-mode',
    title: 'Offline Mode',
    description: 'Access stored insights without internet',
    icon: Wifi,
    color: 'bg-gray-500',
    href: '/offline-mode'
  }
];

export default function DashboardPage() {
  const [user] = useState({ name: 'Ravi Kumar', phone: '+91 98765 43210' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-green-50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 bg-green-600 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-32 w-48 h-48 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-1/3 w-44 h-44 bg-amber-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-36 h-36 bg-green-700 rounded-full blur-3xl"></div>
      </div>
      
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-orange-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="DhartiPutra AI Logo" 
                className="w-12 h-12 object-contain drop-shadow-lg"
              />
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-green-700 via-orange-600 to-amber-700 bg-clip-text text-transparent">DhartiPutra AI</h1>
                <p className="text-xs text-amber-700 hidden sm:block font-medium">Farming Assistant</p>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-amber-700 hover:text-amber-800 hover:bg-orange-50">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-amber-700 hover:text-amber-800 hover:bg-orange-50">
                <Settings className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2 bg-gradient-to-r from-orange-100 to-amber-100 px-3 py-1 rounded-full shadow-sm">
                <User className="h-4 w-4 text-amber-700" />
                <span className="text-sm text-amber-800 hidden sm:inline font-medium">{user.name}</span>
              </div>
              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-700 via-orange-600 to-amber-700 bg-clip-text text-transparent mb-2">Welcome back, {user.name}!</h2>
          <p className="text-amber-700 font-medium">Choose a service to get started with your farming assistant</p>
        </div>

        {/* Dashboard Modules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardModules.map((module) => {
            const IconComponent = module.icon;
            return (
              <Link key={module.id} href={module.href}>
                <Card className="bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 cursor-pointer group ring-1 ring-orange-100 hover:ring-orange-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className={`inline-flex items-center justify-center w-12 h-12 ${module.color} rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      {module.active && (
                        <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-orange-100 text-green-700 text-xs font-semibold">
                          Active Development
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg text-amber-800 group-hover:text-amber-900 font-bold">
                      {module.title}
                    </CardTitle>
                    <CardDescription className="text-amber-700 text-sm leading-relaxed">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-orange-600 text-sm font-semibold group-hover:text-orange-700">
                      Get Started
                      <svg 
                        className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-semibold">Active Crops</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <Leaf className="h-10 w-10 text-green-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-semibold">Weather Alerts</p>
                  <p className="text-3xl font-bold">3</p>
                </div>
                <CloudRain className="h-10 w-10 text-orange-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-500 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm font-semibold">Community Posts</p>
                  <p className="text-3xl font-bold">45</p>
                </div>
                <Users className="h-10 w-10 text-amber-200" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}