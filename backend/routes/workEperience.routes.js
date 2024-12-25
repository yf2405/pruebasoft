import express from 'express';
import {
    createWorkExperience,
    getWorkExperiences,
    getWorkExperienceById,
    updateWorkExperience,
    deleteWorkExperience,
  } from "../controllers/workExperienceController.js";
  
  const workExperienceRouter = express.Router();
  
  workExperienceRouter.post("/work-experiences", createWorkExperience);
  workExperienceRouter.get("/work-experiences", getWorkExperiences);
  workExperienceRouter.get("/work-experiences/:id", getWorkExperienceById);
  workExperienceRouter.put("/work-experiences/:id", updateWorkExperience);
  workExperienceRouter.delete("/work-experiences/:id", deleteWorkExperience);
  
  export default workExperienceRouter;
  