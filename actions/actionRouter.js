const express = require("express");

const action = require("./actionModel.js");

const router = express.Router();

//actions:
//{
    //id(#), project_id(#),desciption(''),notes(''), completed(boolean)
//}

router.get("/", (req, res) => {
    action.get(req.query)
})

router.post("/",(req, res) => {
    action.insert(req.query)
})

router.put("/",(req, res) => {
    action.update()
})

router.delete("/",(req, res) => {
    action.remove()
})
