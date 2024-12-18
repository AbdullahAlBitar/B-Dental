const express = require('express');
const visitController = require('../controllers/visitController');

const router = express.Router();

router.get('/', visitController.getVisits);
router.post('/', visitController.createVisit);
router.get('/:id', visitController.getVisitById);
router.patch('/:id', visitController.updateVisit);
router.get('/profile/:id', visitController.getVisitProfile);
// router.get('/:id/edit', visitController.getEditVisitForm);
// router.post('/', visitController.createVisit);
// router.post('/:id', visitController.updateVisit);
router.delete('/:id', visitController.deleteVisit);

module.exports = router;
