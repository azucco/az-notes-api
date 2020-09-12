// https://www.digitalocean.com/community/tutorials/nodejs-crud-operations-mongoose-mongodb-atlas

import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  markdown: {
    type: String,
    required: true,
    trim: true
  },
  created: {
    type: Date,
    required: true
  },
  updated: {
    type: Date
  },
  publishDate: {
    type: Date
  },
  published: {
    type: Boolean,
    required: true,
    default: false
  },
  tags: {
    type: [String],
    required: true
  }
});

const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;