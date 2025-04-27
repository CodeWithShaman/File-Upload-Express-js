const express = require('express');
const app = express();
const multer  = require('multer')
const path  = require('path')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set('view engine', 'ejs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null, './uploads')
    },
    filename: (req, file, cb) => {
      const newFileName = Date.now() + path.extname(file.originalname)
      cb(null, newFileName)
    }
})

//file.mimetype.startsWith('image/')
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
//         cb(null, true)
//     }else{
//         cb(new Error ('Only Images Are Allowed!', false))
//     }
// }

const upload  = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // isko use karke hum MB bata sakte hain ki image ki MB kitni hone chahiye
    },
    // fileFilter: fileFilter   // isko use karke hum sirf images upload karwa sakte png or jpeg
})

app.get('/', (req, res) => {
    res.render("myForm")
})
 

app.post('/submitform', upload.single('uploaded_file'), (req, res) => {
    res.send(req.file.filename)
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
    
});