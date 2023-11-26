import { connect } from "../services/mongodb.js";
import { Ticket }from "./../models/index.model.js";

connect();

const sellTicket = async (req, res) => {
  let params = req.body;

  try {
    if (
      params.userId,
      params.eventId
    ){
      let validateUnique = await Ticket.findOne({ $or:[
        { userId: params.userId.toLowerCase() },
        { eventId: params.eventId.toLowerCase() }
      ]});
      if (validateUnique) {
        return res.status(400).json({
          status: "error",
          message: "Ticket already exists",
        });
      }

      const newTicket = new Ticket(params);

      await newTicket.save();

      if (!newTicket._id) {
        return res.status(400).json({
          status: "error",
          message: "Error creating ticket",
        });
      }

      return res.status(201).json({
        status: "ok",
        message: "Ticket created successfully",
        data: {
          id: newTicket._id,
          userId: newTicket.userId,
          eventId: newTicket.eventId,
          status: newTicket.status,
        },
      });
      
    }else{
      return res.status(400).json({
        status: "bad request",
        message: "Missing required fields",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error creating ticket",
      data: error,
    });
  }
};

export { sellTicket };
