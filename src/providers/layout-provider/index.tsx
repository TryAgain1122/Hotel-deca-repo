"use client";
import { useEffect, useState } from "react";
import Header from "./Header";
import { UserType } from "@/interfaces";
import { getCurrentUserFromMongoDB } from "@/server-actions/user";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { message } from "antd";
import { usePathname } from "next/navigation";
import Spinner from "@/app/components/Spinner";
const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();

  const [loggedInUserData, setLoggedInUserData] = useState<UserType | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const isAuthRoute = pathname.includes('/sign-in') || pathname.includes('/sign-up');
  const isAdminRoute = pathname.includes('/admin')

  const getUserData = async () => {
    try {
      const response = await getCurrentUserFromMongoDB();
      if (response.success) {
        setLoggedInUserData(response.data);
        console.log(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loggedInUserData && !isAuthRoute) {
      getUserData();
    }
  }, []);

  if (isAuthRoute) {
    return children
  }

  if (loggedInUserData && isAdminRoute && !loggedInUserData.isAdmin) {
    return (
        <div>
            <Header loggedInUserData={loggedInUserData}/>
            <div className="text-center text-sm text-gray-500 px-5 lg:px-20">
                You are not Authorized to access this page 
            </div>
        </div>
    )
  }
  
  if (loading) {
    return <div className="w-full h-screen flex items-center justify-center"><Spinner/></div>
  }

  return (
    <div className="px-20">
      <Header loggedInUserData={loggedInUserData} />
      {children}
    </div>
  );
};

export default LayoutProvider;
