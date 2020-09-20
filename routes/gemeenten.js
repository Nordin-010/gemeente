var express = require("express");
var router = express.Router();
var fs = require("fs");

const dataPath = "./data/gemeenten.json";

/* GET gemeente listing. */
router.get("/", function (req, res, next) {
	// res.send("Sort is: " + req.query.sort);
	fs.readFile(dataPath, "utf8", (err, data) => {
		if (err) {
			throw err;
		}

		var list = JSON.parse(data);
		if (req.query.sort === "inwoners") {
			var result = list.sort((a, b) => {
				return a.inwoners > b.inwoners;
			});
			res.send(result);
		} else if (req.query.sort === "gemeente") {
			var result = list.sort((a, b) => {
				return b.name < a.name ? 1 : b.name > a.name ? -1 : 0;
			});
			res.send(result);
		} else {
			res.send(JSON.parse(data));
		}
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
