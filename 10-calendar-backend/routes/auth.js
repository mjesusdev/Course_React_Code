/*
    Routes Of Users / Auth 👏
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validate } = require('../middlewares/file-validators');
const router = Router();

const { createUser, loginUser, renewToken } = require('../controllers/auth');

router.post(
    '/new', 
    [ // middlewares
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        check('password', 'The password should is 8 characters').isLength({ min: 6 }),
        validate
    ], 
    createUser);

router.post(
    '/', 
    [ // middlewares
        check('email', 'The email is required').isEmail(),
        check('password', 'The password should is 8 characters').isLength({ min: 6 }),
        validate
    ],
    loginUser);

router.get('/renew', renewToken);

module.exports = router;