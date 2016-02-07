var bookmark = require('../models/bookmarkModel.js').Bookmark;
module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('pages/index.ejs');
    });

    app.get('/show', function(req, res) {
        bookmark.find({}, function(err, bookmarks) {
            if (err) {
                console.log('data could not be saved');
            } else {
                res.render('pages/show', {
                    bookmarks: bookmarks
                });
            }
        });
    });

    app.post('/bookmarks/create', function(req, res) {
        var name = req.body.name;
        var url = req.body.url;
        var tags = [];
        var validTags = ["social", "education", "work", "misc", "custom"];
        validTags.forEach(function(el, i, arr) {
            if (req.body[el]) {
                tags.push(el);
            }
        });
        var newBookmark = new bookmark({
            bookmarkName: name,
            url: url,
            tags: tags
        });
        newBookmark.save(function(err) {
            if (err) {
                console.log('could not save to db');
            } else {
                res.redirect('/show');
            }
        })
    });


    app.get('/search', function(req, res) {
        bookmark.find({
            tags: req.query['search']
        }, function(err, bookmark) {
            if (err) {
                return res.send(500)
            }
            if (!bookmark) {
                return res.send(404)
            } else {
                res.render('pages/show', {
                    bookmarks: bookmark,
                    tags: ['Social', 'Education', 'Misc', 'Work']
                });
            }
        })
    });

    app.get('/edit/:id', function(req, res) {
        bookmark.findById(req.params.id, function(err, bookmark) {
            if (err) {
                console.log('there has been an error');
            } else {
                // console.log(bookmark);
                res.render('pages/edit.ejs', {
                    bookmark: bookmark,
                    tagsList: ['work', 'misc', 'education', 'social']
                });
            }
        });
    });

    app.post('/edit/:id', function(req, res) {
        var id = req.params.id;
        if (!id) {
            return res.send(404);
        }
        var update = {
            bookmarkName: req.body.name,
            url: req.body.url
        }
        bookmark.findByIdAndUpdate(id, update, function(err, data) {
            if (err) {
                return res.send(500);
            }
            if (!data) {
                return res.send(404);
            }

            console.log(data);
            res.redirect('/show');
        });
    });

};