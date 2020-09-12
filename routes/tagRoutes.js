import express from 'express';
const router = express.Router();
import Note from '../models/note';

router.get('/tags', async function (req, res) {

    const notes = await Note.find({});

    /** @type {integer} */
    let i = 0;
    /** @type {Array} */
    let tags = [];

    notes.forEach(note => {
        let currentTags = i === 0 ? note.tags : note.tags.filter(isNotDuplicate);
        tags = i === 0 ? currentTags : tags.concat(currentTags);
        i++;
    });

    function isNotDuplicate(tag) {
        if(!tags.includes(tag)){
            return tag;
        }
    }

    try {
        res.send(tags);
    } catch (err) {
        res.status(500).send(err);
    }

});

module.exports = router;

