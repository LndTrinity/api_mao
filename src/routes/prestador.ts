import { Router } from 'express';
import * as prestadorController from '../controllers/prestadorController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', prestadorController.getAllPrestadores);
router.get('/:id', prestadorController.getPrestador);
router.post('/', authMiddleware, prestadorController.createPrestador);
router.put('/:id', authMiddleware, prestadorController.updatePrestador);
router.delete('/:id', authMiddleware, prestadorController.deletePrestador);

export default router;
