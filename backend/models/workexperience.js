import mongoose from "mongoose";

const workExperienceSchema = new mongoose.Schema({
  cargo: {
    type: String,
    required: true, // Campo obligatorio
  },
  empresa: {
    type: String,
    required: true,
  },
  fechaInicio: {
    type: Date,
    required: true,
  },
  fechaTerminacion: {
    type: Date,
    required: false, 
  },
  trabajaActualmente: {
    type: Boolean,
    default: false,
  },
  logros: {
    type: [String], // Arreglo de strings para almacenar logros
    
  },
  recursosAdicionales: {
    type: [String], // URLs de certificados, fotos o premios
    default: [],
  },
});

// Validador personalizado para asegurarse de que el arreglo contenga exactamente 3 logros
const WorkExperience = mongoose.model('WorkExperience', workExperienceSchema);

export default  WorkExperience