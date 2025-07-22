'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, Leaf, Phone, Lock, Globe } from 'lucide-react';
import Link from 'next/link';

const translations = {
  en: {
    tagline: "DhartiPutra AI – An expert in every farmer's pocket.",
    signin: "Sign In",
    signup: "Sign Up",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    password: "Password",
    forgotPassword: "Forgot Password?",
    dontHaveAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    confirmPassword: "Confirm Password",
    confirmPhone: "Confirm Phone Number",
    enterName: "Enter your full name",
    enterPhone: "Enter your phone number",
    enterPassword: "Enter your password",
    selectLanguage: "Select Language"
  },
  hi: {
    tagline: "धरतीपुत्र AI – हर किसान की जेब में एक विशेषज्ञ।",
    signin: "साइन इन",
    signup: "साइन अप",
    fullName: "पूरा नाम",
    phoneNumber: "फ़ोन नंबर",
    password: "पासवर्ड",
    forgotPassword: "पासवर्ड भूल गए?",
    dontHaveAccount: "खाता नहीं है?",
    haveAccount: "पहले से खाता है?",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    confirmPhone: "फ़ोन नंबर की पुष्टि करें",
    enterName: "अपना पूरा नाम डालें",
    enterPhone: "अपना फ़ोन नंबर डालें",
    enterPassword: "अपना पासवर्ड डालें",
    selectLanguage: "भाषा चुनें"
  },
  kn: {
    tagline: "ಧರ್ತೀಪುತ್ರ AI – ಪ್ರತಿ ರೈತನ ಜೇಬಿನಲ್ಲಿ ಒಬ್ಬ ತಜ್ಞ।",
    signin: "ಸೈನ್ ಇನ್",
    signup: "ಸೈನ್ ಅಪ್",
    fullName: "ಪೂರ್ಣ ಹೆಸರು",
    phoneNumber: "ಫೋನ್ ಸಂಖ್ಯೆ",
    password: "ಪಾಸ್‌ವರ್ಡ್",
    forgotPassword: "ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿದ್ದೀರಾ?",
    dontHaveAccount: "ಖಾತೆ ಇಲ್ಲವೇ?",
    haveAccount: "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?",
    confirmPassword: "ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ",
    confirmPhone: "ಫೋನ್ ಸಂಖ್ಯೆ ದೃಢೀಕರಿಸಿ",
    enterName: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು ನಮೂದಿಸಿ",
    enterPhone: "ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ",
    enterPassword: "ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ",
    selectLanguage: "ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ"
  },
  mr: {
    tagline: "धरतीपुत्र AI – प्रत्येक शेतकऱ्याच्या खिशात एक तज्ञ।",
    signin: "साइन इन",
    signup: "साइन अप",
    fullName: "पूर्ण नाव",
    phoneNumber: "फोन नंबर",
    password: "पासवर्ड",
    forgotPassword: "पासवर्ड विसरलात?",
    dontHaveAccount: "खाते नाही आहे?",
    haveAccount: "आधीपासूनच खाते आहे?",
    confirmPassword: "पासवर्डची पुष्टी करा",
    confirmPhone: "फोन नंबरची पुष्टी करा",
    enterName: "तुमचे पूर्ण नाव टाका",
    enterPhone: "तुमचा फोन नंबर टाका",
    enterPassword: "तुमचा पासवर्ड टाका",
    selectLanguage: "भाषा निवडा"
  },
  te: {
    tagline: "ధర్తీపుత్ర AI – ప్రతి రైతు జేబులో ఒక నిపుణుడు।",
    signin: "సైన్ ఇన్",
    signup: "సైన్ అప్",
    fullName: "పూర్తి పేరు",
    phoneNumber: "ఫోన్ నంబర్",
    password: "పాస్‌వర్డ్",
    forgotPassword: "పాస్‌వర్డ్ మర్చిపోయారా?",
    dontHaveAccount: "ఖాతా లేదా?",
    haveAccount: "ఇప్పటికే ఖాతా ఉందా?",
    confirmPassword: "పాస్‌వర్డ్‌ను నిర్ధారించండి",
    confirmPhone: "ఫోన్ నంబర్‌ను నిర్ధారించండి",
    enterName: "మీ పూర్తి పేరు నమోదు చేయండి",
    enterPhone: "మీ ఫోన్ నంబర్ నమోదు చేయండి",
    enterPassword: "మీ పాస్‌వర్డ్ నమోదు చేయండి",
    selectLanguage: "భాషను ఎంచుకోండి"
  },
  ta: {
    tagline: "தர்தீபுத்ர AI – ஒவ்வொரு விவசாயியின் பாக்கெட்டிலும் ஒரு நிபுணர்.",
    signin: "உள்நுழைக",
    signup: "பதிவுசெய்க",
    fullName: "முழு பெயர்",
    phoneNumber: "தொலைபேசி எண்",
    password: "கடவுச்சொல்",
    forgotPassword: "கடவுச்சொல் மறந்துவிட்டதா?",
    dontHaveAccount: "கணக்கு இல்லையா?",
    haveAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
    confirmPassword: "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
    confirmPhone: "தொலைபேசி எண்ணை உறுதிப்படுத்தவும்",
    enterName: "உங்கள் முழு பெயரை உள்ளிடவும்",
    enterPhone: "உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்",
    enterPassword: "உங்கள் கடவுச்சொல்லை உள்ளிடவும்",
    selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்"
  }
};

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [language, setLanguage] = useState<keyof typeof translations>('en');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    confirmPhone: '',
    password: '',
    confirmPassword: ''
  });

  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, redirect to dashboard
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-green-50 relative flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-600 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-20 w-40 h-40 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-amber-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-green-700 rounded-full blur-3xl"></div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-orange-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-md">
        {/* Language Selector */}
        <div className="flex justify-end mb-4">
          <Select value={language} onValueChange={(value: keyof typeof translations) => setLanguage(value)}>
            <SelectTrigger className="w-48 bg-white/90 backdrop-blur-sm border-orange-200 shadow-lg">
              <Globe className="h-4 w-4 mr-2" />
              <SelectValue placeholder={t.selectLanguage} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिन्दी</SelectItem>
              <SelectItem value="kn">ಕನ್ನಡ</SelectItem>
              <SelectItem value="mr">मराठी</SelectItem>
              <SelectItem value="te">తెలుగు</SelectItem>
              <SelectItem value="ta">தமிழ்</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Logo and Tagline */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-4">
            <img 
              src="/logo.png" 
              alt="DhartiPutra AI Logo" 
              className="w-50 h-50 object-contain drop-shadow-2xl"
            />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-700 via-orange-600 to-amber-700 bg-clip-text text-transparent mb-2">DhartiPutra AI</h1>
          <p className="text-sm text-amber-700 max-w-xs mx-auto leading-relaxed font-medium">
            {t.tagline}
          </p>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 ring-1 ring-orange-100">
          <CardHeader>
            <CardTitle className="text-2xl text-center bg-gradient-to-r from-green-700 to-orange-600 bg-clip-text text-transparent">
              {isSignup ? t.signup : t.signin}
            </CardTitle>
            <CardDescription className="text-center text-amber-700">
              {isSignup ? "Create your account to get started" : "Welcome back to your farming assistant"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignup && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-amber-800 font-medium">{t.fullName}</Label>
                  <div className="relative">
                    <Input
                      id="name"
                      type="text"
                      placeholder={t.enterName}
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="border-orange-200 focus:border-orange-500 focus:ring-orange-200"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-amber-800 font-medium">{t.phoneNumber}</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t.enterPhone}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="pl-10 border-orange-200 focus:border-orange-500 focus:ring-orange-200"
                    required
                  />
                </div>
              </div>

              {isSignup && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPhone" className="text-amber-800 font-medium">{t.confirmPhone}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                    <Input
                      id="confirmPhone"
                      type="tel"
                      placeholder={t.confirmPhone}
                      value={formData.confirmPhone}
                      onChange={(e) => setFormData({...formData, confirmPhone: e.target.value})}
                      className="pl-10 border-orange-200 focus:border-orange-500 focus:ring-orange-200"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password" className="text-amber-800 font-medium">{t.password}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t.enterPassword}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="pl-10 pr-10 border-orange-200 focus:border-orange-500 focus:ring-orange-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-orange-500 hover:text-orange-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {isSignup && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-amber-800 font-medium">{t.confirmPassword}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={t.confirmPassword}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                     className="pl-10 pr-10 border-orange-200 focus:border-orange-500 focus:ring-orange-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-green-500 hover:text-green-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-green-600 via-orange-500 to-amber-600 hover:from-green-700 hover:via-orange-600 hover:to-amber-700 text-white shadow-xl font-semibold"
                size="lg"
              >
                {isSignup ? t.signup : t.signin}
              </Button>

              {!isSignup && (
                <div className="text-center">
                 <Link href="/forgot-password" className="text-sm text-orange-600 hover:text-orange-700 underline font-medium">
                    {t.forgotPassword}
                  </Link>
                </div>
              )}

              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => setIsSignup(!isSignup)}
                  className="text-sm text-amber-700 hover:text-amber-800"
                >
                  {isSignup ? t.haveAccount : t.dontHaveAccount}
                  <span className="ml-1 underline font-semibold text-orange-600">
                    {isSignup ? t.signin : t.signup}
                  </span>
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}