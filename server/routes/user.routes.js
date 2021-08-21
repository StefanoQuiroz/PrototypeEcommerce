const {findUser, findSingleUser, createUser, updateUser, deleteUser, login} = require("../controllers/user.controller");
//const {authenticate} = require("../config/jwt.config");
const express = require("express");
const router = express();

/* 
router.get("/users", authenticate, findUser);
router.get("/user/:id", authenticate, findSingleUser);
router.post("/user/new", authenticate, createUser);
router.post("/login", authenticate, login);
router.put("/users/update/:id", authenticate, updateUser);
router.delete("/users/delete/:id", authenticate, deleteUser);
*/

router.get("/users", findUser);
router.get("/user/:id", findSingleUser);
router.post("/user/new", createUser);
router.post("/login", login);
router.put("/users/update/:id", updateUser);
router.delete("/users/delete/:id", deleteUser);

module.exports = router; 