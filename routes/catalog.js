const express = require("express")
const router = express.Router()

router.get('/', (req, res) =>{
    res.render("catalog/index")
})

module.exports = router