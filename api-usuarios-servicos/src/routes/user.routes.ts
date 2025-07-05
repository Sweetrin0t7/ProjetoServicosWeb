import { Router } from 'express';
import { UserController } from '../controller/UserController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';


const router = Router();
const userController = new UserController();

// rota para registrar um novo usuário comum
router.post('/register', userController.register);

// Rota de login para autenticação JWT
router.post('/login', userController.login);

//rota para listar todos os usuários (apenas admin)
router.get('/users', ensureAuthenticated, ensureAdmin, userController.list);

// Rota para buscar um usuário pelo ID (apenas admin)
router.get('/users/:id', ensureAuthenticated, ensureAdmin, userController.findById);

// Rota para deletar um usuário (apenas admin)
router.delete('/users/:id', ensureAuthenticated, ensureAdmin, userController.delete);

export { router as userRoutes };
