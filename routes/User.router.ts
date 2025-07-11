import { UserRequest, UserResponse } from "../types/User.types";
import { Response } from 'express';
import {User} from "../models/User.model";
const express = require('express')
const userRouter = express.Router()
const jwtCheck = require('../middleware/checkToken');


// All routes will start with /users
userRouter.get('/user', jwtCheck, (req: UserRequest, res: Response<UserResponse | { message: string }>) => {
  const auth0Id = req.auth?.payload?.sub;

  if (!auth0Id) {
    return res.status(401).json({ message: 'Unauthorized. User token sub not found' });
  }

  User.findOne({ auth0Id })
    .then((user) => {
      if (user) {
        const { auth0Id, email, firstName, lastName, createdAt, updatedAt } = user;
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
    .catch(err => {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    });
});

export default userRouter;