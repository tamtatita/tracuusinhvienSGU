import Express from "express";
import {
  getCredit,
  getDRL,
  getInfo,
  getRank,
  getTKB,
  getTranscript,
} from "../controller/GetTKB.js";

const router = Express.Router();

router.post("/", getTKB);
router.post("/info", getInfo);

router.post("/transcript", getTranscript);

router.post("/credit", getCredit);

router.post("/rank", getRank);

router.post("/drl", getDRL);

export default router;
