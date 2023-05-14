const express = require('express');
const Item = require('../models/item');
const Auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const router = new express.Router();

router.use(express.static(__dirname + '/public'));
router.use('/photos', express.static('public/uploads'));

var storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '_' + Date.now() + path.extname(file.originalname)
    );
  },
});
var upload = multer({
  storage: storage,
}).single('file');

// router.post('/upload', upload, (req, res, next) => {
//   const imageFile = req.file.filename;
//   console.log(imageFile);
//   res.send('image uploaded');
// });

//fetch all items
router.get('/items', Auth, async (req, res) => {
  if (req.query.user == 1) {
    try {
      const items = await Item.find({ owner: req.user._id });
      res.status(200).send(items);
    } catch (error) {
      console.log(error);
      res.status(500).send('something went wrong');
    }
  } else {
    try {
      const items = await Item.find({});
      res.status(200).send(items);
    } catch (error) {
      res.status(400).send(error);
    }
  }
});

//fetch an item
router.get('/items/:id', Auth, async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id });
    if (!item) {
      res.status(404).send({ error: 'Item not found' });
    }
    res.status(200).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

//create an item
router.post('/items', Auth, upload, async (req, res) => {
  try {
    const newItem = new Item({
      ...req.body,
      image: req.file.filename,
      owner: req.user._id,
    });
    await newItem.save();
    res.status(201).send(newItem);
  } catch (error) {
    console.log({ error });
    res.status(400).send({ message: 'error' });
  }
});

//update an item

router.patch('/items/:id', Auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'description', 'category', 'price'];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'invalid updates' });
  }

  try {
    const item = await Item.findOne({ _id: req.params.id });

    if (!item) {
      return res.status(404).send();
    }

    updates.forEach((update) => (item[update] = req.body[update]));
    await item.save();
    res.send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

//delete item
router.delete('/items/:id', Auth, async (req, res) => {
  try {
    const deletedItem = await Item.findOneAndDelete({ _id: req.params.id });
    if (!deletedItem) {
      res.status(404).send({ error: 'Item not found' });
    }
    res.send(deletedItem);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
