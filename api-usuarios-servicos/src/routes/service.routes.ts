import { Router } from 'express';
import { ServiceController } from '../controller/ServiceController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const router = Router();
const serviceController = new ServiceController();

// Cria serviço (autenticado)
router.post('/services', ensureAuthenticated, serviceController.create);

// Lista serviços do usuário autenticado
router.get('/services', ensureAuthenticated, serviceController.listMyServices);

// Atualiza serviço (id + autenticação)
router.put('/services/:id', ensureAuthenticated, serviceController.update);

// Deleta serviço (id + autenticação)
router.delete('/services/:id', ensureAuthenticated, serviceController.delete);

export { router as serviceRoutes };
