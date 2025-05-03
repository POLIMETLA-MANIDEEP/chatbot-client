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
import { ChatData } from "../context/ChatContext";

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
      <div className="flex justify-center items-center w-full md:w-1/2 bg-white p-4">
        <Card className="w-full max-w-sm p-6 shadow-lg border border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Verify OTP
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Enter the OTP sent to your email to verify your identity.
            </CardDescription>
            <CardDescription className="text-sm text-red-500 font-semibold">
              Refresh the Page Once after Logged In..!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitHandler}>
              <div className="grid w-full gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="otp" className="text-gray-700">OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    maxLength="6"
                    className="focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              variant="ghost"
              className="w-full bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:text-gray-100 disabled:cursor-not-allowed"
              disabled={btnLoading}
              onClick={submitHandler}
            >
              {btnLoading ? <LoadingSpinner /> : "Verify"}
            </Button>

            {/* Back Button */}
            <Button
              variant="destructive"
              className="w-full bg-gray-300 text-black hover:bg-gray-400 focus:ring-2 focus:ring-gray-500"
              onClick={goBack}
            >
              Back to Login
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="hidden md:flex w-1/2 h-full">
        <img
          src="image2.jpeg"
          alt="OTP Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Verify;
