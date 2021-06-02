const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Function for create user and save SECURE in BD ✅
const createUser = async (req, res = response ) => {
    const { email, password } = req.body;
    
    try{
        let user = await User.findOne({ email });

        if ( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'User exists with this email ❗'
            })
        }
        
        user = new User( req.body );
        
        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
        
        await user.save();
        
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please speak with the administrator'
        })
    }
};

// Funcion for login user in app ✅
const loginUser = async (req, res = response) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        
        if ( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'The User not exists with this email ❗'
            });
        }

        // Confirm passwords 🔐
        const validPassword = bcrypt.compareSync( password, user.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect Password ❗'
            });
        }

        // Generate our JWT | TOKEN
        res.json({
            ok: true,
            uid: user.id,
            name: user.name
        });
    } catch (error) {

    }
}

// Function for renew token | LOGIN ✅
const renewToken = (req, res = response ) => {
    res.json({
        ok: true,
        msg: 'renew'
    })
}

module.exports = {
    createUser,
    loginUser,
    renewToken,
};