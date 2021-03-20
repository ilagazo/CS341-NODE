const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
// const jsFileName = require("./fileNamePath");


express()
  .use(express.static(path.join(__dirname, "public")))
  .use(express.urlencoded({extended: true,}))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index"))
  .post("/Project2.html", getLesson)
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

  function getLesson(req, res) {
    const lessonNum = req.body.submit_lesson;

    console.log("Lesson Number is: " + lessonNum);
    
    if(lessonNum === "1") {
      res.render("./public/lesson1.html");
      res.end();
    }
  }