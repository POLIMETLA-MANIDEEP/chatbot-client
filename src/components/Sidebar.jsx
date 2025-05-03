import { IoIosCloseCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { ChatData } from "../context/ChatContext";
import { UserData } from "../context/UserContext";
import { LoadingSpinner } from "./Loading";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Button } from "../components/ui/button";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { chats, createChat, createLod, setSelected, deleteChat } = ChatData();
  const { logoutHandler } = UserData();

  const deleteChatHandler = (id) => {
    if (confirm("Are you sure you want to delete this chat?")) {
      deleteChat(id);
    }
  };

  const clickEvent = (id) => {
    setSelected(id);
    toggleSidebar();
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 w-72 p-4 transition-transform transform md:relative md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } flex flex-col`}
    >
      <div className="flex justify-end md:hidden mb-2">
        <Button onClick={toggleSidebar} className="text-gray-600 text-xl">
          <IoIosCloseCircle />
        </Button>
      </div>

      <Card className="text-gray-800 border-none flex flex-col flex-grow">
        <CardHeader>
          <h2 className="text-2xl font-bold mb-4">ChatBot</h2>
          <Button
            onClick={createChat}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {createLod ? <LoadingSpinner /> : "New Chat +"}
          </Button>
        </CardHeader>

        <CardContent className="flex-grow flex flex-col">
          <p className="text-sm text-gray-500 mb-2">Recent</p>

          <div className="flex-grow flex flex-col justify-start gap-2">
            {chats?.length > 0 ? (
              chats.map((e) => (
                <div
                  key={e._id}
                  className="flex items-center gap-1"
                  style={{ flexShrink: 0 }}
                >
                  <Button
                    onClick={() => clickEvent(e._id)}
                    className="flex-1 text-left bg-white hover:bg-gray-100 border border-gray-300 text-sm truncate"
                    title={e.latestMessage}
                  >
                    {e.latestMessage.slice(0, 16)}...
                  </Button>
                  <Button
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => deleteChatHandler(e._id)}
                  >
                    <MdDelete />
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No chats yet</p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-4">
        <Button
          onClick={logoutHandler}
          className="w-full bg-red-500 hover:bg-red-600 text-white"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
