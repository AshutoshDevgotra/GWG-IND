"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier, signOut, User } from "firebase/auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, LogOut } from "lucide-react";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier | null;
    confirmationResult: any;
  }
}

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [recaptchaReady, setRecaptchaReady] = useState(false); // Track reCAPTCHA readiness

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        setIsAuthDialogOpen(false);
      }
    });

    return () => {
      unsubscribe();
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container", // Attach to a specific container
        {
          size: "normal", // Inline reCAPTCHA
          callback: () => {
            setRecaptchaReady(true);
            toast.success("reCAPTCHA completed!");
          },
          "expired-callback": () => {
            setRecaptchaReady(false);
            toast.error("reCAPTCHA expired. Please try again.");
          },
        }
      );
      window.recaptchaVerifier.render(); // Explicitly render the widget
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      toast.success("Successfully signed in with Google!");
    } catch (error: any) {
      console.error("Error signing in with Google:", error);
      toast.error(error.message || "Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneSignIn = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      setLoading(true);
      setupRecaptcha();
      const formattedPhone = `+91${phoneNumber}`;
      window.confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        window.recaptchaVerifier as RecaptchaVerifier
      );
      toast.success("Verification code sent!");
    } catch (error: any) {
      console.error("Error sending verification code:", error);
      toast.error(error.message || "Failed to send verification code.");
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
      toast.error("Please enter a valid 6-digit verification code.");
      return;
    }

    try {
      setLoading(true);
      if (!window.confirmationResult) {
        throw new Error("No verification code was sent.");
      }
      await window.confirmationResult.confirm(verificationCode);
      toast.success("Successfully signed in!");
      setPhoneNumber("");
      setVerificationCode("");
    } catch (error: any) {
      console.error("Error verifying code:", error);
      toast.error(error.message || "Invalid verification code.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      toast.success("Successfully signed out!");
    } catch (error: any) {
      console.error("Error signing out:", error);
      toast.error(error.message || "Failed to sign out.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {user ? (
        <Button
          variant="outline"
          className="text-black  bg-grey/10 hover:text-black hover:bg-white"
          onClick={handleSignOut}
          disabled={loading}
        >
          <LogOut className="w-4 h-4 mr-2" />
          {loading ? "Signing out..." : "Sign Out"}
        </Button>
      ) : (
        <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="text-black  bg-grey/10 hover:text-black hover:bg-white">
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sign In</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="google">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="google">Google</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
              </TabsList>
              <TabsContent value="google" className="mt-4">
                <Button onClick={handleGoogleSignIn} className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Continue with Google"}
                </Button>
              </TabsContent>
              <TabsContent value="phone" className="mt-4">
                <div className="space-y-4">
                  {!recaptchaReady ? (
                    <>
                      <Input
                        type="tel"
                        placeholder="Enter 10-digit phone number"
                        value={phoneNumber}
                        onChange={(e) =>
                          setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
                        }
                        disabled={loading}
                      />
                      <div id="recaptcha-container" className="recaptcha-container"></div>
                      <Button
                        onClick={handlePhoneSignIn}
                        className="w-full"
                        disabled={loading || phoneNumber.length !== 10}
                      >
                        {loading ? "Sending..." : "Send Code"}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Input
                        type="text"
                        placeholder="Enter 6-digit verification code"
                        value={verificationCode}
                        onChange={(e) =>
                          setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                        }
                        disabled={loading}
                      />
                      <Button
                        onClick={handleVerifyCode}
                        className="w-full"
                        disabled={loading || verificationCode.length !== 6}
                      >
                        {loading ? "Verifying..." : "Verify Code"}
                      </Button>
                    </>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
