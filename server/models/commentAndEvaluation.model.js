const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentAndEvaluationSchema = new Schema({
    // _id
    reviewerId:{type: Schema.Types.ObjectId, ref: 'users', required: true},
    articleId: {type: Schema.Types.ObjectId, ref: 'articles', required: true},
    rating: {type: Number, require: true},
    comment: {type: String, require: true},
    createdAt: {type: Date, default: Date.now, required: true}
});

module.exports = mongoose.model('comments', CommentAndEvaluationSchema);