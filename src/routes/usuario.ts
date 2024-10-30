import { Router } from 'express';
import * as usuarioController from '../controllers/usuarioController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authMiddleware, usuarioController.getAllUsuarios);
router.post('/signin', usuarioController.registerUsuario);
router.post('/login', usuarioController.loginUsuario);
router.get('/:id', authMiddleware, usuarioController.getUsuario);
router.put('/:id', authMiddleware, usuarioController.updateUsuario);
router.delete('/:id', authMiddleware, usuarioController.deleteUsuario);

export default router;