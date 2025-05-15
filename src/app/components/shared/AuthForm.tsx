import React from 'react'
import {Tabs, TabsList, TabsTrigger} from "../ui/tabs"
import SignIn from './SignIn'
import SignUp from './SignUp'

const AuthForm = () => {

    const [activeTab, setActiveTab] = React.useState("signin")
  return (
    
    <div className="bg-card rounded-2xl shadow-sm p-8 max-w-md mx-auto">
    <Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab} className="w-full">
    <TabsList className="w-full flex justify-between mb-8 bg-muted rounded-xl p-1">
        <TabsTrigger value="signin" className="rounded-xl flex-1 px-3 py-1.5 cursor-pointer data-[state=active]:bg-[#F3E9DD]">
        Sign In
        </TabsTrigger>
        <TabsTrigger value="signup" className="rounded-xl flex-1 cursor-pointer data-[state=active]:bg-[#F3E9DD]">
        Sign Up
        </TabsTrigger>
    </TabsList>
    <SignIn />
    <SignUp />
    </Tabs>
  </div>
  )
}

export default AuthForm