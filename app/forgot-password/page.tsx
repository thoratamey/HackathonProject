'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Phone, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [phone, setPhone] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [phoneFound, setPhoneFound] = useState<boolean | null>(null);
  const [showResetForm, setShowResetForm] = useState(false);

  const handlePhoneCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChecking(true);
    
    // Simulate API call to check phone number
    setTimeout(() => {
      // For demo purposes, let's say phone exists if it contains '999'
      const exists = phone.includes('999');
      setPhoneFound(exists);
      setIsChecking(false);
      if (exists) {
        setShowResetForm(true);
      }
    }, 2000);
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic here
    alert('Password reset link sent to your phone!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-green-50 relative flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-600 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-20 w-40 h-40 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-amber-600 rounded-full blur-3xl"></div>
      </div>
      
      <div className="w-full max-w-md">
        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 ring-1 ring-orange-100">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-orange-600 hover:text-orange-700">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <CardTitle className="text-2xl bg-gradient-to-r from-green-700 to-orange-600 bg-clip-text text-transparent">Reset Password</CardTitle>
                <CardDescription className="text-amber-700 font-medium">
                  Enter your phone number to reset your password
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {!showResetForm ? (
              <form onSubmit={handlePhoneCheck} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-amber-800 font-medium">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your registered phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 border-orange-200 focus:border-orange-500 focus:ring-orange-200"
                      required
                      disabled={isChecking}
                    />
                  </div>
                </div>

                {phoneFound !== null && (
                  <Alert className={phoneFound ? "border-green-200 bg-green-50 shadow-sm" : "border-red-200 bg-red-50 shadow-sm"}>
                    <div className="flex items-center gap-2">
                      {phoneFound ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <AlertDescription className={phoneFound ? "text-green-700" : "text-red-700"}>
                        {phoneFound 
                          ? "Phone number found in our database. You can proceed to reset your password."
                          : "No account found with this phone number. Please check and try again."
                        }
                      </AlertDescription>
                    </div>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-green-600 via-orange-500 to-amber-600 hover:from-green-700 hover:via-orange-600 hover:to-amber-700 text-white shadow-xl font-semibold"
                  size="lg"
                  disabled={isChecking}
                >
                  {isChecking ? 'Checking...' : 'Check Phone Number'}
                </Button>
              </form>
            ) : (
              <form onSubmit={handlePasswordReset} className="space-y-4">
                <Alert className="border-green-200 bg-green-50 shadow-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700 font-medium">
                    Phone number verified: {phone}
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <p className="text-sm text-amber-700 font-medium">
                    Click the button below to receive a password reset link via SMS to your registered phone number.
                  </p>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-green-600 via-orange-500 to-amber-600 hover:from-green-700 hover:via-orange-600 hover:to-amber-700 text-white shadow-xl font-semibold"
                    size="lg"
                  >
                    Send Reset Link
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowResetForm(false);
                      setPhoneFound(null);
                      setPhone('');
                    }}
                    className="w-full border-orange-300 text-orange-700 hover:bg-orange-50 font-medium"
                  >
                    Try Different Number
                  </Button>
                </div>
              </form>
            )}

            <div className="text-center pt-4">
              <Link href="/" className="text-sm text-orange-600 hover:text-orange-700 underline font-medium">
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}