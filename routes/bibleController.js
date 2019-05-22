var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
		return res.render("index", { chargeStatus: "" })
});

router.get('/page', function(req, res, next) {
		return res.render("blog", { chargeStatus: "" })
});

router.get('/book_shelf', function(req, res, next) {
		return res.render("bible_book_shelf", { chargeStatus: "" })
});

router.get('/book_catalog', function(req, res, next) {
		return res.render("book_catalog", { chargeStatus: "" })
});

router.get('/book_content', function(req, res, next) {
		return res.render("book_content", { chargeStatus: "" })
});

module.exports = router;
