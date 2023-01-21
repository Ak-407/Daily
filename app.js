const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { log } = require("console");

const app = express();

mongoose.set('strictQuery', true);
// mongoose.connect("mongodb://localhost:27017/dubbDB", {useNewUrlParser: true});
mongoose.connect("mongodb+srv://jsamaan:amaan123@cluster0.vz55wc0.mongodb.net/jsamaan?retryWrites=true&w=majority",{ useNewUrlParser: true , useUnifiedTopology: true });
const Items = mongoose.Schema({
    name:String,
    
})

const Item = mongoose.model("Item", Items);


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");



const item = new Item({
    name:"First role"
})

const item1 = new Item({
    name:"Second role"
})

const item2 = new Item({
    name:"Thirtd role"
})

const allitems = [item,item1,item2];

// Item.insertMany(allitems, function(err,item){
//     if(!err){
//         console.log(item);
//     }
//     else{
//         console.log("not Saved");
//     }
// })








app.get("/",function(req,res){
    var today= new Date();
    var option={
        weekday: "long",
        year: "numeric",
        month:"short",
        day: "numeric" 
    };

    var dat = today.toLocaleDateString('en-UN', option);
    Item.find({ }, function(err, founditem){
        if(founditem.length === 0){
            Item.insertMany(allitems, function(err,item){
                if(err){
                    console.log("not Saved");
                }
                else{
                    console.log("Saved Your Work");
                }
                res.render("/");
            })
        }
        else{
            res.render("list", {day:"Today", another:founditem});
        }
    })
    
    })

app.post("/", function(req,res){
    var additem = req.body.add;
    console.log(additem);
    const newitem = new Item({
        name:additem,
    })
    newitem.save();
    res.redirect("/");
})

app.post("/delete", function(req,res){
    const deleteitem = req.body.check;
    console.log(deleteitem);
    Item.deleteOne({_id:deleteitem}, function(err, founditem){
        if(!err){
            console.log("All Good");
        }
        else{
            console.log("NOT SAVED");
        }
        res.redirect("/");
    });
})




app.listen("1000", function(req, res){
    console.log("port 1000 is running");
})