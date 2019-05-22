var express = require('express');
var router = express.Router();

router.get('/bookList', function(req, res, next) {
		return res.render("bible_book_list", { chargeStatus: "" })
});

router.get('/page', function(req, res, next) {
		return res.render("blog", { chargeStatus: "" })
});

module.exports = router;
