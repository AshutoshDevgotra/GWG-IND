"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier, signOut, User, PhoneAuthProvider } from 'firebase/auth';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, LogOut } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
    recaptchaVerifier: RecaptchaVerifier | null;
    confirmationResult: any;
  }
}

const services = [
  {
    title: "E-commerce Web Development",
    description: "Custom e-commerce solutions with modern tech stack, seamless payment integration, and responsive design",
    price: "35000",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=400&h=250"
  },
  {
    title: "Custom Website Development",
    description: "Bespoke website development tailored to your brand with cutting-edge technologies and SEO optimization",
    price: "25000",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400&h=250"
  },
  {
    title: "UX Design Services",
    description: "User-centered design solutions with research, wireframing, prototyping, and usability testing",
    price: "20000",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=400&h=250"
  },
  {
    title: "Graphic Design",
    description: "Professional graphic design services for branding, marketing materials, and digital assets",
    price: "15000",
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80&w=400&h=250"
  },
  {
    title: "Complete Marketing Package",
    description: "Comprehensive marketing solution including email, WhatsApp, and social media with AI content creators",
    price: "10000",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=400&h=250"
  },
  {
    title: "Video Editing",
    description: "Professional video editing services for social media, marketing, and promotional content",
    price: "8000",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=400&h=250"
  },
  {
    title: "Thumbnail Design",
    description: "Eye-catching thumbnail designs for YouTube, social media, and digital content",
    price: "2000",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=400&h=250"
  },
  {
    title: "Legal Services Package",
    description: "Complete legal services including GST registration, trademark filing, and legal documentation",
    price: "15000",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400&h=250"
  }
];

export default function ServicesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  useEffect(() => {
    const loadRazorpay = async () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    };
    loadRazorpay();

    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        setIsAuthDialogOpen(false);
      }
    });

    // Cleanup
    return () => {
      unsubscribe();
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      toast.success('Successfully signed in with Google!');
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      toast.error(error.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const setupRecaptcha = () => {
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: () => {
            // Callback when reCAPTCHA is ready
          },
          'expired-callback': () => {
            toast.error('reCAPTCHA expired. Please try again.');
          }
        });
      }
    } catch (error) {
      console.error('Error setting up reCAPTCHA:', error);
      toast.error('Failed to set up verification. Please try again.');
    }
  };

  const handlePhoneSignIn = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    try {
      setLoading(true);
      setupRecaptcha();
      const formattedPhone = `+91${phoneNumber}`; // Assuming Indian phone numbers
      window.confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        window.recaptchaVerifier as RecaptchaVerifier
      );
      toast.success('Verification code sent!');
    } catch (error: any) {
      console.error('Error sending verification code:', error);
      toast.error(error.message || 'Failed to send verification code');
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error('Please enter a valid 6-digit verification code');
      return;
    }

    try {
      setLoading(true);
      if (!window.confirmationResult) {
        throw new Error('No verification code was sent');
      }
      await window.confirmationResult.confirm(verificationCode);
      toast.success('Successfully signed in!');
      setPhoneNumber('');
      setVerificationCode('');
    } catch (error: any) {
      console.error('Error verifying code:', error);
      toast.error(error.message || 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      toast.success('Successfully signed out!');
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast.error(error.message || 'Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (service: typeof services[0]) => {
    if (!user) {
      toast.error('Please sign in to purchase services');
      setIsAuthDialogOpen(true);
      return;
    }

    if (typeof window === 'undefined' || !window.Razorpay) {
      toast.error('Payment system is loading. Please try again in a moment.');
      return;
    }

    try {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: parseInt(service.price) * 100,
        currency: "INR",
        name: "GwG",
        description: `${service.title} Service`,
        handler: function(response: any) {
          toast.success("Payment successful! Payment ID: " + response.razorpay_payment_id);
        },
        prefill: {
          name: user.displayName || "",
          email: user.email || "",
          contact: user.phoneNumber || ""
        },
        theme: {
          color: "#000000"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      console.error('Error initializing Razorpay:', error);
      toast.error(error.message || 'Failed to initialize payment. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary pt-24 pb-32 mb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-black mb-4">
              Our Services
            </h1>
            <p className="text-xl text-black/80 max-w-2xl mx-auto">
              Comprehensive solutions to elevate your business and brand presence
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden bg-white">
              <div 
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${service.image})` }}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">₹{service.price}</span>
                  <Button 
                    onClick={() => handlePayment(service)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us for personalized service packages tailored to your specific needs
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Contact Sales
          </Button>
        </div>
      </div>

      {/* Recaptcha Container */}
      <div id="recaptcha-container"></div>
    </div>
  );
}