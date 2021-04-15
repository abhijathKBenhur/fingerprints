const Token = require('../db-config/token.schema')
const express = require('express')
const router = express.Router()




addToken = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a token',
        })
    }

    const newToken = new Token(body)

    if (!newToken) {
        return res.status(400).json({ success: false, error: err })
    }

    newToken
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: newToken._id,
                message: 'new token created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'new token not created!',
            })
        })
}


getTokenById = async (req, res) => {
    await Token.findOne({ _id: req.params.id }, (err, token) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!token) {
            return res
                .status(404)
                .json({ success: false, error: `token not found` })
        }
        return res.status(200).json({ success: true, data: token })
    }).catch(err => console.log(err))
}

getTokens = async (req, res) => {
    await Movie.find({}, (err, token) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!token.length) {
            return res
                .status(404)
                .json({ success: false, error: `token not found` })
        }
        return res.status(200).json({ success: true, data: token })
    }).catch(err => console.log(err))
}


router.post('/token', addToken)
router.put('/movie/:id', getTokenById)
router.delete('/movie/:id', getTokens)


module.exports = router
