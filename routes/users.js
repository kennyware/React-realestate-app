const router = require('express').Router();
const User = require('../models/User');
const config = require('config');
const { check, validationResult, matchedData } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')


// @route GET api/users/
// @access Public
router.post('/', [
    check('username', 'Please enter all fields').exists().not().isEmpty(),
    check('email', 'Please enter all fields').exists().not().isEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Please enter all fields').exists().not().isEmpty(),
    check('password', 'Password should be at least 6 characters').isLength({min: 6})
], (req, res) => {
    const err = validationResult(req);
    if(!err.isEmpty()) return res.status(400).json({ error: err.array()[0].msg })

    const { username, email, password } = matchedData(req);

    User.findOne({ email }, (err, user) => {
        if(user) return res.status(400).json({error: 'Email is already registered'})
            // Get Gravatar
        const avatar = gravatar.url(email, {
            size: '200',
            rating: 'pg',
            default: 'mm'
        });

        const newUser = new User({
            username,
            email,
            password,
            avatar
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;

                newUser.save().then(result => {
                    jwt.sign({id: result.id}, config.get('jwtSecret'), {expiresIn: 3600}, (err, token) => {
                        if(err) return res.status(400).json(err)

                        res.json({token})
                    })
                }).catch((err) => {
                    res.status(400).json({error: err.message})
                })
            })
        })
    })   
})

// @route POST api/users/saved
// @access Private
router.post('/saved', auth, (req, res) => {
    const savedProp = req.body.property;
    if(!savedProp) return res.status(400).json({error: 'No property'})
    if(!Number.isInteger(savedProp)) return res.json({error: 'Not a number'})

    const id = req.user.id
    
    
    User.findById(id).then(user => {

        // Check if property id is already saved
        const props = user.saved_props.filter(prop => {
            return prop == savedProp;
        })

        if(props.length > 0) {
            return res.status(400).json({error: 'This property is already saved'})
        }

        // Add property
        User.findByIdAndUpdate(id, {$push: {saved_props: savedProp}}).then(result => {
            res.json({success: true})
        }).catch(err => res.status(500).json({error: err}))
    })
})

// @route DELETE api/users/saved/:id
// @access Private
router.delete('/saved/:id', auth, (req, res) => {
    const delProp = Number(req.params.id);
    
    if(Number.isNaN(delProp)) return res.status(404).json({error: 'Not a number'})

    const id = req.user.id
    
    
    User.findById(id).then(user => {

        // Check if property id is already saved
        const props = user.saved_props.filter(prop => {
            return prop == delProp;
        })

        if(props.length == 0) {
            return res.status(400).json({error: 'There is no saved property with that id'})
        }

        // Add property
        User.findByIdAndUpdate(id, {$pull: {saved_props: delProp}}).then(result => {
            res.json({success: true})
        }).catch(err => res.status(500).json({error: err}))
    })
})

// @route POST api/users/login
// @access Public
router.post('/login', [
    check('email', 'Please enter all fields').exists().not().isEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Please enter all fields').exists().not().isEmpty()
], (req, res) => {
    const err = validationResult(req);
    if(!err.isEmpty()) return res.status(400).json({ error: err.array()[0].msg })

    const { email, password } = matchedData(req);

    User.findOne({email}).then(user => {
        if(!user) return res.status(400).json({error: 'No user was found with that email.'})

        bcrypt.compare(password, user.password, (err, match) => {
            if(err) throw err;

            if(!match) return res.status(400).json({error: 'Wrong Password'})

            jwt.sign({id: user._id}, config.get('jwtSecret'), {expiresIn: 3600}, (err, token) => {
                if(err) return res.status(400).json(err)
                res.json({token})
            })
        })
    })
})

module.exports = router;