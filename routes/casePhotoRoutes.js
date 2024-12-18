const express = require('express');
const router = express.Router();
const casePhotoController = require('../controllers/casePhotoController');
const photoUploader = require('../middleware/photoUploader');

router.get('/', casePhotoController.getPhotos);
router.get('/:id', casePhotoController.getPhotoById);
router.get('/visit/:id', casePhotoController.getPhotosByVisit);
router.get('/patient/:id', casePhotoController.getPhotosByPatient);
router.post('/', photoUploader.upload.single('photo'), casePhotoController.uploadPhoto)
router.delete('/:id', casePhotoController.deletePhoto);


module.exports = router;