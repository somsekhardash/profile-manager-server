import express from "express";
import { userLogin, userLogout } from "../controllers/AuthController.js";
import {
  createUser,
//   updateUser,
//   getUsers,
//   UserDelete,
} from "../controllers/UserController.js";
const { Router } = express;
const router = Router();
import jsonwebtoken from "jsonwebtoken";
const { verify } = jsonwebtoken;

import {
    successResponseWithData,
  } from "../helpers/apiResponse.js";

router.get("/", (_req, res) => {
  res.send("Hello");
});

router.post("/verify", (_req, res) => {
    verify(_req.body.token, '7032300186', function(err, decoded) {
        return successResponseWithData(res, "verification Successful.", decoded);
    });
});

router.post("/create-user", createUser);
// router.post("/update-user", updateUser);
// router.get("/get-users", getUsers);
// router.delete("/delete-user", UserDelete);

router.post("/login-user", userLogin);
router.post("/logout-user", userLogout);

export default router;