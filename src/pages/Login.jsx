import React, { useState } from "react";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Loading";

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

// Icons
import { LogIn, Bot, Mail } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const { loginUser, btnLoading } = UserData();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(email, navigate);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Left side: Login Card */}
      <div className="flex justify-center items-center w-full md:w-1/2 bg-gradient-to-br from-slate-50 to-indigo-50 p-6">
        <Card className="w-full max-w-md p-6 shadow-lg border-slate-200 bg-white">
          <CardHeader className="space-y-2 pb-6">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <Bot className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to AI Chat
            </CardTitle>
            <CardDescription className="text-center text-slate-500">
              Enter your email to access your personalized AI assistant.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitHandler} className="space-y-6">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="email" className="text-slate-700">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 border-slate-200 focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pt-2">
            <Button
              variant="default"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2 shadow-md disabled:opacity-70"
              disabled={btnLoading || !email.trim()}
              onClick={submitHandler}
            >
              {btnLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </>
              )}
            </Button>
            
            <p className="text-xs text-center text-slate-500 mt-4">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Right side: Image with Overlay (Only visible on md+ screens) */}
      <div className="hidden md:block w-1/2 h-full relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 to-purple-900/70 z-10"></div>
        <img
          src="image1.jpeg"
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center z-20 p-12">
          <h2 className="text-4xl font-bold text-white mb-6">Experience Smart Conversations</h2>
          <p className="text-lg text-indigo-100 text-center max-w-lg">
            Connect with our advanced AI assistant to get answers, solve problems, and discover new insights through natural conversations.
          </p>
          <div className="flex gap-3 mt-10">
            <div className="h-3 w-3 rounded-full bg-white opacity-70"></div>
            <div className="h-3 w-3 rounded-full bg-white"></div>
            <div className="h-3 w-3 rounded-full bg-white opacity-70"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;