const { response } = require("express");
const express = require("express");
const { request } = require("http");
const path = require("path");
const PORT = process.env.PORT || 5000;

express()
  .use(express.static(path.join(__dirname, "public")))
  .use(
    express.urlencoded({
      extended: true,
    })
  )
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index"))
  .post("/postRateCalculator.html", calculateRate)
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

function calculateRate(req, res) {
  // Remember: request.query goes off of the name of the input
  // Retrieve the values from the POST form
  const weight = Number(req.body.weight);
  const mailType = req.body.mailType;
  var rate = 0;
  var errorMessage = "Good Job! No Error";

  //  If Weight is 0 or Negative
  if (weight <= 0 || mailType === "") {
    errorMessage ="ERROR: Weight cannot be Zero or Negative! OR Error: No Mail Type Selected!";
    return;
  }

  // Option 1: Stamped
  if (mailType === "Letters (Stamped)") {
    if (weight <= 1) {
      rate = 0.55;
    } else if (weight > 1 && weight <= 2) {
      rate = 0.75;
    } else if (weight > 2 && weight <= 3) {
      rate = 0.95;
    } else if (weight > 3 && weight <= 3.5) {
      rate = 1.15;
    } else {
      errorMessage = "Weight is over 3.5 Ounces! See Large Envelope Prices!";
    }
  }
  // Option 2: Metered
  if (mailType === "Letters (Metered)") {
    if (weight <= 1) {
      rate = 0.51;
    } else if (weight > 1 && weight <= 2) {
      rate = 0.71;
    } else if (weight > 2 && weight <= 3) {
      rate = 0.91;
    } else if (weight > 3 && weight <= 3.5) {
      rate = 3.5;
    } else {
      errorMessage = "Weight is over 3.5 Ounces! See Large Envelope Prices!";
    }
  }
  // Option 3: Flats
  if (mailType === "Large Envelopes (Flats)") {
    if (weight <= 1) {
      rate = 1.0;
    } else if (weight > 1 && weight <= 2) {
      rate = 1.2;
    } else if (weight > 2 && weight <= 3) {
      rate = 1.4;
    } else if (weight > 3 && weight <= 4) {
      rate = 1.6;
    } else if (weight > 4 && weight <= 5) {
      rate = 1.8;
    } else if (weight > 5 && weight <= 6) {
      rate = 2.0;
    } else if (weight > 6 && weight <= 7) {
      rate = 2.2;
    } else if (weight > 7 && weight <= 8) {
      rate = 2.4;
    } else if (weight > 8 && weight <= 9) {
      rate = 2.6;
    } else if (weight > 9 && weight <= 10) {
      rate = 2.8;
    } else if (weight > 10 && weight <= 11) {
      rate = 3.0;
    } else if (weight > 11 && weight <= 12) {
      rate = 3.2;
    } else if (weight > 12 && weight <= 13) {
      rate = 3.4;
    } else {
      errorMessage = "Weight is over 13 Ounces! Contact USPS for more options!";
    }
  }
  // Option 4: First-Class
  if (mailType === "First-Class Package Service - Retail (Zone 1 & 2 Only)") {
    if (weight > 0 && weight <= 4) {
      rate = 4.0;
    } else if (weight > 4 && weight <= 8) {
      rate = 4.8;
    } else if (weight > 8 && weight <= 12) {
      rate = 5.5;
    } else if (weight > 12 && weight <= 13) {
      rate = 6.25;
    } else {
      errorMessage = "Weight is over 13 Ounces! Contact USPS for more options!";
    }
  }

  // // Set up JSON object
  const params = {
    mailRate: rate,
    weight: weight,
    mailType: mailType,
    errorMessage: errorMessage
  };

  // //  Render the response using EJS page
  res.render("pages/postalRateCalculator", params);
  res.end();
}
