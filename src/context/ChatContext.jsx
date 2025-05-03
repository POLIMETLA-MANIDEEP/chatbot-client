import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;


const ChatContext = createContext();

// ✅ Use Vite-compatible env variable
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [newRequestLoading, setNewRequestLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [selected, setSelected] = useState(null);
  const [createLod, setCreateLod] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  async function fetchResponse() {
    if (!prompt) return alert("Write prompt");
    if (!selected) return alert("Please select a chat first");

    setNewRequestLoading(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
        }
      );

      const answer = response.data.candidates[0].content.parts[0].text;
      const message = { question: prompt, answer };
      setMessages((prev) => [...prev, message]);

      if (token) {
        await axios.post(
          `${API_BASE_URL}/api/chat/${selected}`,
          message,
          { headers: { token } }
        );
      }

      setPrompt("");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setNewRequestLoading(false);
    }
  }

  async function fetchChats() {
    if (!token) return;

    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/chat/all`, {
        headers: { token },
      });

      setChats(data);
      if (data.length > 0) {
        setSelected(data[0]._id);
      }
    } catch (error) {
      console.error("Error fetching chats", error);
    }
  }

  async function createChat() {
    if (!token) return;

    setCreateLod(true);
    try {
      await axios.post(
        `${API_BASE_URL}/api/chat/new`,
        {},
        { headers: { token } }
      );
      await fetchChats();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setCreateLod(false);
    }
  }

  async function fetchMessages() {
    if (!token || !selected) return;

    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/chat/${selected}`, {
        headers: { token },
      });
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages", error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteChat(id) {
    if (!token) return;

    try {
      const { data } = await axios.delete(`${API_BASE_URL}/api/chat/${id}`, {
        headers: { token },
      });
      toast.success(data.message);
      fetchChats();
      window.location.reload(); // consider replacing this with state update
    } catch (error) {
      console.error("Error deleting chat", error);
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [selected]);

  return (
    <ChatContext.Provider
      value={{
        fetchResponse,
        messages,
        prompt,
        setPrompt,
        newRequestLoading,
        chats,
        createChat,
        createLod,
        selected,
        setSelected,
        loading,
        setLoading,
        deleteChat,
        fetchChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatData = () => useContext(ChatContext);
