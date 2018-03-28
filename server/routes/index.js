var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render(path.join(__dirname, '../client/src') + '/index.html');
});

module.exports = router;