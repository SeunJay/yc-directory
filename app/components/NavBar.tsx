import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar = async () => {
  const session = await auth();
  console.log(session.user);
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href={"/"}>
          <Image src={"/logo.png"} width={144} height={30} alt="logo" />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session.user ? (
            <>
              <Link href={"/startup/create"}>
                <span>Create</span>
              </Link>

              <button
                onClick={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <span>Logout</span>
              </button>

              <Link href={`/user/${session.user.id}`}>
                <span>{session.user.name}</span>
              </Link>
            </>
          ) : (
            <button
              onClick={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <span>Login</span>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
