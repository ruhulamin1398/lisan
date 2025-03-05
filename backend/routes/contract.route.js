const express = require("express");
const router = express.Router();

// Profile route
router.post("/new", (req, res) => {
  const body = req.body;
  console.log("body is ", body);
  res.json({
    body,
  });
});

module.exports = router;
