var bookmark = require('../models/bookmarkModel.js').Bookmark;
module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('pages/index.ejs');
    });

    app.get('/show', function(req, res) {
        bookmark.find({}, function(err, bookmarks) {
            if (err) {
                console.log(err);
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
        var tags = req.body.tags;
        var newBookmark = new bookmark({
            bookmarkName: name,
            url: url,
            tags: tags
        });
        console.log(newBookmark);
        newBookmark.save(function(err) {
            if (err) {
                console.log('could not save to db');
            } else {
                res.redirect('/show');
            }
        })
    });


    app.get("/search", function (req, res) {

        console.log(req.query['search']);

        bookmark.find({
            tags: req.query['search']
        }, function(err, bookmark) {
            if (err) {
                console.log(err);
            }
            if (!bookmark) {
                return res.send(404);
            }
            else {
                res.render('pages/show', {bookmarks: bookmark})
            }
        }
        )
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
            url: req.body.url,
            tags: req.body.edtags
        }
        console.log(update);
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