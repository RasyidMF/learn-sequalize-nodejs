import { Express } from "express";
import expressInst from "express";

const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();

export default function (app: Express) {
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(upload.array());
	app.use(expressInst.static("public"));
}
