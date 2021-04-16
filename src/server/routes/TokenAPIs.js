const Token = require('../db-config/token.schema')
const express = require('express')
const router = express.Router()




addToken = (req, res) => {
    console.log("adding token",req.body)
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
    console.log("Getting tokens")
    console.log(Token)

    await Token.findOne({ _id: req.params.id }, (err, token) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!token) {
            return res
                .status(404)
                .json({ success: false, error: `tokens not found` })
        }
        return res.status(200).json({ success: true, data: token })
    }).catch(err => {
        return res.status(200).json({ success: false, data: err })
    })
}

getTokens = async (req, res) => {
    console.log("Getting tokens")
    await Token.find({}, (err, token) => {
        if (err) {
            return res.status(400).json({ success: false, error: "here" })
        }
        if (!token.length) {
            return res
                .status(404)
                .json({ success: false, error: `token not found` })
        }
        return res.status(200).json({ success: true, data: token })
    }).catch(err => {
        return res.status(200).json({ success: false, error: "err" })
    })
}


router.post('/token', addToken)
router.get('/token/:id', getTokenById)
router.get('/tokens', getTokens)


module.exports = router
