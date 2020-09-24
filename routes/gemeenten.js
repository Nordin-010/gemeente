const express = require("express");
const router = express.Router();
const fs = require("fs");

const dataPath = "./data/gemeenten.json";

/* GET gemeente listing. */
router.get("/", function (req, res, next) {
	fs.readFile(dataPath, "utf8", (err, data) => {
		if (err) {
			throw err;
		}

		const list = JSON.parse(data);
		if (req.query.sort === "inwoners") {
			const result = list.sort((a, b) => {
				return (a.inwoners > b.inwoners)?1:-1;
			});
			res.send(result);
		} else if (req.query.sort === "gemeente") {
			const result = list.sort((a, b) => {
				return (a.gemeente > b.gemeente)?1:-1;
			});
			res.send(result);
		} else {
			res.send(JSON.parse(list));
		}
	});
});

// GET a specific city
router.get("/:city", function (req, res, next) {
	fs.readFile(dataPath, "utf8", (err, data) => {
		if (err) {
			throw err;
		}

		const list = JSON.parse(data);
		const result = list.filter(function (item) {
			return item.gemeente === req.params.city;
		});

		res.send(result);
	});
});

module.exports = router;
