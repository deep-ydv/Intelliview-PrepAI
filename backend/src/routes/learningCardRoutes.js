
import { createLearningCard, getAllLearningCards } from "../controllers/learningCardController.js";

import express from "express";

const router=express.Router();

router.post("/",createLearningCard);

router.get("/",getAllLearningCards);

export default router;