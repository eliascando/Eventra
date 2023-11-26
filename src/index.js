import express from 'express';
import cors from 'cors';
import { config } from '../config.js';
import loadRoutes from './routes/index.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
loadRoutes(app);

// Start server
app.listen(config.PORT, () =>{
    console.log(`App listening on port ${config.PORT}!`)
});
