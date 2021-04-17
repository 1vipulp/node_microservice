'use strict'
const mongoose = require('mongoose')

const schemaDefinition = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Number,
    default: Date.now,
  },
  updated_at: {
    type: Number,
    default: Date.now,
  },
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  });


const dbModel = mongoose.model('User', schemaDefinition);
module.exports = dbModel