import User from '../../../../../models/user'
import { connectToDB } from "../../../../../utils/database"; 

export const GET = async (request, { params }) => {
    const id = params.id;
    try {
        await connectToDB();

        const user = await User.findById(id).populate({
            path: 'likedPrompts',
            populate: { path: 'creator' } 
        });
        if (!user) return new Response("User not found!", { status: 404 });

        const likedPrompts = user.likedPrompts;

        return new Response(JSON.stringify(likedPrompts), { status: 200 });
    } catch (error) {
        console.log("Error fetching liked prompts: ", error);
        return new Response("Server error", { status: 500 });
    }
}
