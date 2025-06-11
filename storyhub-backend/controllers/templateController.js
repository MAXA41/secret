const Template = require('../models/Template');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const path = require('path');

// @desc    Отримати всі шаблони
// @route   GET /api/templates
// @access  Public
exports.getTemplates = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Отримати один шаблон
// @route   GET /api/templates/:id
// @access  Public
exports.getTemplate = asyncHandler(async (req, res, next) => {
  const template = await Template.findById(req.params.id).populate({
    path: 'user',
    select: 'username email'
  });

  if (!template) {
    return next(new ErrorResponse(`Шаблон з ID ${req.params.id} не знайдено`, 404));
  }

  res.status(200).json({
    success: true,
    data: template
  });
});

// @desc    Створити шаблон
// @route   POST /api/templates
// @access  Private
exports.createTemplate = asyncHandler(async (req, res, next) => {
  // Додати користувача до req.body
  req.body.user = req.user.id;

  const template = await Template.create(req.body);

  res.status(201).json({
    success: true,
    data: template
  });
});

// @desc    Завантажити зображення шаблону
// @route   PUT /api/templates/:id/image
// @access  Private
exports.uploadTemplateImage = asyncHandler(async (req, res, next) => {
  const template = await Template.findById(req.params.id);

  if (!template) {
    return next(new ErrorResponse(`Шаблон з ID ${req.params.id} не знайдено`, 404));
  }

  // Перевірка прав власності
  if (template.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`Користувач ${req.user.id} не має прав на оновлення цього шаблону`, 401));
  }

  if (!req.files) {
    return next(new ErrorResponse(`Будь ласка, завантажте файл`, 400));
  }

  const file = req.files.file;

  // Перевірка формату зображення
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Будь ласка, завантажте файл зображення`, 400));
  }

  // Перевірка розміру файлу
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(new ErrorResponse(`Будь ласка, завантажте зображення менше ${process.env.MAX_FILE_UPLOAD / 1000000}MB`, 400));
  }

  // Створення власного імені файлу
  file.name = `photo_${template._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Проблема з завантаженням файлу`, 500));
    }

    await Template.findByIdAndUpdate(req.params.id, { image: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});

// @desc    Оновити шаблон
// @route   PUT /api/templates/:id
// @access  Private
exports.updateTemplate = asyncHandler(async (req, res, next) => {
  let template = await Template.findById(req.params.id);

  if (!template) {
    return next(new ErrorResponse(`Шаблон з ID ${req.params.id} не знайдено`, 404));
  }

  // Перевірка прав власності
  if (template.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`Користувач ${req.user.id} не має прав на оновлення цього шаблону`, 401));
  }

  template = await Template.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: template
  });
});

// @desc    Видалити шаблон
// @route   DELETE /api/templates/:id
// @access  Private
exports.deleteTemplate = asyncHandler(async (req, res, next) => {
  const template = await Template.findById(req.params.id);

  if (!template) {
    return next(new ErrorResponse(`Шаблон з ID ${req.params.id} не знайдено`, 404));
  }

  // Перевірка прав власності
  if (template.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`Користувач ${req.user.id} не має прав на видалення цього шаблону`, 401));
  }

  await template.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});