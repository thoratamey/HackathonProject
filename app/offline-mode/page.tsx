'use client';
import { ArrowLeft, Wifi } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function OfflineModePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Link href="/dashboard" className="text-green-600 hover:text-green-700">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full shadow-md">
                <Wifi className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-green-800">Offline Mode</h1>
                <p className="text-xs text-green-600">Access stored insights</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-green-800">Coming Soon</CardTitle>
            <CardDescription className="text-green-600">
              Access stored insights and data without internet connection.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="py-12">
              <Wifi className="h-24 w-24 text-green-400 mx-auto mb-4" />
              <p className="text-gray-600">Offline mode will be available soon!</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}