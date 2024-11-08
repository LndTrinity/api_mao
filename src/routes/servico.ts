import {Router} from "express";
import * as servicoController from "../controllers/servicoController";
import {authMiddleware} from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, servicoController.createServico);
router.get("/", servicoController.getAllServicos);
router.get("/:id", servicoController.getServico);
router.put("/:id", authMiddleware, servicoController.updateServico);
router.delete("/:id", authMiddleware, servicoController.deleteServico);
router.get("/servicos/search", servicoController.searchServicosByName);

export default router;
