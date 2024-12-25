import express from "express";
import {
  createAcademic,
  getAcademics,
  getAcademicById,
  updateAcademic,
  deleteAcademic,
} from "../controllers/academicController.js";

const academicRouter = express.Router();

academicRouter.post("/academics", createAcademic);
academicRouter.get("/academics", getAcademics);
academicRouter.get("/academics/:id", getAcademicById);
academicRouter.put("/academics/:id", updateAcademic);
academicRouter.delete("/academics/:id", deleteAcademic);

export default academicRouter;