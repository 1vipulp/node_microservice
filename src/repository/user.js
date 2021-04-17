'use strict'

const ModelVar = require('../models/user');

module.exports.createData = async (dataToSave) => {
  const data = new ModelVar(dataToSave)
  return data.save()
}

module.exports.getDataByQuery = async (query, projection = {}, options = {}) => {
  const data = await ModelVar.find(query, projection, options)
  return data
}

module.exports.updateData = async (query, updateData, options = {}) => {
  const data = await ModelVar.updateOne(query, updateData, options)
  return data
}