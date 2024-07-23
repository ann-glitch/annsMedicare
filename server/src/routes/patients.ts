import express from "express";
import {
  getPatients,
  getSinglePatient,
  createPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patients";

const router = express.Router({ mergeParams: true });
import { protect, authorize } from "../middleware/auth";

router.use(protect);
router.use(authorize("officer"));

router.route("/").get(getPatients).post(createPatient);

router.route("/:id").get(getSinglePatient).patch(updatePatient).delete(deletePatient);

export default router;
