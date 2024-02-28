import Prompt from "@models/prompt";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (request, { params }) => {
    const postId = params.postId;
    const id = params.id;
    try {
        await connectToDB();
        
        const user = await User.findById(id);
        if (!user) return new Response("User not found!", { status: 404 });
        
        const prompt = await Prompt.findById(postId);
        console.log(prompt);
        if(user.likedPrompts){
            const likedPromptIndex = user.likedPrompts?.indexOf(postId);
            if (likedPromptIndex !== -1) return new Response("Already liked", { status: 400 });
        }

        if (!user.likedPrompts) {
            user.likedPrompts = [];
        }

        user.likedPrompts.push(prompt);
        await user.save();

        return new Response("Liked prompt added", { status: 200 });
    } catch (error) {
        console.log("Error adding the liked prompt :", error);
        return new Response("Server error", { status: 500 });
    }
}

export const DELETE = async (request, { params }) => {
    const id = params.id;
    const postId = params.postId;

    try {
        await connectToDB();

        const user = await User.findById(id);
        if (!user) return new Response("User not found!", { status: 404 });

        const likedPromptIndex = user.likedPrompts?.indexOf(postId);
        if (likedPromptIndex === -1) return new Response("Prompt is not liked!", { status: 400 });

        user.likedPrompts.splice(likedPromptIndex, 1);

        await user.save();
        return new Response("Prompt Disliked", { status: 200 });
    } catch (error) {
        console.log("Error removing liked prompt: ", error);
        return new Response("Server error", { status: 500 });
    }
}
