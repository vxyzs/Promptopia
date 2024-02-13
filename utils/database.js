import mongoose from "mongoose";

let isconnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isconnected){
        console.log('Mongodb is connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "Share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isconnected = true;
        console.log('Mongodb connected')
    } catch (error) {
        console.log(error);
    }
}