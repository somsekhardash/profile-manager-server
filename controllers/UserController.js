import User from "../models/UserModel.js";
import expValidator from "express-validator";
const { body, validationResult } = expValidator;

import {
  validationErrorWithData,
  ErrorResponse,
  successResponseWithData,
} from "../helpers/apiResponse.js";

// export const getUsers = [
//   (req, res) => {
//     try {
//       const errors = validationResult(req);
//       const { tournamentId } = req.query;
//       if (!errors.isEmpty()) {
//         return validationErrorWithData(
//           res,
//           "Validation Error.",
//           errors.array()
//         );
//       } else {
//         const query = tournamentId ? { _id: tournamentId } : {};

//         if (tournamentId) {
//           Tournament.find(query)
//             .populate("users")
//             .then((users) => {
//               if (users.length) {
//                 return successResponseWithData(res, "Operation success", users);
//               } else {
//                 return successResponseWithData(res, "Operation success", []);
//               }
//             })
//             .catch((err) => {
//               return ErrorResponse(res, err);
//             });
//         } else {
//           User.find(query)
//             .then((users) => {
//               if (users.length) {
//                 return successResponseWithData(res, "Operation success", users);
//               } else {
//                 return successResponseWithData(res, "Operation success", []);
//               }
//             })
//             .catch((err) => {
//               return ErrorResponse(res, err);
//             });
//         }
//       }
//     } catch (err) {
//       return ErrorResponse(res, err);
//     }
//   },
// ];

export const createUser = [
  body("userName")
    .isLength({ min: 1 })
    .trim()
    .withMessage("User Name must be specified.")
    .isAlphanumeric()
    .withMessage("User Name has non-alphanumeric characters."),
  (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        const user = new User({
          userName: "test_user@condenast.com",
          status: "New"
        });
        user
          .save()
          .then((newuser) => {
            return successResponseWithData(res, "User Created", newuser);
          })
          .catch((err) => {
            return ErrorResponse(res, err);
          });
      }
    } catch (err) {
      return ErrorResponse(res, err);
    }
  },
];