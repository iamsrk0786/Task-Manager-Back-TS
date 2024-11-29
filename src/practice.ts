import express,{Request,Response} from "express"
import cors from "cors"
import mongoose, { Schema } from "mongoose"
const app = express()


app.use(express.json())
app.use(express.urlencoded( { extended: true } ))
app.use(cors())

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mydatabase", {})
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.error(err))

        app.get("/", (req: Request, res: Response) => {
            const user = [{id:1,name:"shahrukh",age:22},{id:2,name:"jahir",age:20}]
            // res.json({ message: "Server is running!"})
            // res.send("Server is running!")
            res.status(200).json(user)
          });

          const userSchema = new Schema({
            name: String,
            email: String,
        password: String
            
          })
          const User = mongoose.model("User", userSchema)

app.post("/register", (req: Request, res: Response) => {
    const {name , email,password } = req.body;
    const user = new User({name, email,password })

    user.save()
    .then(() => res.json({ message: "User created successfully!" }))
    .catch(err => res.status(400).json({ message: "Error creating user", error
        : err }));
        });





          app.get("/:id", (req: Request, res: Response) => {
            const userid = req.params.id
            res.status(200).json({message:"user get successfully",userid})
          });
          app.post("/create", (req: Request, res: Response) => {
            const user = req.body
            res.status(201).json({message:"user created successfully", user})
          });
        app.listen(5000, () => {
            console.log("Server is running on port 3000");
            })
            