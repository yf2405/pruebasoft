// Work Experience CRUD operations
import WorkExperience from "../models/workexperience.js";

// Create a work experience record
export const createWorkExperience = async (req, res) => {
  try {
    const newWorkExperience = new WorkExperience(req.body);
    await newWorkExperience.save();
    res.status(201).json(newWorkExperience);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all work experience records
export const getWorkExperiences = async (req, res) => {
  try {
    const workExperiences = await WorkExperience.find();
    res.status(200).json(workExperiences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single work experience record by ID
export const getWorkExperienceById = async (req, res) => {
  try {
    const workExperience = await WorkExperience.findById(req.params.id);
    if (!workExperience) return res.status(404).json({ message: "Record not found" });
    res.status(200).json(workExperience);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a work experience record
export const updateWorkExperience = async (req, res) => {
  try {
    const updatedWorkExperience = await WorkExperience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedWorkExperience) return res.status(404).json({ message: "Record not found" });
    res.status(200).json(updatedWorkExperience);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a work experience record
export const deleteWorkExperience = async (req, res) => {
  try {
    const deletedWorkExperience = await WorkExperience.findByIdAndDelete(req.params.id);
    if (!deletedWorkExperience) return res.status(404).json({ message: "Record not found" });
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
