const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EvaluationSchema = new Schema({
    // _id
    reviewerId:{type: Schema.Types.ObjectId, ref: 'donors', required: true},
    evaluatee: {type: Schema.Types.ObjectId, ref: 'donors', required: true},
    rating: {type: Number, require: true},
    time: {type: Date, default: Date.now, required: true}
});

module.exports = mongoose.model('evaluations', EvaluationSchema);