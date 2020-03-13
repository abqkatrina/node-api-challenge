const express = require("express");
const action = require("./actionModel.js");
const router = express.Router();

//actions:
//{
    //id(#), project_id(#),desciption(''),notes(''), completed(boolean)
//}

//get actions by project id
router.get("/:project_id/actions", (req, res) => {
    action.get(req.params.project_id)
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


router.get("/posts/:project_id/:id", validateActionId, (req, res) => {
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

router.post("/",(req, res) => {
    action.insert(req.query)
    /* make sure the `project_id` provided belongs to an existing `project`.*/
})

router.put("/", validateActionId, (req, res) => {
    action.update()
})

router.delete("/", validateActionId, (req, res) => {
    action.remove()
})

function validateActionId(req, res, next){
    action.get(req.params.action_id)
    .then(
      user => {
        if(user){
          req.user = user;
          req.id = req.params.user_id
          next();
        }
      }
    )
    .catch(error=> {
      res.status(500).json({})
    })
    req.user_id
  
    next();
  };

module.exports = router;