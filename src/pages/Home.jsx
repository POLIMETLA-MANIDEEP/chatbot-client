import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { ChatData } from "../context/ChatContext";
import { LoadingBig, LoadingSmall } from "../components/Loading";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { ScrollArea } from "../components/ui/scroll-area";
import { Sheet, SheetContent } from "../components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../components/ui/alert-dialog";

// Icons
import { Menu, Send, PanelLeftOpen, Bot, User } from "lucide-react";

const Home = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
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
    if (!prompt.trim()) return;
    fetchResponse();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitHandler(e);
    }
  };

  const messageContainerRef = useRef();

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleSheet = (state) => {
    setIsSheetOpen(state);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-80 border-r shrink-0 shadow-md">
        <Sidebar onToggle={toggleSheet} />
      </div>

      {/* Mobile Sidebar with Sheet */}
      {/* Mobile menu button - outside Sheet to avoid rendering issues */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="fixed top-4 left-4 z-40 md:hidden bg-white shadow-md hover:bg-indigo-50"
        onClick={() => toggleSheet(true)}
      >
        <Menu className="h-5 w-5 text-indigo-600" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      
      <Sheet open={isSheetOpen} onOpenChange={toggleSheet}>
        <SheetContent side="left" className="p-0 w-80 border-r">
          <Sidebar onToggle={toggleSheet} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b px-6 flex items-center justify-between sticky top-0 bg-white shadow-sm z-10">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden text-indigo-600 hover:bg-indigo-50">
              <PanelLeftOpen className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Chat Assistant
            </h1>
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                  {chats?.length || 0} Active Chats
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-slate-800 text-white border-slate-700">
                <p>Your active conversation threads</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </header>

        {/* Chat Area */}
        <main className="flex-1 overflow-hidden p-4 md:p-6">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <LoadingBig />
            </div>
          ) : (
            <Card className="h-full flex flex-col bg-white border-slate-200 shadow-md overflow-hidden">
              <ScrollArea className="flex-1 p-4 md:p-6" ref={messageContainerRef}>
                {messages?.length > 0 ? (
                  <div className="space-y-8">
                    {messages.map((message, i) => (
                      <div key={i} className="space-y-6">
                        {/* User Message */}
                        <div className="flex items-start gap-3 justify-end">
                          <div className="bg-indigo-50 p-3 rounded-lg rounded-tr-none max-w-[85%] shadow-sm">
                            <p className="text-slate-800">{message.question}</p>
                          </div>
                          <Avatar className="mt-0.5">
                            <AvatarFallback className="bg-indigo-600 text-white">
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                            <AvatarImage src="/user-avatar.png" alt="User" />
                          </Avatar>
                        </div>

                        {/* AI Message */}
                        <div className="flex items-start gap-3">
                          <Avatar className="mt-0.5">
                            <AvatarFallback className="bg-purple-600 text-white">
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                            <AvatarImage src="/bot-avatar.png" alt="AI" />
                          </Avatar>
                          <div className="bg-gradient-to-br from-white to-purple-50 p-4 rounded-lg rounded-tl-none max-w-[85%] border border-purple-100 shadow-sm">
                            <div 
                              className="text-slate-800 prose prose-sm max-w-none prose-headings:text-indigo-700 prose-a:text-purple-600 prose-strong:text-indigo-700"
                              dangerouslySetInnerHTML={{ __html: message.answer }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4">
                    <div className="p-6 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 mb-6">
                      <Bot className="h-16 w-16 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-medium mb-3 text-slate-800">Welcome to AI Chat</h2>
                    <p className="text-slate-500 max-w-md">
                      Start a conversation with the AI assistant. Ask questions or request information on any topic.
                    </p>
                  </div>
                )}
                {newRequestLoading && (
                  <div className="py-4 flex justify-center">
                    <LoadingSmall />
                  </div>
                )}
              </ScrollArea>

              {/* Chat Input */}
              {chats?.length > 0 && (
                <div className="p-4 border-t bg-slate-50">
                  <form
                    onSubmit={submitHandler}
                    className="flex items-center gap-2"
                  >
                    <Input
                      className="flex-1 border-slate-300 focus-visible:ring-indigo-500 bg-white placeholder:text-slate-400"
                      placeholder="Type your message..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={newRequestLoading}
                      required
                    />
                    <Button 
                      type="submit" 
                      size="icon"
                      disabled={newRequestLoading || !prompt.trim()}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send message</span>
                    </Button>
                  </form>
                  <p className="text-xs text-slate-500 mt-2 text-center">
                    Press Enter to send • Shift+Enter for new line
                  </p>
                </div>
              )}
            </Card>
          )}
        </main>
      </div>

      {/* Alert Dialog for confirmation actions */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="bg-white border border-slate-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-800">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600">
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-200 text-slate-700 hover:bg-slate-100">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-400">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Home;