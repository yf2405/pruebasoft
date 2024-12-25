import Academic from "../models/academic.js"

// Create an academic record
export const createAcademic = async (req, res) => {
  try {
    const newAcademic = new Academic(req.body);
    await newAcademic.save();
    res.status(201).json(newAcademic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all academic records
export const getAcademics = async (req, res) => {
  try {
    const academics = await Academic.find();
    res.status(200).json(academics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single academic record by ID
export const getAcademicById = async (req, res) => {
  try {
    const academic = await Academic.findById(req.params.id);
    if (!academic) return res.status(404).json({ message: "Record not found" });
    res.status(200).json(academic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an academic record
export const updateAcademic = async (req, res) => {
  try {
    const updatedAcademic = await Academic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAcademic) return res.status(404).json({ message: "Record not found" });
    res.status(200).json(updatedAcademic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an academic record
export const deleteAcademic = async (req, res) => {
  try {
    const deletedAcademic = await Academic.findByIdAndDelete(req.params.id);
    if (!deletedAcademic) return res.status(404).json({ message: "Record not found" });
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};