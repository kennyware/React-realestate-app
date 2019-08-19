const router = require('express').Router();
const axios = require('axios');

// @route GET api/properties/
// @access Public
router.get('/', (req, res) => {
    axios.get('https://api.simplyrets.com/properties?count=true', {
        headers: { "Authorization": "Basic c2ltcGx5cmV0czpzaW1wbHlyZXRz"}
    }).then(result => {
        res.json(result.data)
    }).catch(err => {
        res.status(500).json({err})
    })
})

// @route GET api/properties/:id
// @access Public
router.get('/:id', (req, res) => {
    const id = req.params.id;

    axios.get(`https://api.simplyrets.com/properties/${id}`, {
        headers: { "Authorization": "Basic c2ltcGx5cmV0czpzaW1wbHlyZXRz"}
    }).then(result => {
        res.json(result.data)
    }).catch(err => {
        res.status(500).json({err})
    })    
})

module.exports = router;