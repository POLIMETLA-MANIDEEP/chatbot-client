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
      <div className="flex justify-center items-center w-full md:w-1/2 bg-white p-4">
        <Card className="w-full max-w-sm p-6 shadow-md">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your email to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitHandler}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="ghost"
              className="w-full bg-blue-600 text-white disabled:text-gray-500 disabled:cursor-not-allowed"
              disabled={btnLoading}
              onClick={submitHandler}
            >
              {btnLoading ? <LoadingSpinner /> : "Submit"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Right side: Image (Only visible on md+ screens) */}
      <div className="hidden md:flex w-1/2 h-full">
        <img
          src="image1.jpeg"
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
