import React from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firestore/firebase";
import Link from "next/link"
import { Mail, Lock, Github, Twitter } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { TabsContent } from "../ui/tabs"
import { useRouter } from "next/navigation";

const SignIn = () => {
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");
    const router = useRouter();
    function login (e) {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((user) => {

            console.log(user);
            setEmail("");
            setPassword("");
            setError("");
            router.push("/profile");
        })
        .catch((error) => {
            console.log(error);
            setError(error.message);
        })

    }
  return (
    <TabsContent value="signin" className="space-y-2">
            
            <div className="space-y-4">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 py-5 rounded-xl border-[#E9D9C8]"
                />
                </div>
            </div>

            <div className="space-y-4 my-6">
            <Label htmlFor="password">Password</Label>
                <div className="relative ">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 py-5 rounded-xl border-[#E9D9C8]"
                />
                
                </div>
                <p>{error}</p>
                <div className="flex items-center justify-between">

                <Link href="/auth/forgot-password" className="text-xs text-[#D4B499] hover:underline">
                    Forgot password?
                </Link>
                </div>
            </div>
            

            <Button onClick={login} className="w-full rounded-xl bg-[#D4B499] hover:bg-[#C9A88D] text-black py-5">Sign In</Button>

            <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E9D9C8]"></div>
            </div>
            <div className="relative bg-card px-4 text-sm text-gray-500">or continue with</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="rounded-xl border-[#E9D9C8]">
                <Github className="h-4 w-4 mr-2" />
                Github
            </Button>
            <Button variant="outline" className="rounded-xl border-[#E9D9C8]">
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
            </Button>
            </div>
        </TabsContent>
  )
}

export default SignIn