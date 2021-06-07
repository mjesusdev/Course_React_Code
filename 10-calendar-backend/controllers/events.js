// Functions for events ✅
const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async ( req, res = response ) => {

    const events = await Event.find()
                              .populate('user', 'name')

    res.json({
        ok: true,
        events
    });
}

const createEvent = async ( req, res = response ) => {

    const event = new Event( req.body );
    
    try {

        event.user = req.uid;

        const eventSave = await event.save();

        res.json({
            ok: true,
            event: eventSave
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Speak with the Administrator, please!'
        })
    }
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