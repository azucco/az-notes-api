
import express from 'express';
const router = express.Router();
import Note from '../models/note';

router.get('/notes', async function (req, res) {

  const notes = await Note.find({});

  try {
    res.send(notes);
  } catch (err) {
    res.status(500).send(err);
  }

});

router.get('/notes/tags/', async function (req, res) {
  const tags = req.query.tag;
  console.log(tags);
  const notes = await Note.find({ tags: { $all: tags } });

  try {
    res.send(notes);
  } catch (err) {
    res.status(500).send(err);
  }

});

router.get('/note/:id', async function (req, res) {
  const id = req.params.id;
  const note = await Note.findById(id);

  try {
    res.send(note);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete('/note/:id', async function (req, res) {
  const id = req.params.id;
  const note = await Note.findByIdAndDelete(id)

  try {
    res.send(note);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put('/note/:id', async function (req, res) {
  const id = req.params.id;

  const note = await Note.findByIdAndUpdate(id,
    {
      "title": req.body.title,
      "description": req.body.description,
      "markdown": req.body.markdown,
      "updated": Date.now(),
      "tags": req.body.tags
    },
    function (err, result) {
      if (err) {
        res.send(err)
      }
      else {
        res.send(result)
      }
    })
});

router.post('/note/', async function (req, res) {

  const note = new Note();
  note.title = req.body.title;
  note.description = req.body.description;
  note.markdown = req.body.markdown;
  note.created = Date.now();
  note.tags = req.body.tags;

  try {
    await note.save();
    res.send(note);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;