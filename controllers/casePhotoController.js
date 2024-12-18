const casePhotoService = require('../services/casephotoService');
const photoUploder = require('../middleware/photoUploader');

const getPhotos = async (req, res) => {
    const photos = await casePhotoService.getAll();
    return res.status(200).json(photos);
};

const getPhotoById = async (req, res) => {
    const { id } = req.params;
    const photo = await casePhotoService.getPhotoById(id);
    return res.status(200).json(photo);
};

const getPhotosByVisit = async (req, res) => {
    const { id } = req.params;
    const photos = await casePhotoService.getPhotosByVisit(id);
    return res.status(200).json(photos);
};

const getPhotosByPatient = async (req, res) => {
    const { id } = req.params;
    const photos = await casePhotoService.getPhotosByPatient(id);
    return res.status(200).json(photos);
};

const uploadPhoto = async (req, res) => {
    const { patient_id, visit_id, date, type } = req.body;

    console.log(req.file);
    if (!req.file) {
        return res.status(400).json({ error: 'File is required' });
    }
    
    const photoUrl = await photoUploder.uploadToGoogleDrive(req.file, "p_" + patient_id + "_v_" + visit_id);

    const newPhoto = await casePhotoService.uploadPhoto(
        patient_id,
        visit_id,
        photoUrl,
        type,
        date
    );
    
    return res.status(200).json(newPhoto.id);
};

const deletePhoto = async (req, res)=> {
    const id = req.params.id;
    const deletedPhoto = await casePhotoService.deletePhoto(id);
    return res.status(200).json(deletedPhoto.id);
}

module.exports = {
    getPhotos,
    getPhotoById,
    getPhotosByVisit,
    getPhotosByPatient,
    uploadPhoto,
    deletePhoto
};
