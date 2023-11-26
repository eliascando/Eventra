import express from "express";
import { auth } from "../middlewares/auth.js";
import { sellTicket } from "../controllers/ticket.controller.js";

const router = express.Router();

router.post("/sell", auth, sellTicket);

const ticketRoutes = router;

export default ticketRoutes;