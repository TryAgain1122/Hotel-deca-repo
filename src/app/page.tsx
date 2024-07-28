import { UserType } from "@/interfaces";
import { getCurrentUserFromMongoDB } from "@/server-actions/user";
import { UserButton } from "@clerk/nextjs";
import RoomsData from "./admin/_common/room-data";
import { Suspense } from "react";
import Spinner from "./components/Spinner";


export default async function Home() {
  return (
    <div> 
      <Suspense fallback={<Spinner/>}>
        <RoomsData />
      </Suspense>
    </div>
  );
}
