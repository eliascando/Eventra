import { connect } from "../services/mongodb.js";
import { Event, Ticket } from "../models/index.model.js";

connect();

const createEvent = async (req, res) => {
  let params = req.body;
  
  try {
    if (
      params.title,
      params.description,
      params.date,
      params.place,
      params.price,
      params.stock,
      params.image,
      params.categoryId,
      params.organizerId
    ){
      let validateUnique = await Event.findOne(
        $or,[
          { title: params.title.toLowerCase() },
          { description: params.description.toLowerCase() },
          { date: params.date.toLowerCase() },
          { place: params.place.toLowerCase() },
          { categoryId: params.categoryId.toLowerCase()},
          { organizerId: params.organizerId.toLowerCase()}
        ]
      );
        if (validateUnique) {
          return res.status(400).json({
          status: "error",
          message: "Event already exists",
          });
        }
      }else{
      return res.status(400).json({
          status: "bad request",
          message: "Missing required fields",
      });
    }
    
    const newEvent = new Event(params);

    await newEvent.save();

    if (!newEvent._id) {
      return res.status(400).json({
        status: "error",
        message: "Error creating event",
      });
    }
    
    return res.status(201).json({
      status: "ok",
      message: "Event created successfully",
      data: {
        id: newEvent._id,
        name: newEvent.name,
        description: newEvent.description,
        status: newEvent.status,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error creating event",
      data: error,
    });
  }
};

const getEventsByOrganizer = async (req, res) => {
  let organizerId = req.params.organizerId;
  try {
    const events = await Event.find({ organizerId: organizerId });
    if (!events) {
      return res.status(404).json({
        status: "not found",
        message: "Events not found",
      });
    }
    return res.status(200).json({
      status: "ok",
      message: "Events found",
      data: events,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error getting events",
      data: error,
    });
  }
}

const getEventById = async (req, res) => {
  let eventId = req.params.eventId;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        status: "not found",
        message: "Event not found",
      });
    }
    return res.status(200).json({
      status: "ok",
      message: "Event found",
      data: event,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error getting event",
      data: error,
    });
  }
}

const getEventsByCategory = async (req, res) => {
  let categoryId = req.params.categoryId;

  try {
    const events = await Event.find({ categoryId: categoryId });
    if (!events) {
      return res.status(404).json({
        status: "not found",
        message: "Events not found",
      });
    }
    return res.status(200).json({
      status: "ok",
      message: "Events found",
      data: events,
    });
  }
  catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error getting events",
      data: error,
    });
  }
}

const getEventsByDate = async (req, res) => {
  let date = req.params.date;

  try {
    const events = await Event.find({ date: date });
    if (!events) {
      return res.status(404).json({
        status: "not found",
        message: "Events not found",
      });
    }
    return res.status(200).json({
      status: "ok",
      message: "Events found",
      data: events,
    });
  }
  catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error getting events",
      data: error,
    });
  }
}

const getEventsByPlace = async (req, res) => {
  let place = req.params.place;

  try {
    const events = await Event.find({ place: place });
    if (!events) {
      return res.status(404).json({
        status: "not found",
        message: "Events not found",
      });
    }
    return res.status(200).json({
      status: "ok",
      message: "Events found",
      data: events,
    });
  }
  catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error getting events",
      data: error,
    });
  }
}

const getEventsByPriceRange = async (req, res) => {
  let minPrice = req.params.minPrice;
  let maxPrice = req.params.maxPrice;

  try {
    const events = await Event.find({ price: { $gte: minPrice, $lte: maxPrice } });
    if (!events) {
      return res.status(404).json({
        status: "not found",
        message: "Events not found",
      });
    }
    return res.status(200).json({
      status: "ok",
      message: "Events found",
      data: events,
    });
  }
  catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error getting events",
      data: error,
    });
  }
}

const getUserEvents = async (req, res) => {
  let userId = req.params.userId;

  try {
    const tickets = await Ticket.find({ userId: userId });
    if (!tickets) {
      return res.status(404).json({
        status: "not found",
        message: "Tickets not found",
      });
    }

    let events = [];

    for (let i = 0; i < tickets.length; i++) {
      let event = await Event.findById(tickets[i].eventId);
      events.push(event);
    }

    return res.status(200).json({
      status: "ok",
      message: "Events found",
      data: events,
    });

  }
  catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error getting events",
      data: error,
    });
  }
}

export {
  createEvent,
  getEventById,
  getEventsByOrganizer,
  getEventsByCategory,
  getEventsByDate,
  getEventsByPlace,
  getEventsByPriceRange,
  getUserEvents,
};