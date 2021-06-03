// Functions for events ✅
const { response } = require('express');

const getEvents = ( req, res = response ) => {
    res.json({
        ok: true,
        msg:'Get Events'
    });
}

const createEvent = ( req, res = response ) => {
    res.json({
        ok: true,
        msg:'Create Event'
    }); 
}

const updateEvent = ( req, res = response ) => {
    res.json({
        ok: true,
        msg:'Update Event'
    });
}

const deleteEvent = ( req, res = response ) => {
    res.json({
        ok: true,
        msg:'Delete Event'
    });  
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}