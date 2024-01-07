import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bodyParser from "body-parser";
const  URL =  process.env.URL
const PORT = process.env.PORT || 9002

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://aroradeepak0817:DsajsyXAfVd9km0L@cluster0.fu0w9an.mongodb.net/?retryWrites=true&w=majority")


const userSchema =new  mongoose.Schema({
    name : String, 
    password: String
 
 })

 
 
 const User = new mongoose.model("User", userSchema)

app.post('/login', (req, res)=>{
    const {name, password} = req.body
   User.findOne({name : name}).then(function(user){
       if(user){
         if(password === user.password)
         {
            console.log("success")
            res.send({message : "Login successfull", user:user})
         }
         else
         {
            
            res.send({message : "Incorrect password"})
         }
       }
       else
       {
          res.send({message : "User not registered"})
       }
   })
})
app.post('/register', (req, res)=>{
   const {name, password} = req.body
   User.findOne({name : name}).then(function(user){
       if(user){
        res.send({message: "User already registered"})
       }
       else
       {
        const user = new User({
            name,
            password
           })
           user.save();
           res.send({message : "Registration successfull. Please Log-In now."})
       }
   })
  
})




app.listen(PORT, ()=>{
    console.log("listening on port 9002");
})