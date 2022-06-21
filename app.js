const express = require("express");
const https = require("https");
require("dotenv").config();
const app = express();

app.use(express.urlencoded({ extended: true }));

// This is telling express to listen to requests to / and run the callback function when it sees one.
app.get("/", function (req, res) {
  //important that is writes sendFIle otherwise it wont appear
  res.sendFile(__dirname + "/index.html");
  //   var weather =
  //     "<h1>The weather in Astoria is " + temp + " degrees farenheight</h1>";
  //   var desc = "<p>The weather is currently " + descr + "</p>";
  //   res.send(weather + desc);
  //   const object = {
  //     name: "Bryan",
  //     favoriteFood: "Pizza",
  //   };
  //   console.log(JSON.stringify(object));
  //   res.send("Server is up and running");
});

app.post("/", function (req, res) {
  //   console.log("Post received.");

  const query = req.body.cityName;

  console.log(process.env.WEATHER_API_KEY);
  const apiKey = process.env.WEATHER_API_KEY;
  const unit = "imperial";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      console.log(temp);
      const descr = weatherData.weather[0].description;
      console.log(descr);
      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(imgURL);
      res.setHeader("Content-Type", "text/html");
      res.write(
        "<h1>The weather in " +
          query +
          " is " +
          temp +
          " degrees fahrenheit</h1>"
      );
      res.write("<p>The weather is currently " + descr + "</p>");
      res.write("<img src=" + imgURL + ">");

      res.send();
    });
  });
});

app.listen(5500, function () {
  console.log("Server is running on port 5500");
});
