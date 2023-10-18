// REST API demo in Node.js
var express = require("express");
var app = express();
var fs = require("fs");

// Endpoint for the root path
app.get("/", function (req, res) {
  res.send("Welcome to the Cloud Computing PaaS API");
});

// Endpoint to Get a list of users
app.get("/getCompany", function (req, res) {
  fs.readFile(__dirname + "/" + "server.json", "utf8", function (err, data) {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.end(data);
  });
});

// Create a server to listen at port 3000
// Create a server to listen at port 4000
var server = app.listen(4000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("REST API demo app listening at http://%s:%s", host, port);
});

// Step 1: Create a new user variable
var user = {
  company3: {
    id: 3,
    companyName: "dots",
    employee: {
      employee1: {
        name: "Alice Johnson",
        position: "Team Lead",
      },
      employee2: {
        name: "Bob Smith",
        position: "Developer",
      },
      employee3: {
        name: "Eve Davis",
        position: "Designer",
      },
      employee4: {
        name: "Charlie Brown",
        position: "Manager",
      },
      employee5: {
        name: "Grace Lee",
        position: "Analyst",
      },
    },
    location: "America",
  },
};

// The addUser endpoint
app.post("/addCompany", function (req, res) {
  // Step 2: read existing users
  fs.readFile(__dirname + "/" + "server.json", "utf8", function (err, data) {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    data = JSON.parse(data);
    // Step 3: append user variable to list
    data["company3"] = user["company3"];

    // Step 4: write data back to the file
    fs.writeFile(
      __dirname + "/" + "server.json",
      JSON.stringify(data),
      function (err) {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
          return;
        }
        console.log(data);
        res.end(JSON.stringify(data));
      }
    );
  });
});

// Code to delete a user by id
var id = 2;
app.delete("/deleteCompany", function (req, res) {
  // First retrieve existing users
  fs.readFile(__dirname + "/" + "server.json", "utf8", function (err, data) {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    var jsonData = JSON.parse(data);
    var companyIdToDelete = id;

    for (var companyName in jsonData) {
      if (jsonData[companyName].id == companyIdToDelete) {
        delete jsonData[companyName];
        // Write updated data back to the file
        fs.writeFile(
          __dirname + "/" + "server.json",
          JSON.stringify(jsonData),
          function (err) {
            if (err) {
              console.error(err);
              res.status(500).send("Internal Server Error");
              return;
            }
            res.end(JSON.stringify(jsonData));
          }
        );
        return;
      }
    }
  });
});

app.get("/:id", function (req, res) {
  // First retrieve existing user list
  fs.readFile(__dirname + "/" + "server.json", "utf8", function (err, data) {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    var users = JSON.parse(data);
    var user = users["company" + req.params.id];
    console.log(user);
    res.end(JSON.stringify(user));
  });
});

app.get("/company/:companyName", function (req, res) {
  // First retrieve existing user list
  fs.readFile(__dirname + "/" + "server.json", "utf8", function (err, data) {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    var users = JSON.parse(data);
    for (var company in users) {
      if (users[company].companyName == req.params.companyName) {
        var companyData = {
          companyName: users[company].companyName,
          employee: users[company].employee,
        };
        res.end(JSON.stringify(companyData));
        return;
      }
    }
  });
});
