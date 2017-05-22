
import mongoose, {Schema} from 'mongoose'

import {hideProps} from '../utils/mongoose'


const cardSchema = new Schema({
  steamId: {
    type: String,
    required: true
  },
  hashName: {
    type: String,
    required: true,
    unique: true
  },
  isFoil: {
    type: Boolean,
    default: false,
    required: true
  },
  price: {
    type: Number,
    default: 0,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
    required: true
  }
}, {
  toObject: {
    versionKey: false,
    virtuals: true,
    transform: hideProps
  }
}, {strict: true})


export default mongoose.model('Card', cardSchema)
