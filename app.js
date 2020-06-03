//jshint esversion:7
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const Fname = req.body.fname;
  const Lname = req.body.lname;
  const Email = req.body.email;
  const data = {
    members: [{
      email_address: Email,
      status: "subscribed",
      merge_fields: {
        FNAME: Fname,
        LNAME: Lname
      }
    }]
  };
  const jsonData = JSON.stringify(data);
  const url = " https://us10.api.mailchimp.com/3.0/lists/c28962f5d7";

  const options = {
    method: "POST",
    auth: "ashish1:7467ce2fc331ae7f9130be4c64e768ef-us10"
  };
  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200){
    res.sendFile(__dirname+"/success.html");}
    else{
    res.sendFile(__dirname+"/failure.html");
  }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });

  });
//  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server Port:3000.");
});


// api key
// 7467ce2fc331ae7f9130be4c64e768ef-us10

// c28962f5d7
