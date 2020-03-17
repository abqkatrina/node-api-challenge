const express = require("express");
const action = require("./actionModel.js");
const router = express.Router();

//actions:
//{
    //id(#), project_id(#),desciption(''),notes(''), completed(boolean)
//}

//get actions by project id WORKS
router.get("/:project_id/actions", (req, res) => {
    action.get(req.body.project_id)
    .then(actions =>{
        if (actions) {
            res.status(200).json(actions);
          } else {
              res.status(404).json({
                 message: "The actions with the specified project ID do not exist." 
              });
            }
        })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "The actions could not be retrieved."
    })})
});

//get a single action by id and project id WORKS
router.get("/:project_id/:id", (req, res) => {
    action.get(req.params.id)
      .then(action => {
        if (action) {
          res.status(200).json(action);
        } else {
            res.status(404).json({
               message: "The action with the specified ID does not exist." 
            });
        }
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          error: "That action could not be retrieved."
        });
    });
});

//add action to project by project id WORKS
router.post("/:project_id",(req, res) => {
    action.insert(req.body, req.params.id)
    /* make sure the `project_id` provided belongs to an existing `project`.*/
    .then(project => {
    if(req.body.project_id){
      res.status(200).json({ message: "added action"})
    } else { 
      res.status(400).json({ errorMessage: "could not add action"})
    }})
   .catch(error => { res.status(500).json({ error: "could not fetch project"})
   })
})

//change action WORKS
router.put("/:project_id/:id", (req, res) => {
    action.update(req.params.id, req.body)
    .then(action => {
      if(action){
        res.status(200).json({ message: "action changed successfully"})
      } else {
        res.status(404).json({ error: "action not found"})
      }
    })
    .catch(error=>{
      res.status(500).json({ error: "could not load action"})
    })
})

//delete action WORKS
router.delete("/:project_id/:id", (req, res) => {
    action.remove(req.params.id)
    .then(project => {
      res.status(201).json({ project, message: "action deleted"})
    })
    .catch(error => {
      res.status(500).json({ error: "could not load project actions"})
    })
})

// function validateActionId(req, res, next){
//     action.get(req.params.action_id)
//     .then(
//       user => {
//         if(user){
//           req.user = user;
//           req.id = req.params.user_id
//           next();
//         }
//       }
//     )
//     .catch(error=> {
//       res.status(500).json({})
//     })
//     req.user_id
  
//     next();
//   };

module.exports = router;