"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteConsultation = exports.updateConsultation = exports.createConsultation = exports.getConsultation = exports.getConsultations = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Consultation_1 = __importDefault(require("../models/Consultation"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
// @description Get all consultations
// @route GET /api/v1/consultations
// @access Public
exports.getConsultations = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let query;
    const reqQuery = Object.assign({}, req.query);
    const removeFields = ["select", "sort", "page", "limit"];
    removeFields.forEach((param) => delete reqQuery[param]);
    // Filter consultations by patient's ID for non-officers
    if (req.user && req.user.role !== 'officer') {
        reqQuery.patient = req.user.id;
    }
    query = Consultation_1.default.find(reqQuery);
    if (req.query.select) {
        const fields = req.query.select.split(",").join(" ");
        query = query.select(fields);
    }
    if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
    }
    else {
        query = query.sort("-createdAt");
    }
    //pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = yield Consultation_1.default.countDocuments();
    query = query.skip(startIndex).limit(limit);
    const consultations = yield query;
    //pagination result
    const pagination = {};
    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit,
        };
    }
    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit,
        };
    }
    res.status(200).json({
        success: true,
        count: consultations.length,
        pagination,
        data: consultations,
    });
}));
// @description Get single consultation
// @route GET /api/v1/consultations/:id
// @access Public
exports.getConsultation = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let query = Consultation_1.default.findById(req.params.id);
    // If the user is not an officer, filter by patient ID
    if (req.user && req.user.role !== 'officer') {
        query = query.where({ patient: req.user.id });
    }
    const consultation = yield query;
    if (!consultation) {
        return next(new errorResponse_1.default(`Consultation with id ${req.params.id} does not exist`, 404));
    }
    res.status(200).json({
        success: true,
        data: consultation,
    });
}));
// @description Create new consultation
// @route Consultation /api/v1/consultations
// @access Public
exports.createConsultation = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // add user to req.body
    req.body.officer = req.user.id;
    const consultation = yield Consultation_1.default.create(req.body);
    res.status(201).json({
        success: true,
        data: consultation,
    });
}));
// @description Update consultation
// @route PUT /api/v1/consultations/:id
// @access Private
exports.updateConsultation = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let consultation = yield Consultation_1.default.findById(req.params.id);
    if (!consultation) {
        return next(new errorResponse_1.default(`Consultation with id ${req.params.id} does not exist`, 404));
    }
    consultation = yield Consultation_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        success: true,
        data: consultation,
    });
}));
// @description Delete consultation
// @route DELETE /api/v1/consultations/:id
// @access Private
exports.deleteConsultation = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const consultation = yield Consultation_1.default.findById(req.params.id);
    if (!consultation) {
        return next(new errorResponse_1.default(`Consultation with id ${req.params.id} does not exist`, 404));
    }
    yield Consultation_1.default.deleteOne();
    res.status(200).json({
        success: true,
        data: {},
    });
}));
