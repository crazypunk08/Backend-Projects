const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Chat=require("./models/chat.js");
const methodoverride=require("method-override");



app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));//Express should be able to parse the data which is embedded in 
// query string 
app.use(methodoverride("_method"));


main()
    .then(()=>{
        console.log("Connection successfull");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// let Chat1=new Chat({
//     from:"neha",
//     to:"priya",
//     msg:"Kya Bolte Public",
//     created_at:new Date(),
// });

// Chat1.save();
// Chat.deleteOne({from:'neha'}).then((res)=>{console.log(res)});
//Root Directory     
app.get("/",(req,res)=>{
    res.send("root is working");
});

//Home Directory
app.get("/chats",async (req,res)=>{
    let chats =await Chat.find();
    res.render("index.ejs",{chats});
});

app.get("/chats/new", (req,res)=>{
    res.render("new.ejs");
});

//Create route
app.post("/chats",async (req,res)=>{
    let{from,to,msg}=req.body;
    let newChat=new Chat(
        {
            from:from,
            to:to,
            msg:msg,
            created_at:new Date(),
        }
    );
    await newChat.save();
    res.redirect("/chats");
});

//Edit Route
app.get("/chats/:id/edit", async (req,res)=>{
    let chat=await Chat.findById(req.params.id);
    res.render("edit.ejs",{chat});
});

app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let {msg:newmsg}=req.body;
    console.log(newmsg);
    let updatedchat= await Chat.findByIdAndUpdate(id,{msg:newmsg},{runValidators:true,new:true});
    console.log(updatedchat);
    res.redirect("/chats");
});

//Delete route
app.delete("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    await Chat.findByIdAndDelete(id);
    console.warn('You Deleted a message');
    res.redirect("/chats");
});



app.listen(8080,()=>{
    console.log("Listening on port 8080");
});