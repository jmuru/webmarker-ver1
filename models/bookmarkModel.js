var mongoose = require('mongoose');

var bookmarkSchema = mongoose.Schema({
	bookmarkName: String,
	url: String,
	tags: [String],
	createdAt: {type: Date, default: Date.now}
})

var Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = {
	Bookmark: Bookmark
}