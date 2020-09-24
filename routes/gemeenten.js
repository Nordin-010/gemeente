const express = require("express");
const router = express.Router();
const fs = require("fs");

const dataPath = "./data/gemeenten.json";

/* GET gemeente listing. */
router.get("/", function (req, res, next) {
	// res.send("Sort is: " + req.query.sort);
	fs.readFile(dataPath, "utf8", (err, data) => {
		if (err) {
			throw err;
		}

		const list = JSON.parse(data);
		if (req.query.sort === "inwoners") {
			const result = list.sort((a, b) => {
				if(a.inwoners > b.inwoners) return 1;
				else if(a.inwoners < b.inwoners) return -1;
			});
			res.send(result);
		} else if (req.query.sort === "gemeente") {
			const result = list.sort((a, b) => {
				if(a.gemeente > b.gemeente) return 1;
				else if(a.gemeente < b.gemeente) return -1;
			});
			res.send(result);
		} else {
			res.send(JSON.parse(list));
		}
	});
});

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
