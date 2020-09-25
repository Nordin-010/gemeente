const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const sorted = require("../middleware/sort");

const dataPath = "./data/gemeenten.json";

/* GET gemeente listing. */
router.get("/", async function (req, res, next) {
	
	try {
		const data = await fs.readFile(dataPath);

		const list = JSON.parse(data);
		if (req.query.sort === "inwoners") {
			sorted.byInhabitant(list);
			res.send(list);
		} else if (req.query.sort === "gemeente") {
			sorted.byCity(list);
			res.send(list);
		} else {
			res.send(list);
		}
	}
	catch(error) {
		return res.status(400).send(error);	
	}
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
