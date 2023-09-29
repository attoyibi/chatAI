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
      // console.log("Access token found:", accessToken);
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
      setLoading(false);
      console.log(chatCompletion.choices[0].message);
    } catch (error) {
      console.error(error);
    }

    console.log(conversations);
  };
  useEffect(() => {
    if (inputText !== "") {
      chatOpenAI();
      // Reset input teks
      setInputText("");
    }
  }, [conversations]);

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
            {loading ? (
              <a className="btn btn-primary text-primary-content text-center relative rounded-full w-40">
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Loading
              </a>
            ) : (
              <a
                onClick={handleClick}
                className="btn btn-primary text-primary-content text-center relative rounded-full w-32"
              >
                Send
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
