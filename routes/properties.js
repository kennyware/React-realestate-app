const router = require('express').Router();
const axios = require('axios');

const authKey = "Basic c2ltcGx5cmV0czpzaW1wbHlyZXRz"

// @route GET api/properties/
// @access Public
router.get('/', (req, res) => {

    if(Object.keys(req.query).length > 0 || Object.keys(req.params).length > 0){
        
        const q = req.query.q;
        const sort = req.query.sort ? `sort=${req.query.sort}` : '';
        axios.get(`https://api.simplyrets.com/properties?q=${q}&${sort}`, {
            headers: { "Authorization": authKey}
        }).then(result => {
            res.json(result.data)
        }).catch(err => {
            res.status(500).json({err})
        })

    } else {
        axios.get('https://api.simplyrets.com/properties?count=true', {
            headers: { "Authorization": authKey}
        }).then(result => {
            res.json(result.data)
        }).catch(err => {
            res.status(500).json({err})
        })
    }
    
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