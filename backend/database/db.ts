import moongoose from "mongoose";

//Function to connecting to database
export async function connectToDatabase(): Promise<void> {
    try {
        const uri = "mongodb+srv://romanslipak:q7ypaEyGVp7oG5ce@todocluster.wvtto.mongodb.net/?retryWrites=true&w=majority&appName=ToDoCluster";
        await moongoose.connect(uri);
        console.log("Database connected!");
    } catch (error) {
        console.log("Error connecting to Database");
        process.exit(1); // Terminate procces if conect is fail
    }
}
