import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Consultation from "../models/Consultation";
import ErrorResponse from "../utils/errorResponse";

// @description Get all consultations
// @route GET /api/v1/consultations
// @access Public
export const getConsultations = asyncHandler(async (req: any, res: any) => {
  let query;

  const reqQuery = { ...req.query };

  const removeFields = ["select", "sort", "page", "limit"];

  removeFields.forEach((param) => delete reqQuery[param]);

  // Filter consultations by patient's ID for non-officers
  if (req.user && req.user.role !== 'officer') {
    reqQuery.patient = req.user.id;
  }

  query = Consultation.find(reqQuery);

  if (req.query.select) {
    const fields = (req.query.select as string).split(",").join(" ");
    query = query.select(fields);
  }

  if (req.query.sort) {
    const sortBy = (req.query.sort as string).split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  //pagination
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Consultation.countDocuments();

  query = query.skip(startIndex).limit(limit);

  const consultations = await query;

  //pagination result
  const pagination: any = {};

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
});

// @description Get single consultation
// @route GET /api/v1/consultations/:id
// @access Public
export const getConsultation = asyncHandler(
  async (req: any, res: any, next: NextFunction) => {
    let query = Consultation.findById(req.params.id);

    // If the user is not an officer, filter by patient ID
    if (req.user && req.user.role !== 'officer') {
      query = query.where({ patient: req.user.id });
    }

    const consultation = await query;

    if (!consultation) {
      return next(
        new ErrorResponse(`Consultation with id ${req.params.id} does not exist`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: consultation,
    });
  }
);
// @description Create new consultation
// @route Consultation /api/v1/consultations
// @access Public
export const createConsultation = asyncHandler(async (req: any, res: any) => {
  // add user to req.body
  req.body.officer = req.user.id;

  const consultation = await Consultation.create(req.body);

  res.status(201).json({
    success: true,
    data: consultation,
  });

});

// @description Update consultation
// @route PUT /api/v1/consultations/:id
// @access Private
export const updateConsultation = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let consultation = await Consultation.findById(req.params.id);

    if (!consultation) {
      return next(
        new ErrorResponse(`Consultation with id ${req.params.id} does not exist`, 404)
      );
    }

    consultation = await Consultation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: consultation,
    });
  }
);

// @description Delete consultation
// @route DELETE /api/v1/consultations/:id
// @access Private
export const deleteConsultation = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const consultation = await Consultation.findById(req.params.id);

    if (!consultation) {
      return next(
        new ErrorResponse(`Consultation with id ${req.params.id} does not exist`, 404)
      );
    }

    await Consultation.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  }
);
