import { Response, Request, Router } from "express";
import { AuthenticatedRequest } from "../types/Token";
import { ProjectRequest, ProjectResponse } from "../types/Project.types";
import { v4 as uuidv4 } from 'uuid';
import { Project } from "../models/Project.model";
import { DEFAULT_TASK_COLS } from "../consts/defaultValues";

// All routes will start with /projects
import express from "express";
const projectRouter = express.Router();
const jwtCheck = require("../middleware/checkToken");


// User creates empty project - return with default task columns
projectRouter.post("/:projectId", jwtCheck, (req: AuthenticatedRequest & Request<{projectId: string}, {}, ProjectRequest>, res: Response<ProjectResponse | { message: string }>) => {
  console.log("received project create request");
  const {projName, projDescription} = req.body;
  const auth0Id = req.auth?.payload?.sub;
  const projId = req.params.projectId;
  console.log(projId);

  // Each new project starts with the same default columns (but each unique ID, since cols can be renamed later)
  const initialTaskCols = DEFAULT_TASK_COLS;
  initialTaskCols.forEach((col) => (col.columnId = uuidv4()));

  Project.create({ auth0Id, projId, projName, projDescription, taskColumns: initialTaskCols, createdAt: new Date() })
    .then(() => {
      return res.json({ projId, projName, projDescription, taskColumns: initialTaskCols });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: "Failed to create project" });
    });
});

export default projectRouter;