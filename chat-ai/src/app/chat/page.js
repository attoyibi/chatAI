"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useChat } from "ai/react";
import { useRouter } from "next/navigation";
import { headers } from "../../../next.config";
import cookieCutter from "cookie-cutter";

export default function Page() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    // Check if accessToken is present in localStorage
    const accessToken = cookieCutter.get("accessToken");

    if (accessToken) {
      setAccessToken(accessToken);
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

  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const onEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // This will prevent adding a new line
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-white relative max-w-[500px] mx-auto w-full flex flex-col min-h-screen shadow-xl shadow-primary/40">
      <div className="fixed w-full z-10 mb-10">
        <div className="grid grid-cols-1 gap-4 max-w-[500px] bg-white shadow-md shadow-primary/15">
          <div className="flex items-center">
            <div className="px-6 flex items-center gap-3">
              <div className="avatar">
                <div className="w-20 rounded-full">
                  <img src="https://warungpintar.co.id/static/1b6dc3179de91d3f1d89341539f174c1/042ad/wpg-sofian.webp" />
                </div>
              </div>
              <div>
                <p className="font-bold text-lg">Sofian Hadiwijaya</p>
                <p>Aktifis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 mb-60">
        {messages.length > 0
          ? messages.map((m, index) => (
              <div
                key={m.id}
                className={`${
                  index % 2 === 0 ? "chat chat-end" : "chat chat-start"
                }`}
              >
                <div
                  className={`${
                    index % 2 === 0
                      ? "chat-bubble chat-bubble-primary"
                      : "chat-bubble chat-bubble-warning"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))
          : null}
      </div>

      {/* div bottom */}
      <div className="fixed w-full bottom-0">
        <div className="max-w-[500px] bg-white px-6 py-4 animate-[from-b-25_.35s_ease-in-out]">
          <div className="w-full items-center justify-between">
            <input
              type="text"
              placeholder="Write Something"
              className="input input-bordered w-full"
              value={input}
              onChange={handleInputChange}
              onKeyDownCapture={onEnter}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
