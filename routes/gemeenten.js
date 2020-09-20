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
	//res.send("get all gemeenten");
});

router.get("/:city", function (req, res, next) {
	fs.readFile(dataPath, "utf8", (err, data) => {
		if (err) {
			throw err;
		}

		res.send(JSON.parse(data));
	});

	res.send("get gemeente of " + req.params.city);
});

module.exports = router;
