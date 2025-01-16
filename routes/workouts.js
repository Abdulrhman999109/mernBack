const express = require('express')
const { 
    createworkout,
    getallworkouts,
    getworkout,
    deleteworkout,
    updateworkout
 } = require('../Controller/workoutController')

const router = express.Router()

router.get('/', getallworkouts)


router.get('/:id', getworkout)

router.post('/', createworkout)

router.delete('/:id' , deleteworkout)

router.patch('/:id' , updateworkout)

module.exports = router