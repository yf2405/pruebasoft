import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
    salaryRange: { type: String, required: true },
    professionalLevel: { type: String, required: true },
    fullName: { type: String, required: true },
    profession: { type: String, required: true },
    specialization: { type: String },
    documentNumber: { type: String, required: true },
    city: { type: String, required: true },
    willingToRelocate: { type: Boolean, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    linkedin: { type: String },
    addedValue: { type: String, required: true },
    addedHappyWorkValue: { type: String, required: true },
    addedProfessionalValue: { type: String, required: true },
 
});

const Candidate = mongoose.model('Candidate', candidateSchema);

export default Candidate