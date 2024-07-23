"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Mongoose schema definition
const ConsultationSchema = new mongoose_1.default.Schema({
    patient: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Consultation = mongoose_1.default.model("Consultation", ConsultationSchema);
exports.default = Consultation;
