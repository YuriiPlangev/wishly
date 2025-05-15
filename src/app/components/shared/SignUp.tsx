import React from 'react'

import Link from "next/link"
import { Mail, Lock, Github, Twitter } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { TabsContent } from "../ui/tabs"
import { Checkbox } from "../ui/checkbox"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firestore/firebase";
import { User } from "lucide-react"
import { useRouter } from "next/navigation";
import { db } from "../../../firestore/firebase";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
    const router = useRouter();

    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [name, setName] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");
    

    async function register (e) {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                name: name,
                createdAt: new Date(),
                bio: "",
                location: "",
                image: "",
                wishlists: [],
            });

            setEmail("");
            setPassword("");
            setName("");
            setError("");

            router.push("/profile");

        } catch (error: any) {
            console.log(error);
            setError(error.message);
        }
        

    }
  return (
    <TabsContent value="signup" className="space-y-6">
            <div className="space-y-6">
            <div className="space-y-4">
                <Label htmlFor="signup-name">Full Name</Label>
                <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    id="signup-name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 py-5 rounded-xl border-[#E9D9C8]"
                    maxLength={45}
                />
                </div>
            </div>

            <div className="space-y-4">
                <Label htmlFor="signup-email">Email</Label>
                <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    id="signup-email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="pl-10 py-5 rounded-xl border-[#E9D9C8]"
                />
                </div>
            </div>

            <div className="space-y-4">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    id="signup-password"
                    placeholder="Create a password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 py-5 rounded-xl border-[#E9D9C8]"
                />
                </div>
                <p className="text-xs text-gray-500">{error}</p>
            </div>

            <div className="flex items-center gap-2.5">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-xs">
                I agree to the{" "}
                <Link href="/terms" target='_blank' className="text-[#D4B499] hover:underline">
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" target='_blank' className="text-[#D4B499] hover:underline">
                    Privacy Policy
                </Link>
                </Label>
            </div>
            </div>

            <Button onClick={register} className="w-full rounded-xl bg-[#D4B499] hover:bg-[#C9A88D] text-black">Create Account</Button>

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

export default SignUp