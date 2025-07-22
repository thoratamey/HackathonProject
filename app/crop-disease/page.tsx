'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Camera, Upload, Leaf } from 'lucide-react';
import Link from 'next/link';

export default function CropDiseasePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Link href="/dashboard" className="text-green-600 hover:text-green-700">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-md">
                <Camera className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-green-800">Crop Disease Diagnosis</h1>
                <p className="text-xs text-green-600">AI-powered plant disease detection</p>
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
              This feature is under development. Take photos of affected leaves for instant AI diagnosis.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="py-12">
              <Camera className="h-24 w-24 text-green-400 mx-auto mb-4" />
              <p className="text-gray-600">AI-powered crop disease diagnosis will be available soon!</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}