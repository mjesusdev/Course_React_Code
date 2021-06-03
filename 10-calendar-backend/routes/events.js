/* 
    Event Routes ✅
    /api/events
*/

const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

const router = Router();

// Validate JWT - All routes 👏
router.use( validateJWT );

// Get Events
router.get('/', getEvents);

// Create a new Event
router.post('/', createEvent);

// Update Event
router.put('/:id', updateEvent);

// Delete Event
router.delete('/:id', deleteEvent);

module.exports = router;