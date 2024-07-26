import { UserType } from "@/interfaces";
import { getCurrentUserFromMongoDB } from "@/server-actions/user";
import { UserButton } from "@clerk/nextjs";


export default async function Home() {
  await getCurrentUserFromMongoDB();


  return (
    <div> 
      <h1>Homepage</h1>
    </div>
  );
}
