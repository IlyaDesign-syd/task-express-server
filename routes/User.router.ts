import { Response, Request } from "express";
import {
  UserRequest,
  UserResponse,
} from "../types/User.types";
import { User } from "../models/User.model";
import { AuthenticatedRequest } from "../types/Token";
const express = require("express");
const userRouter = express.Router();
const jwtCheck = require("../middleware/checkToken");

// All routes will start with /users
userRouter.get(
  "/user",
  jwtCheck,
  (
    req: AuthenticatedRequest,
    res: Response<UserResponse | { message: string }>
  ) => {
    const auth0Id = req.auth?.payload?.sub;

    if (!auth0Id) {
      return res
        .status(401)
        .json({ message: "Unauthorized. User token sub not found" });
    }

    User.findOne({ auth0Id })
      .then((user) => {
        if (user) {
          const { auth0Id, email, firstName, lastName, createdAt, updatedAt } =
            user;
          return res.json({
            isUserRegistered: true,
            auth0Id,
            email,
            firstName,
            lastName,
          });
        } else {
          return res.json({ isUserRegistered: false });
        }
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      });
  }
);

// Onboarding - if user already exists, return error
userRouter.post(
  "/user",
  jwtCheck,
  async (
    req: AuthenticatedRequest & Request<{}, {}, UserRequest>,
    res: Response<UserResponse | { message: string }>
  ) => {
    const { email, firstName, lastName } = req.body;
    const auth0Id = req.auth?.payload?.sub;

    console.log("registry token:");
    console.log(auth0Id);

    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) return res.status(400).json({ message: "User already registered" });

    User.create({ auth0Id, email, firstName, lastName, createdAt: new Date() })
      .then(() => {
        return res.json({ isUserRegistered: true, email, firstName, lastName });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ message: "Failed to register user" });
      });
  }
);

export default userRouter;
