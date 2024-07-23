import mongoose, { Document, Model } from "mongoose";

export interface ConsultationDocument extends Document {
  patient: mongoose.Schema.Types.ObjectId;
  consultationDate: Date;
  doctor: string;
  medicalCondition: string;
  consultationType: string;
  consultationFee: string;
  followUpInstructions: string;
  officer: mongoose.Schema.Types.ObjectId;
  slug: string;
  createdAt: Date;
}

// Define interface for Bootcamp mongoose model
interface ConsultationModel extends Model<ConsultationDocument> {}

// Mongoose schema definition
const ConsultationSchema = new mongoose.Schema<ConsultationDocument>({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please select a patient"],
  },

  consultationDate: {
    type: Date,
    required: [true, "Please add a consultation date"]
  },

  doctor: {
    type: String,
    required: [true, "Please select a doctor"]
  },

  medicalCondition: {
    type: String,
  },

  consultationType: {
    type: String,
    required: [true, "Please select a consultation type"]
  },

  officer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Consultation = mongoose.model<ConsultationDocument, ConsultationModel>("Consultation", ConsultationSchema);

export default Consultation;
