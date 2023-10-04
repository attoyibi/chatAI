"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import Skeleton from "./skeleton"; // Impor komponen skeleton
import LoadingWidget from "./loading"; // Impor komponen skeleton

export default function Home() {
  const router = useRouter();
  const [isJoinClicked, setIsJoinClicked] = useState(false);
  // Fungsi untuk mengarahkan ke halaman selanjutnya ("/signin")
  const goToJoinInPage = () => {
    setIsJoinClicked(true); // Mengubah state saat tombol diklik
    setTimeout(() => {
      router.push("/join");
    }, 200);
  };
  return (
    <>
      <div className="flex justify-center items-center">
        {isJoinClicked && <Skeleton />}
        <LoadingWidget />
      </div>
      {!isJoinClicked && (
        <div className="relative max-w-[500px] mx-auto w-full flex flex-col min-h-screen shadow-xl shadow-primary/40">
          {/* <button class="btn btn-accent">Ghost</button> */}
          {/* <Login />*/}
          <div className="min-h-screen bg-warning">
            <div className="w-full bg-warning text-primary-content flex flex-col justify-end items-center gap-8 pt-8">
              <img
                alt="Sofian Hadiwijaya"
                fetchPriority="high"
                width="350"
                height="350"
                decoding="async"
                data-nimg="1"
                className="animate-[from-l-25_.35s_ease-in-out]"
                srcSet="https://warungpintar.co.id/static/1b6dc3179de91d3f1d89341539f174c1/042ad/wpg-sofian.webp 1x, https://warungpintar.co.id/static/1b6dc3179de91d3f1d89341539f174c1/042ad/wpg-sofian.webp 2x"
                src="https://warungpintar.co.id/static/1b6dc3179de91d3f1d89341539f174c1/042ad/wpg-sofian.webp"
                style={{ color: "transparent" }}
              />
            </div>
            <div className="fixed w-full bottom-0">
              <div className="max-w-[500px] bg-white px-6 py-4 animate-[from-b-25_.35s_ease-in-out]">
                <h1 className="font-bold text-lg sm:text-2xl mb-3">
                  Chat denganku setiap saat dengan{" "}
                  <strong className="text-[#FC814A]">Sofian</strong>
                </h1>
                <h4 className="text-zinc-400 text-md sm:text-xl mb-6">
                  Rasakan pengalaman berbincang seolah sedang chatting dengan
                  Calon Legislatif favoritmu
                </h4>
                <a
                  className="btn btn-warning text-warning-content text-center relative w-full rounded-full"
                  onClick={goToJoinInPage}
                >
                  Chat Now
                </a>
                {/* <a
            className="btn btn-primary text-center relative w-full mt-4 bg-white text-primary rounded-full hover:bg-primary/25"
            href="/signin"
          >
            Sign In
          </a> */}
              </div>
            </div>
          </div>

          {/* Tampilkan komponen skeleton jika tombol diklik */}
        </div>
      )}
    </>
  );
}
