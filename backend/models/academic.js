import mongoose from "mongoose";

const academicSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true, // Campo obligatorio
  },
  institucion: {
    type: String,
    required: true,
  },
  fechaInicio: {
    type: Date,
    required: true,
  },
  fechaTerminacion: {
    type: Date,
    required: true,
  },
});

const Academy = mongoose.model('Academic', academicSchema);
 export default Academy;