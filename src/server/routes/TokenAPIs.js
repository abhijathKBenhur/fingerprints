const Token = require('../db-config/token.schema')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path');


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
                .json({ success: true, data: [] })
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

const storage = multer.diskStorage({
    destination: './src/uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  // Init Upload
  const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('fileData');
  
  // Check File Type
  function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }

getFilePath = async (req, res) => {
    upload(req, res, (err) => {
      if(err){
        return res.status(200).json({ success: false, error: "err" })
      } else {
        if(req.file == undefined){
            return res.status(200).json({ success: false, error: "no file selected" })
        } else {
            return res.status(200).json({ success: true, data: "/src/uploads/"+req.file.filename })
        }
      }
    });
}
  


router.post('/getFilePath', getFilePath)
router.post('/token', addToken)
router.get('/token/:id', getTokenById)
router.get('/tokens', getTokens)

module.exports = router
