const express = require("express");
const project = require("./projectModel.js");
const router = express.Router();


//projects:
//{
    //id(#),name(''),description(''),completed(boolean)
//}

router.get("/", (req, res) => {
    project.get(req.query)
    .then(projects =>{
        res.status(200).json(projects);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "The projects could not be retrieved."
        })
    })
});

router.get("/:id", (req, res) => {
    project.get(req.params.id)
      .then(project => {
        if (project) {
          res.status(200).json(project);
        } else {
            res.status(404).json({
               message: "The project with the specified ID does not exist." 
            });
        }
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          error: "The post information could not be retrieved."
        });
      });
  });

router.post("/", (req, res) => {
    project.insert()
});

router.put("/", (req, res) => {
    project.update()
});

router.delete("/", (req, res) => {
    project.remove()
});

router.get("/", (req, res) => {
    project.getProjectActions()
});