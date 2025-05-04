import React, { useState } from "react";
import { ChatData } from "../context/ChatContext";
import { UserData } from "../context/UserContext";
import { LoadingSpinner } from "./Loading";

// shadcn/ui components
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

// Icons
import { 
  MessageSquarePlus, 
  Trash2, 
  MoreHorizontal, 
  LogOut, 
  Settings, 
  User, 
  Bot, 
  History, 
  Sparkles 
} from "lucide-react";

const Sidebar = ({ onToggle }) => {
  const { chats, createChat, createLod, setSelected, deleteChat } = ChatData();
  const { logoutHandler, user } = UserData();
  const [chatToDelete, setChatToDelete] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleChatSelect = (id) => {
    setSelected(id);
    if (onToggle) onToggle(false);
  };

  const confirmDelete = (id) => {
    setChatToDelete(id);
    setIsAlertOpen(true);
  };

  const handleDelete = () => {
    if (chatToDelete) {
      deleteChat(chatToDelete);
      setChatToDelete(null);
    }
    setIsAlertOpen(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header and User Info */}
      <div className="p-4 border-b bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-white" />
            <h1 className="text-xl font-bold">AI Chat</h1>
          </div>
          <Badge variant="outline" className="text-xs text-white border-white/30">
            v1.0
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback className="bg-purple-700 text-white">
              <User className="h-4 w-4" />
            </AvatarFallback>
            <AvatarImage src="/user-avatar.png" />
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{user?.name || "User"}</p>
            <p className="text-xs text-indigo-100 truncate">{user?.email || "user@example.com"}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border border-slate-200">
              <DropdownMenuItem className="cursor-pointer hover:bg-slate-100">
                <Settings className="mr-2 h-4 w-4 text-slate-500" /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-rose-600 hover:bg-rose-50" onClick={logoutHandler}>
                <LogOut className="mr-2 h-4 w-4" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <Button 
          onClick={createChat} 
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md" 
          size="lg"
          disabled={createLod}
        >
          {createLod ? (
            <LoadingSpinner />
          ) : (
            <>
              <MessageSquarePlus className="mr-2 h-4 w-4" />
              New Chat
            </>
          )}
        </Button>
      </div>

      {/* Chat List */}
      <div className="px-3 py-2 flex items-center justify-between bg-slate-100">
        <div className="flex items-center">
          <History className="h-4 w-4 text-indigo-600 mr-1" />
          <h2 className="text-sm font-medium text-slate-700">Recent Conversations</h2>
        </div>
        <Badge variant="secondary" className="text-xs bg-indigo-100 text-indigo-700">
          {chats?.length || 0}
        </Badge>
      </div>

      {/* Chats ScrollArea */}
      <ScrollArea className="flex-1 px-2 bg-slate-50">
        <div className="space-y-1 py-2">
          {chats?.length > 0 ? (
            chats.map((chat) => (
              <TooltipProvider key={chat._id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 group">
                      <Button
                        variant="ghost"
                        className="flex-1 justify-start text-left h-auto py-2 px-3 font-normal hover:bg-indigo-50 text-slate-700"
                        onClick={() => handleChatSelect(chat._id)}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <Sparkles className="h-4 w-4 text-indigo-500 shrink-0" />
                          <span className="truncate text-sm">
                            {chat.latestMessage?.slice(0, 24) || "New conversation"}
                          </span>
                        </div>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-50 hover:text-rose-600"
                        onClick={() => confirmDelete(chat._id)}
                      >
                        <Trash2 className="h-4 w-4 text-slate-400 hover:text-rose-600" />
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-800 text-white border-slate-700">
                    <p>{chat.latestMessage}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))
          ) : (
            <div className="px-3 py-8 text-center">
              <p className="text-sm text-slate-500">No conversations yet</p>
              <p className="text-xs text-slate-400 mt-1">
                Click "New Chat" to get started
              </p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t mt-auto bg-slate-100">
        <Button 
          variant="outline" 
          className="w-full border-slate-300 hover:bg-slate-200 hover:text-slate-800 text-slate-700 bg-red-600 text-white" 
          onClick={logoutHandler}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="bg-white border border-slate-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-800">Delete Conversation</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600">
              Are you sure you want to delete this conversation? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-200 text-slate-700 hover:bg-slate-100">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              className="bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-400"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Sidebar;