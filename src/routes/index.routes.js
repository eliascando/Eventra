import userRoutes from './user.routes.js';
import eventRoutes from './event.routes.js';
import ticketRoutes from './ticket.routes.js';

const loadRoutes = (app) => {
  app.use('/api/user', userRoutes);
  app.use('/api/event', eventRoutes);
  app.use('/api/ticket', ticketRoutes);

  // Health check
  app.get('/api/health', (req, res) => {
    console.log(res);
    res.status(200).send(
      {
        status: 'OK',
        message: 'API is healthy',
      }
    );
  });
}

export default loadRoutes;
