import express from "express";
import {
  getConsultations,
  getConsultation,
  createConsultation,
  updateConsultation,
  deleteConsultation,
} from "../controllers/consultations";
import { protect, authorize } from "../middleware/auth";

const router = express.Router();

router.use(protect);

router
  .route("/")
  .get(getConsultations)
  .post(authorize("officer"), createConsultation);

router
  .route("/:id")
  .get(getConsultation)
  .patch(authorize("officer"), updateConsultation)
  .delete(authorize("officer"), deleteConsultation);

export default router;
