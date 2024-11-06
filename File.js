const express = require('express');
const multer = require('multer');
const File = require('../models/File');
const router = express.Router();

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// Upload a file
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const newFile = new File({ userId: req.body.userId, filename: req.file.filename, path: req.file.path });
    await newFile.save();
    res.status(201).json(newFile);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file' });
  }
});

// Delete a file
router.delete('/delete/:id', async (req, res) => {
  try {
    await File.findByIdAndDelete(req.params.id);
    res.json({ message: 'File deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting file' });
  }
});

module.exports = router;
