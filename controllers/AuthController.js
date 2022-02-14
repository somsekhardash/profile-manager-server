import {
    validationErrorWithData,
    successResponseWithData,
    ErrorResponse,
    successResponse,
  } from "../helpers/apiResponse.js";
  import expValidator from "express-validator";
  const { body, validationResult } = expValidator;
  import User from "../models/UserModel.js";
  import jsonwebtoken from "jsonwebtoken";
  const { sign } = jsonwebtoken;
  let refreshTokens = [];
  
  export const userLogin = [
    body("userName")
      .isLength({ min: 1 })
      .trim()
      .withMessage("userName must be specified."),
    (req, res) => {
      try {
        const errors = validationResult(req);
        const { userName } = req.body;
  
        if (!errors.isEmpty()) {
          return validationErrorWithData(
            res,
            "Validation Error.",
            errors.array()
          );
        }
        User.findOne({ userName: userName })
          .then((user) => {
            if (user) {
                const userData = {
                  _id: user._id,
                  userName: user.userName
                };
                const jwtPayload = userData;
                const jwtData = {
                  expiresIn: 86400,
                };
                userData.token = sign(jwtPayload, "7032300186", jwtData);
                return successResponseWithData(res, "Login Success.", userData);
            } else {
                const user = new User({
                    userName: req.body.userName,
                    status: "New"
                });
                user
                    .save()
                    .then((newuser) => {
                        const jwtPayload = newuser;
                        const jwtData = {
                          expiresIn: 86400,
                        };
                        newuser.token = sign(jwtPayload, "7032300186", jwtData);
                        return successResponseWithData(res, "Login Success.", newuser);
                    })
                    .catch((err) => {
                      return ErrorResponse(res, err);
                    });
            }
          })
          .catch((err) => {
            return ErrorResponse(res, err);
          });
      } catch (err) {
        return ErrorResponse(res, err);
      }
    },
  ];
  
  export async function userLogout(req, res) {
    try {
      const errors = validationResult(req);
      const { accessToken } = req.body;
      if (!errors.isEmpty()) {
        return validationErrorWithData(res, "Validation Error.", errors.array());
      }
      refreshTokens = [...refreshTokens.filter((token) => accessToken !== token)];
      successResponse(res, "User Logged Out");
    } catch (err) {
      return ErrorResponse(res, err);
    }
  }