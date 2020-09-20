var express = require("express");
var router = express.Router();
var fs = require("fs");

const dataPath = "./data/gemeenten.json";

/* GET users listing. */
router.get("/", function (req, res, next) {
	fs.readFile(dataPath, "utf8", (err, data) => {
		if (err) {
			throw err;
		}

		res.send(JSON.parse(data));
	});
});

router.get("/:city", function (req, res, next) {
	fs.readFile(dataPath, "utf8", (err, data) => {
		if (err) {
			throw err;
		}

		var list = JSON.parse(data);
		var result = list.filter(function (item) {
			return item.gemeente === req.params.city;
		});

		res.send(result);
	});
});

module.exports = router;
