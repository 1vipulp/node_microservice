'use strict'
const mongoose = require('mongoose')

const schemaDefinition = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  channel: {
    type: String,
    enum: ['ios', 'android', 'web']
  },
  token: {
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


const dbModel = mongoose.model('Token', schemaDefinition);
module.exports = dbModel