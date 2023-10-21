const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const requestModule = require("request");
const https = require("https");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
  const firstname = req.body.fname;
  const secondname = req.body.lname;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: secondname,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const url =  "https://us14.api.mailchimp.com/3.0/lists/b6b782d04a";
  
  const options = {
    method: "POST",
    auth: "Kavya:8ac6da74a328ad557f617e1dfa657070-us14"
  };
 // https.get(url,function(){      
    // })  this is for get data from external resource but now we want to post data for external resource.
  const request = https.request(url, options, function (response) {
    if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
    }
    else{
        res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});
app.post("/failure.html",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT||3000, function () {
  console.log("server is running on port 3000");
});

// after this we have one video that is on posting our server on web browser using git.