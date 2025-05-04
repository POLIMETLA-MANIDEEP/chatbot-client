import React, { useState } from "react";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Loading";
import { ChatData } from "../context/ChatContext";

// ShadCN imports
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Alert, AlertDescription } from "../components/ui/alert";

// Icons
import { KeyRound, ArrowLeft, ShieldCheck, RefreshCw } from "lucide-react";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const { verifyUser, btnLoading } = UserData();
  const { fetchChats } = ChatData();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    verifyUser(Number(otp), navigate, fetchChats);
  };

  const goBack = () => {
    navigate("/login"); // Navigates to the login page
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Left Side: OTP Verification Card */}
      <div className="flex justify-center items-center w-full md:w-1/2 bg-gradient-to-br from-slate-50 to-indigo-50 p-6">
        <Card className="w-full max-w-md p-6 shadow-lg border-slate-200 bg-white">
          <CardHeader className="space-y-3 pb-6">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <ShieldCheck className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Verify Your Account
            </CardTitle>
            <CardDescription className="text-center text-slate-500">
              We've sent a one-time password to your email address.
            </CardDescription>
            
            <Alert className="bg-indigo-50 border-indigo-100 text-indigo-800">
              <RefreshCw className="h-4 w-4 text-indigo-500 mr-2" />
              <AlertDescription className="text-sm font-medium">
                Please refresh the page after successful verification.
              </AlertDescription>
            </Alert>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitHandler} className="space-y-6">
              <div className="grid w-full gap-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="otp" className="text-slate-700">One-Time Password</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      maxLength="6"
                      className="pl-10 border-slate-200 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 text-lg tracking-wider text-center font-medium"
                    />
                  </div>
                  <p className="text-xs text-slate-500 text-center mt-1">
                    The OTP will expire in 10 minutes
                  </p>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 pt-2">
            <Button
              variant="default"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2 shadow-md disabled:opacity-70"
              disabled={btnLoading || otp.length !== 6}
              onClick={submitHandler}
            >
              {btnLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <ShieldCheck className="mr-2 h-4 w-4" /> Verify OTP
                </>
              )}
            </Button>

            {/* Back Button */}
            <Button
              variant="outline"
              className="w-full border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-800"
              onClick={goBack}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Right side: Image with Overlay (Only visible on md+ screens) */}
      <div className="hidden md:block w-1/2 h-full relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 to-purple-900/70 z-10"></div>
        <img
          src="image2.jpeg"
          alt="OTP Illustration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center z-20 p-12">
          <h2 className="text-4xl font-bold text-white mb-6">Almost There!</h2>
          <p className="text-lg text-indigo-100 text-center max-w-lg">
            We're keeping your account secure with two-factor authentication. Enter the code we sent to your email to access your AI assistant.
          </p>
          <div className="flex gap-3 mt-10">
            <div className="h-3 w-3 rounded-full bg-white opacity-70"></div>
            <div className="h-3 w-3 rounded-full bg-white opacity-70"></div>
            <div className="h-3 w-3 rounded-full bg-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;