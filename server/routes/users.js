const router = require("express").Router();
const User = require("../modal/loginusers");

// save login user details

router.post("/",async(req,res)=>{
    const newUser = new User(req.body);
  
    try {
        const saveUser = await newUser.save();
        
        res.status(200).json(saveUser)
    } catch (error) {
        res.status(500).json(error)
    }
});

//get user details

router.get("/",async(req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})

//add message

router.put("/:_id",async (req,res)=>{
    try {
      var up={

           messages: req.body.messages
      }
     
      const Messages = await User.findByIdAndUpdate(req.params._id,{$set:up});
      console.log(Messages)
      if(!Messages){
        res.status(400).json();
      }
     else{

         res.status(200).json(Messages);
     }
    } catch (error) {
        res.status(500).json(error);
    }
  })

module.exports=router;