"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patients_1 = require("../controllers/patients");
const router = express_1.default.Router({ mergeParams: true });
const auth_1 = require("../middleware/auth");
router.use(auth_1.protect);
router.use((0, auth_1.authorize)("officer"));
router.route("/").get(patients_1.getPatients).post(patients_1.createPatient);
router.route("/:id").get(patients_1.getSinglePatient).patch(patients_1.updatePatient).delete(patients_1.deletePatient);
exports.default = router;
