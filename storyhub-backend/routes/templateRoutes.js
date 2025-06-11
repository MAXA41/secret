const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  uploadTemplateImage
} = require('../controllers/templateController');
const upload = require('../middleware/upload');

// Публічні маршрути
router.route('/')
  .get(getTemplates);

router.route('/:id')
  .get(getTemplate);

// Приватні маршрути (вимагають авторизації)
router.use(protect);

router.route('/')
  .post(authorize('user', 'publisher', 'admin'), createTemplate);

router.route('/:id')
  .put(authorize('user', 'publisher', 'admin'), updateTemplate)
  .delete(authorize('user', 'publisher', 'admin'), deleteTemplate);

router.route('/:id/image')
  .put(authorize('user', 'publisher', 'admin'), upload.single('file'), uploadTemplateImage);

module.exports = router;