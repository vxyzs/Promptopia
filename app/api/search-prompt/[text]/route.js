import Prompt from "../../../../models/prompt"
import User from '../../../../../models/user'
import { connectToDB } from "../../../../../utils/database"; 

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
 
        const searchTextRegex = new RegExp(params.text, 'i'); 

        const users = await User.find({ username: { $regex: searchTextRegex } });

        let promptsByUserName = [];
        if (users.length > 0) {
            const userIds = users.map(user => user._id);
            promptsByUserName = await Prompt.find({ creator: { $in: userIds } }).populate('creator');
        }
        const prompts = await Prompt.find({
            $or: [
                { tag: { $regex: searchTextRegex } },
                { prompt: { $regex: searchTextRegex } }
            ]
        }).populate('creator');

        return new Response(JSON.stringify([...prompts,...promptsByUserName]), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
};
