'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, MessageSquareQuote } from 'lucide-react';
import Link from 'next/link';

export default function PriceAnalysisPage() {
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
              <Link href="/market-prices" className="text-orange-600 hover:text-orange-700">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center gap-3">
                <img 
                  src="/logo.png" 
                  alt="DhartiPutra AI Logo" 
                  className="w-10 h-10 object-contain drop-shadow-lg"
                />
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-green-700 to-orange-600 bg-clip-text text-transparent">Crop Price Assistant</h1>
                  <p className="text-xs text-amber-700 font-medium">Ask your crop pricing questions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl ring-1 ring-orange-100">
          <CardHeader>
            <CardTitle className="text-amber-800 font-bold flex items-center gap-2">
              <MessageSquareQuote className="h-5 w-5" />
              Ask Your Question
            </CardTitle>
            <CardDescription className="text-amber-700">
              Enter your query related to crop prices and market insights.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input 
              placeholder="e.g. What is the price trend of Tomato in Maharashtra?" 
              className="border-orange-200 focus:border-orange-500 focus:ring-orange-200"
            />
            <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg font-semibold w-full">
              Submit Query
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}