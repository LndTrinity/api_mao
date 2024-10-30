import type {Request, Response} from "express";
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

export const createServico = async (req: Request, res: Response) => {
  // Validação dos dados recebidos
  const {prestadorId, nome, descricao, preco} = req.body;

  if (!prestadorId || !nome || !descricao || preco === undefined) {
    return res.status(400).json({
      error:
        "Todos os campos são obrigatórios: prestadorId, nome, descricao e preco.",
    });
  }

  // Tentativa de criação do serviço
  try {
    const servico = await prisma.servico.create({
      data: {prestadorId, nome, descricao, preco},
    });
    res.status(201).json(servico);
  } catch (error: unknown) {
    console.error(error); // Log do erro para depuração
    res
      .status(500)
      .json({error: "Erro ao criar serviço. Tente novamente mais tarde."});
  }
};

export const getAllServicos = async (req: Request, res: Response) => {
  try {
    const servicos = await prisma.servico.findMany();
    res.status(200).json(servicos);
  } catch (error: unknown) {
    console.error(error);
    res
      .status(500)
      .json({error: "Erro ao buscar serviços. Tente novamente mais tarde."});
  }
};

export const getServico = async (req: Request, res: Response) => {
  const {id} = req.params;

  try {
    const servico = await prisma.servico.findUnique({
      where: {id: Number(id)},
    });

    if (!servico) {
      return res.status(404).json({error: "Serviço não encontrado."});
    }

    res.status(200).json(servico);
  } catch (error: unknown) {
    console.error(error);
    res
      .status(500)
      .json({error: "Erro ao buscar serviço. Tente novamente mais tarde."});
  }
};

export const updateServico = async (req: Request, res: Response) => {
  const {id} = req.params;
  const {prestadorId, nome, descricao, preco} = req.body;

  // Validação dos dados recebidos
  if (!prestadorId && !nome && !descricao && !preco) {
    return res.status(400).json({
      error: "Pelo menos um campo deve ser fornecido para atualização.",
    });
  }

  try {
    const servico = await prisma.servico.update({
      where: {id: Number(id)},
      data: {prestadorId, nome, descricao, preco},
    });

    res.status(200).json(servico);
  } catch (error: unknown) {
    console.error(error);
    res
      .status(500)
      .json({error: "Erro ao atualizar serviço. Tente novamente mais tarde."});
  }
};

export const deleteServico = async (req: Request, res: Response) => {
  const {id} = req.params;

  try {
    const servico = await prisma.servico.delete({
      where: {id: Number(id)},
    });

    res.status(200).json({message: "Serviço excluído com sucesso.", servico});
  } catch (error: unknown) {
    console.error(error);
    res
      .status(500)
      .json({error: "Erro ao excluir serviço. Tente novamente mais tarde."});
  }
};
