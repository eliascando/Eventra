import { Schema, model } from "mongoose";

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description:{
    type: String,
    required: true,
    trim: true,
  },
  date:{
    type: Date,
    required: true,
  },
  place:{
    type: String,
    required: true,
    trim: true,
  },
  price:{
    type: Number,
    required: true,
  },
  stock:{
    type: Number,
    required: true,
  },
  status:{
    type: Boolean,
    default: true,
  },
  createdAt:{
    type: Date,
    default: Date.now,
  },
  updatedAt:{
    type: Date
  },
  image:{
    type: String,
    required: true,
  },
  categoryId:{
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  organizerId:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Event = model('Event', EventSchema, 'events');

export { Event };