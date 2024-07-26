'use server'

import { connectMongoDB } from "@/app/config/db"
import UserModel from "@/models/user-models"
import { currentUser } from "@clerk/nextjs/server"
connectMongoDB()

export const getCurrentUserFromMongoDB = async () => {
    try {
        const currentUserFromClerk = await currentUser()

        const user = await UserModel.findOne({
            clerkUserId: currentUserFromClerk?.id
        });
        if (user) {
            return {
                success: true,
                data: JSON.parse(JSON.stringify(user)),
            }
        }
        const newUser = new UserModel({
            name: currentUserFromClerk?.firstName + " " + currentUserFromClerk?.lastName,
            clerkUserId: currentUserFromClerk?.id,
            email: currentUserFromClerk?.emailAddresses[0].emailAddress,
            profilePic: currentUserFromClerk?.imageUrl,
            isAdmin: false,
            isActive: true,
        })
        await newUser.save();
        return {
            success: true,
            data: JSON.parse(JSON.stringify(newUser))
        }
    } catch (error) {
        return {
            success: false,
            error: error,
            message: "Error while fetching user data from mongodb"
        }
    }
}