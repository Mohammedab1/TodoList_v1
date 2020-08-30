
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

console.log(date);

const app = express();

app.use(express.static("public"));


let items = [];
let workItems = [];

 app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine' , 'ejs');

app.get("/", function(req, res) {
    let day = date.getDate();
    res.render("list" , {listTitle : day , newlistitems : items });

});
app.post("/" , function(req , res){
  let item = req.body.newitem;
  if(req.body.List === "Work"){
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});


app.get("/work", function(req, res){
  res.render("list" , {listTitle : "Work List" , newlistitems : workItems});
});

app.get("/about" , function(req , res){
  res.render("about");
})
app.listen(3000, function() {
  console.log("Server has started on port 3000");
});
