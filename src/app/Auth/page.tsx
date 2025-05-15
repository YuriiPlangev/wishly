"use client"
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Logo from "../components/shared/Logo";

import AuthForm from "../components/shared/AuthForm";
import { Fragment } from "react";

export default function AuthPage() {


  return (
    <Fragment>
      
      <header className="container mx-auto py-6 px-4 flex items-center">
        <Link href="/" className="flex items-center text-gray-600 hover:text-black">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
      </header>

      <main>
      <div className="flex flex-col items-center pt-12 max-w-md mx-auto">
        <Logo />
        <h1 className="text-3xl font-bold text-center my-4">Welcome to Giftify</h1>
        <p className="text-muted-foreground text-center mb-8">Create and share your wishlist with friends and family</p>
      </div>
     <AuthForm />
     </main>

    </Fragment>
   
  )
}
