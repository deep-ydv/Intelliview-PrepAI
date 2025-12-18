
import { createLearningCard, getAllLearningCards, getLearningCardById } from "../controllers/learningCardController.js";

import express from "express";

const router=express.Router();

router.post("/",createLearningCard);

router.get("/",getAllLearningCards);
router.get("/:id",getLearningCardById);


export default router;