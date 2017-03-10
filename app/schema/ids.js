import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const incId = new Schema({
    _id: String,
    id:0
});

const IncId = mongoose.model('IncId', incId);

export {IncId};