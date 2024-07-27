'use client'
import { UserType } from "@/interfaces"
import { UserButton, useUser } from '@clerk/nextjs';
import Link from "next/link";
import { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import SideBar from "./Side-bar";
import { CiMenuBurger } from "react-icons/ci";

interface UserProps {
    loggedInUserData: UserType
}

const UserInfo:React.FC<UserProps>= ({loggedInUserData}) => {
    const [showSidebar, setShowSidebar] = useState(false)
    const { user } = useUser()
  return (
    <div>{user ? (
        <div className="flex gap-3 items-center">
             <UserButton/>
             <CiMenuBurger 
                onClick={()=> setShowSidebar(!showSidebar)}
                className="cursor-pointer"
             />
        </div>    
      ) : (
        <Link href='/sign-in'><RxAvatar size={30} className='cursor-pointer'/></Link>
      )}
      {showSidebar && <SideBar loggedInUserData={loggedInUserData}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        />}
      </div>
  )
}

export default UserInfo