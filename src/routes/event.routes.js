import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  createEvent,
  getEventsByCategory,
  getEventsByOrganizer,
  getEventsByDate,
  getEventsByPlace,
  getEventsByPriceRange,
  getUserEvents,
  getEventById,
 } from "../controllers/event.controller.js";

const router = express.Router();

router.post("/create", auth, createEvent);
router.post("/organizer/:organizerId", auth, getEventsByOrganizer);
router.post("/category/:category", auth, getEventsByCategory);
router.post("/date/:date", auth, getEventsByDate);
router.post("/place/:place", auth, getEventsByPlace);
router.post("/price/:min/:max", auth, getEventsByPriceRange);
router.post("/user/:userId", auth, getUserEvents);
router.post("/event/:eventId", auth, getEventById);


const eventRoutes = router;

export default eventRoutes;
