import express from 'express';
import { userRoutes } from './routes/user.routes';
import { serviceRoutes } from './routes/service.routes';

export const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(serviceRoutes);
