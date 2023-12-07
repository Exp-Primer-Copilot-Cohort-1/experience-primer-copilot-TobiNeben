// Create web server
const express = require('express');
const router = express.Router();
const comments = require('../models/comments');
const bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', (req, res) => {
    comments.getAll((err, data) => {
        res.render('comments', { data: data });
    });
});

router.post('/add', urlencodedParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);
    comments.add(req.body, (err, data) => {
        res.redirect('/comments');
    });
});

router.get('/delete/:id', (req, res) => {
    comments.delete(req.params.id, (err, data) => {
        res.redirect('/comments');
    });
});

router.get('/edit/:id', (req, res) => {
    comments.get(req.params.id, (err, data) => {
        res.render('commentsEdit', { data: data });
    });
});

router.post('/update', urlencodedParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);
    comments.update(req.body, (err, data) => {
        res.redirect('/comments');
    });
});

module.exports = router;