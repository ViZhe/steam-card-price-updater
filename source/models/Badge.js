
import mongoose, {Schema} from 'mongoose'

import {hideProps} from '../utils/mongoose'


const badgeSchema = new Schema({
  steamId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  totalPrice: {
    normal: Number,
    foil: Number
  },
  cardCount: {
    type: Number,
    min: 1
  },
  updatedAt: {
    normal: Date,
    foil: Date
  },
  cardList: {
    normal: [],
    foil: []
  },
  haveTenshi: {
    normal: Boolean,
    foil: Boolean
  }
}, {
  toObject: {
    versionKey: false,
    virtuals: true,
    transform: hideProps
  }
}, {strict: true})


export default mongoose.model('Badge', badgeSchema)
