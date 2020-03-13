const express = require("express");
const project = require("./projectModel.js");
const router = express.Router();


//projects:
//{
    //id(#),name(''),description(''),completed(boolean)
//}

//get all projects
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

//get project by id
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
        console.log("failure poject.get", error);
        res.status(500).json({
          error: "That project could not be retrieved."
        });
    });
});

//add new project
router.post("/", validateProject, (req, res) => {
    project.insert(req.body)
    .then(project => {
        res.status(201).json({project})
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "could not save new project"
        })
    })
});

//need id and changes to change project,; return null if not found
router.put("/:id", validateProjectId, (req, res) => {
    project.update(req.params.id)
});

//remove project by id
router.delete("/:id", validateProjectId, (req, res) => {
    project.remove(req.params.id)
});

//get actions by project id
router.get("/:id/actions", validateProjectId, (req, res) => {
    project.getProjectActions(req.body.id)
});


function validateProjectId(req, res, next){
    project.get(req.params.id)
    .then(
      project => {
        if(project){
          req.project = project;
          req.id = req.params.id
          next();
        } else {
            res.status(404).json({
                message: "Invalid project id"
            })
        }
      }
    )
    .catch(error=> {
      res.status(500).json({
          message: "could not fetch through validation"
      })
    })
  
    next();
  };

function validateProject(req, res, next){
    project.get(req.body)
    .then(
        project => {if(!req.body.name || !req.body.description){
            res.status(400).json({
                errorMessage: "Project must include name and description"
            })
        } else {
            res.status(201).json(project)
        }
        })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "could not post new project"
        })
    })
}
module.exports = router;