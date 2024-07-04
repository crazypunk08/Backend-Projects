const mongoose=require("mongoose");
const Chat=require("./models/chat.js");

main()
    .then(()=>{
        console.log("Connection successfull");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats=[
    {
        from:"amit",
        to:"sumit",
        msg:"Hi there Whatsup",
        created_at:new Date(),
    },
    {
        from:"Naren",
        to:"Karen",
        msg:"No paid promotions",
        created_at:new Date(),
    },
    {
        from:"Ramesh",
        to:"Suresh",
        msg:"Eat 5star DoNothing",
        created_at:new Date(),
    },
    {
        from:"Vimal",
        to:"Bimal",
        msg:"Download those files",
        created_at:new Date(),
    },


];

Chat.insertMany(allChats);

