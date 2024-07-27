import { Dispatch, SetStateAction } from "react";
import {Drawer} from 'antd'
import { FaHome } from "react-icons/fa";
import { IoIosList } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { UserType } from "@/interfaces";
import { usePathname, useRouter } from "next/navigation";
import { LiaHotelSolid } from "react-icons/lia";
import { FaBed } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { useAuth } from "@clerk/nextjs";


interface SidebarProps {
    showSidebar: boolean;
    setShowSidebar: Dispatch<SetStateAction<boolean>>;
    loggedInUserData: UserType;
}

const SideBar: React.FC<SidebarProps> = ({showSidebar, setShowSidebar, loggedInUserData}) => {
    const router = useRouter()
    const pathname = usePathname()
    const { signOut } = useAuth()

    const onLogout = async() => {
        await signOut()
        setShowSidebar(false)
        router.push('/sign-in')
    }
    const userMenuItems: any[] = [
        {
            name: "Home",
            icon: <FaHome size={20}/>,
            onclick: () => router.push('/'),
            isActive: pathname === '/'
        },
        {
            name: "Bookings",
            icon: <IoIosList size={20}/>,
            onClick: () => router.push('/user/bookings'),
            isActive: pathname === '/user/bookings'
        },
        {
            name: "Profile",
            icon: <RxAvatar size={20}/>,
            onClick: () => router.push('/user/profile')
        },
    ]
    
    const adminMenuItems: any[] = [
        {
            name: "Home",
            icon: <FaHome size={20}/>,
            onclick: () => router.push('/'),
            isActive: pathname === '/'
        },
        {
            name: "Bookings",
            icon: <IoIosList size={20}/>,
            onClick: () => router.push('/admin/bookings'),
            isActive: pathname === '/admin/bookings'
        },
        {
            name: "Hotels",
            icon: <LiaHotelSolid size={20}/>,
            onClick: () => router.push('/admin/hotels'),
            isActive: pathname === '/admin/hotels'
        },
        {
            name: "Rooms",
            icon: <FaBed size={20}/>,
            onClick: () => router.push('/admin/rooms'),
            isActive: pathname === '/admin/rooms'
        },
        {
            name: "Users",
            icon: <RxAvatar size={20}/>,
            onClick: () => router.push('/admin/users'),
            isActive: pathname === '/admin/users'
        },
        {
            name: "Reports",
            icon: <GoGraph size={20}/>,
            onClick: () => router.push('/admin/reports'),
            isActive: pathname === '/admin/reports'
        },

    ]
    const menuItmesToShow: any[] = loggedInUserData.isAdmin ? adminMenuItems : userMenuItems
  return (
    <Drawer open={showSidebar} onClose={() => setShowSidebar(false)} closable>
        <div className="flex flex-col gap-14">
            {menuItmesToShow.map((item, index) => (
                <div className={`flex gap-4 items-center  
                    ${item.isActive ? 'bg-gray-700 text-white cursor-pointer px-7 py-3 rounded' : ''}`}
                    key={index}
                    onClick={() => {
                        item.onClick();
                        setShowSidebar(false)
                    }}
                >
                    {item.icon}
                    <span className="mt-[2px]">{item.name}</span>
                </div>
            ))}
            <span className="text-center cursor-pointer text-red-500" onClick={onLogout}>Logout</span>
         </div>
    </Drawer>
  )
}

export default SideBar