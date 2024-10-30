import {PrismaClient} from "@prisma/client";
import type {Request, Response} from "express";

const prisma = new PrismaClient();

// Controlador para obter uma avaliação específica pelo ID
export const getAvaliacao = async (req: Request, res: Response) => {
  const {id} = req.params;

  try {
    const avaliacao = await prisma.avaliacao.findUnique({
      where: {id: Number(id)},
    });

    if (!avaliacao) {
      return res.status(404).json({error: "Avaliação não encontrada."});
    }

    res.status(200).json(avaliacao);
  } catch (error: unknown) {
    console.error(error);
    res
      .status(500)
      .json({error: "Erro ao buscar avaliação. Tente novamente mais tarde."});
  }
};

// Controlador para criar uma nova avaliação
export const createAvaliacao = async (req: Request, res: Response) => {
  const {usuarioId, servicoId, nota, comentario} = req.body;

  // Validação dos dados recebidos
  if (!usuarioId || !servicoId || nota === undefined) {
    return res
      .status(400)
      .json({error: "Os campos usuarioId, servicoId e nota são obrigatórios."});
  }

  try {
    const avaliacao = await prisma.avaliacao.create({
      data: {
        servicoId,
        usuario: {connect: {id: usuarioId}},
        prestador: {connect: {id: servicoId}},
        nota,
        comentario,
      },
    });
    res.status(201).json(avaliacao);
  } catch (error: unknown) {
    console.error(error);
    res
      .status(500)
      .json({error: "Erro ao criar avaliação. Tente novamente mais tarde."});
  }
};

// Controlador para atualizar uma avaliação existente
export const updateAvaliacao = async (req: Request, res: Response) => {
  const {id} = req.params;
  const {usuarioId, servicoId, nota, comentario} = req.body;

  // Validação dos dados recebidos
  if (!usuarioId && !servicoId && !nota && !comentario) {
    return res.status(400).json({
      error: "Pelo menos um campo deve ser fornecido para atualização.",
    });
  }

  try {
    const avaliacao = await prisma.avaliacao.update({
      where: {id: Number(id)},
      data: {usuarioId, servicoId, nota, comentario},
    });

    res.status(200).json(avaliacao);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      error: "Erro ao atualizar avaliação. Tente novamente mais tarde.",
    });
  }
};

// Controlador para excluir uma avaliação
export const deleteAvaliacao = async (req: Request, res: Response) => {
  const {id} = req.params;

  try {
    const avaliacao = await prisma.avaliacao.delete({
      where: {id: Number(id)},
    });

    res
      .status(200)
      .json({message: "Avaliação excluída com sucesso.", avaliacao});
  } catch (error: unknown) {
    console.error(error);
    res
      .status(500)
      .json({error: "Erro ao excluir avaliação. Tente novamente mais tarde."});
  }
};

export const getAvaliacoesPorPrestador = async (
  req: Request,
  res: Response
) => {
  const {prestadorId} = req.params;

  try {
    const avaliacoes = await prisma.avaliacao.findMany({
      where: {prestadorId: Number(prestadorId)},
      include: {
        usuario: true, // Incluir informações do usuário
      },
    });

    res.status(200).json(avaliacoes);
  } catch (error: unknown) {
    console.error(error);
    res
      .status(500)
      .json({error: "Erro ao buscar avaliações. Tente novamente mais tarde."});
  }
};

// Controlador para obter avaliações por usuário
export const getAvaliacoesPorUsuario = async (req: Request, res: Response) => {
  const {usuarioId} = req.params;

  try {
    const avaliacoes = await prisma.avaliacao.findMany({
      where: {usuarioId: usuarioId},
      include: {
        prestador: true, // Incluir informações do prestador
      },
    });

    res.status(200).json(avaliacoes);
  } catch (error: unknown) {
    console.error(error);
    res
      .status(500)
      .json({error: "Erro ao buscar avaliações. Tente novamente mais tarde."});
  }
};
