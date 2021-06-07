/* 
    Event Routes ✅
    /api/events
*/

const { Router } = require('express');
const { check  } = require('express-validator'); 

const { isDate } = require('../helpers/isDate');
const { validate } = require('../middlewares/file-validators');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

const router = Router();

// Validate Token JWT - All routes 👏
router.use( validateJWT );

// Get Events
router.get('/', getEvents);

// Create a new Event
router.post('/', 
    [
        check('title', 'The title is required').not().isEmpty(),
        check('start', 'Start Date is required').custom(isDate),
        check('end', 'End Date is required').custom(isDate),
        validate
    ],
    createEvent
);

// Update Event
router.put('/:id', updateEvent);

// Delete Event
router.delete('/:id', deleteEvent);

module.exports = router;