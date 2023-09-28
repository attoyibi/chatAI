"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Configuration, OpenAIApi } from "openai";
import { OpenAI } from "openai";
// Inisialisasi array conversations
const initialConversations = [
  {
    // sender: "Chat AI",
    profileImage: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
    message: "Halo! Apa yang bisa saya bantu?",
  },
];

function Page() {
  const router = useRouter();
  useEffect(() => {
    // Check if accessToken is present in localStorage
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      // Access token is available, you can perform actions accordingly
      console.log("Access token found:", accessToken);
      // You can use this accessToken for making authenticated requests, etc.
    } else {
      router.push("/");
      // Access token is not available, you may want to handle this case
      console.log("Access token not found.");
      // You can redirect the user to a login page or perform other actions
    }
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  //openai api configuration
  const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
  });

  // const openai = new OpenAIApi(configuration);

  const [inputText, setInputText] = useState(""); // State untuk input teks
  const [conversations, setConversations] = useState(initialConversations);
  const chatOpenAI = async () => {
    setLoading(true);
    try {
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: inputText }],
      });
      // Tambahkan pesan pengguna ke dalam array conversations
      setConversations([
        ...conversations,
        {
          // sender: "You",
          profileImage:
            "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
          message: chatCompletion.choices[0].message.content,
        },
      ]);
      console.log(chatCompletion.choices[0].message);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    console.log(conversations);
  };
  useEffect(() => {
    console.log("masuk ke use effect");
    if (inputText !== "") {
      console.log("masuk ke if");
      chatOpenAI();
      // Reset input teks
      setInputText("");
    }
  }, [conversations]);

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (inputText.trim() !== "") {
      // Tambahkan pesan pengguna ke dalam array conversations
      setConversations([
        ...conversations,
        {
          // sender: "You",
          profileImage:
            "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
          message: inputText,
        },
      ]);
    }
  };
  return (
    <div className="bg-white relative max-w-[500px] mx-auto w-full flex flex-col min-h-screen shadow-xl shadow-primary/40">
      <div className="fixed w-full z-10">
        <div className="grid grid-cols-9 gap-3 px-5 py-3 max-w-[500px] bg-white shadow-md shadow-primary/15">
          <div className="flex items-center">
            <Link href="/">
              <button className="btn-ghost p-2 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 19 17"
                  width="24"
                  height="24"
                  className="text-black"
                >
                  <path d="M8.295 15.716A1 1 0 0 0 9.7 14.291L4.33 9h13.67a1 1 0 1 0 0-2H4.336L9.7 1.715A1 1 0 0 0 8.295.29L1.371 7.113a1.25 1.25 0 0 0 0 1.78l6.924 6.823Z"></path>
                </svg>
              </button>
            </Link>
          </div>
          <div className="col-start-3 col-end-8 flex items-center justify-center">
            {/* <p className="text-xl font-semibold">You</p> */}
          </div>
        </div>
      </div>
      {/* chat */}
      <div className="mt-20 mb-60">
        {conversations.map((conversation, index) => (
          <div
            className={`chat ${index % 2 === 0 ? "chat-start" : "chat-end"}`}
            key={index}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  src={conversation.profileImage}
                  alt={`${conversation.sender}'s profile`}
                />
              </div>
            </div>
            <div className="chat-header">{conversation.sender}</div>
            <div className="chat-bubble">{conversation.message}</div>
          </div>
        ))}
      </div>

      {/* div bottom */}
      <div className="fixed w-full bottom-0">
        <div className="max-w-[500px] bg-white px-6 py-4 animate-[from-b-25_.35s_ease-in-out]">
          <div className="flex items-center justify-between">
            <div className="w-full max-w-xs mr-2">
              <input
                type="text"
                placeholder="Write Something"
                className="input input-bordered w-full"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>
            <a
              onClick={handleClick}
              className="btn btn-primary text-primary-content text-center relative rounded-full w-32"
            >
              Send
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
