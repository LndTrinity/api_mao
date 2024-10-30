import { Router } from 'express';
import * as avaliacaoController from '../controllers/avaliacaoController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, avaliacaoController.createAvaliacao);
router.get('/prestador/:prestadorId', avaliacaoController.getAvaliacoesPorPrestador);
router.get('/usuario/:usuarioId', authMiddleware, avaliacaoController.getAvaliacoesPorUsuario);
router.put('/:id', authMiddleware, avaliacaoController.updateAvaliacao);
router.delete('/:id', authMiddleware, avaliacaoController.deleteAvaliacao);


export default router;
