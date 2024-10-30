import type {Request, Response} from "express";
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

export const getAllReservas = async (req: Request, res: Response) => {
  try {
    const reservas = await prisma.reserva.findMany({
      include: {
        usuario: true, // Incluir informações do usuário
        servico: true, // Incluir informações do serviço
      },
    });
    res.status(200).json(reservas);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({error: "Erro ao buscar reservas. Tente novamente mais tarde."});
  }
};

// Controlador para obter uma reserva específica pelo ID
export const getReserva = async (req: Request, res: Response) => {
  const {id} = req.params;

  try {
    const reserva = await prisma.reserva.findUnique({
      where: {id: Number(id)},
      include: {
        usuario: true, // Incluir informações do usuário
        servico: true, // Incluir informações do serviço
      },
    });

    if (!reserva) {
      return res.status(404).json({error: "Reserva não encontrada."});
    }

    res.status(200).json(reserva);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({error: "Erro ao buscar reserva. Tente novamente mais tarde."});
  }
};

// Controlador para criar uma nova reserva
export const createReserva = async (req: Request, res: Response) => {
  const {usuarioId, servicoId, data} = req.body;

  // Validação dos dados recebidos
  if (!usuarioId || !servicoId || !data) {
    return res
      .status(400)
      .json({
        error: "Os campos usuarioId, servicoId e data  são obrigatórios.",
      });
  }

  try {
    const reserva = await prisma.reserva.create({
      data: {usuarioId, servicoId, data},
    });
    res.status(201).json(reserva);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({error: "Erro ao criar reserva. Tente novamente mais tarde."});
  }
};

// Controlador para atualizar uma reserva existente
export const updateReserva = async (req: Request, res: Response) => {
  const {id} = req.params;
  const {usuarioId, servicoId, data} = req.body;

  // Validação dos dados recebidos
  if (!usuarioId && !servicoId && !data) {
    return res
      .status(400)
      .json({
        error: "Pelo menos um campo deve ser fornecido para atualização.",
      });
  }

  try {
    const reserva = await prisma.reserva.update({
      where: {id: Number(id)},
      data: {usuarioId, servicoId, data},
    });

    res.status(200).json(reserva);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({error: "Erro ao atualizar reserva. Tente novamente mais tarde."});
  }
};

// Controlador para excluir uma reserva
export const deleteReserva = async (req: Request, res: Response) => {
  const {id} = req.params;

  try {
    const reserva = await prisma.reserva.delete({
      where: {id: Number(id)},
    });

    res.status(200).json({message: "Reserva excluída com sucesso.", reserva});
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({error: "Erro ao excluir reserva. Tente novamente mais tarde."});
  }
};
