import app from "./app";
import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    
    })
}).catch((err) => {
    console.log(err)
})



