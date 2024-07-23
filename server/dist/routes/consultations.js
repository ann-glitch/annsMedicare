"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const consultations_1 = require("../controllers/consultations");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.use(auth_1.protect);
router
    .route("/")
    .get(consultations_1.getConsultations)
    .post((0, auth_1.authorize)("officer"), consultations_1.createConsultation);
router
    .route("/:id")
    .get(consultations_1.getConsultation)
    .patch((0, auth_1.authorize)("officer"), consultations_1.updateConsultation)
    .delete((0, auth_1.authorize)("officer"), consultations_1.deleteConsultation);
exports.default = router;
