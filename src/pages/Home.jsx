import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { ChatData } from "../context/ChatContext";
import { CgProfile } from "react-icons/cg";
import { FaRobot } from "react-icons/fa";
import { LoadingBig, LoadingSmall } from "../components/Loading";
import { IoMdSend } from "react-icons/io";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardHeader, CardContent } from "../components/ui/card";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const {
    fetchResponse,
    messages,
    prompt,
    setPrompt,
    newRequestLoading,
    loading,
    chats,
  } = ChatData();

  const submitHandler = (e) => {
    e.preventDefault();
    fetchResponse();
  };

  const messagecontainerRef = useRef();

  useEffect(() => {
    if (messagecontainerRef.current) {
      messagecontainerRef.current.scrollTo({
        top: messagecontainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 text-gray-800">
      {/* Sidebar - Visible on larger screens, hidden on mobile */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} className="md:flex hidden" />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Hamburger Menu - Mobile view */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-4 bg-white shadow text-2xl"
        >
          <GiHamburgerMenu />
        </button>

        {/* Chat Container */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {loading ? (
            <LoadingBig />
          ) : (
            <Card className="flex flex-col p-4 max-h-[auto] overflow-y-auto shadow-md border-none">
              <CardHeader>
                <h2 className="text-xl font-semibold">Messages</h2>
              </CardHeader>
              <CardContent ref={messagecontainerRef} className="overflow-y-auto">
                {messages?.length > 0 ? (
                  messages.map((e, i) => (
                    <div key={i} className="space-y-3 my-3">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-100 text-gray-900">
                        <div className="bg-blue-600 text-white p-2 rounded-full">
                          <CgProfile size={20} />
                        </div>
                        <span>{e.question}</span>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-200 text-gray-800">
                        <div className="bg-blue-600 text-white p-2 rounded-full">
                          <FaRobot size={20} />
                        </div>
                        <span
                          dangerouslySetInnerHTML={{ __html: e.answer }}
                        ></span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No chat yet</p>
                )}
                {newRequestLoading && <LoadingSmall />}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Chat Input */}
        {chats?.length > 0 && (
          <div className="p-2 bg-white border-t border-gray-200 mb-2">
            <form
              onSubmit={submitHandler}
              className="flex gap-2 items-center flex-col sm:flex-row"
            >
              <Input
                className="flex-grow p-5 bg-gray-100 rounded text-gray-800 placeholder-gray-500 w-full"
                type="text"
                placeholder="Ask something..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
              />
              <Button
                className="p-5 bg-blue-600 hover:bg-blue-700 text-white text-xl w-full sm:w-auto"
                type="submit"
              >
                <IoMdSend />
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
