import type {Request, Response} from "express";
import {PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const registerUsuario = async (req: Request, res: Response) => {
  try {
    const {nome, email, senha, tipo} = req.body;
    const hashedSenha = await bcrypt.hash(senha, 10);
    const usuario = await prisma.usuario.create({
      data: {nome, email, senha: hashedSenha, tipo},
    });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({error: "Erro ao registrar usuário."});
  }
};

export const loginUsuario = async (req: Request, res: Response) => {
  try {
    const {email, senha} = req.body;
    const usuario = await prisma.usuario.findUnique({where: {email}});
    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return res.status(401).json({error: "Credenciais inválidas."});
    }
    const token = jwt.sign({id: usuario.id}, "chave-secreta", {
      expiresIn: "1h",
    });
    res.json({token});
  } catch (error) {
    res.status(400).json({error: "Erro ao fazer login."});
  }
};

export const getAllUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getDadosUsuario = async (req: Request, res: Response) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(401).json({ error: "Dados inválidos." });
    }
    const usuarios = await prisma.usuario.findUnique(
      { where: { email } }
    );
    
    
    res.json(usuarios);
  } catch (error) {

    res.status(400).json(error);
  }
}

export const getUsuario = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const usuario = await prisma.usuario.findUnique({where: {id}});
    if (!usuario)
      return res.status(404).json({error: "Usuário não encontrado."});
    res.json(usuario);
  } catch (error) {
    res.status(400).json({error: "Erro ao buscar usuário."});
  }
};

export const updateUsuario = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const data = req.body;
    const usuario = await prisma.usuario.update({where: {id}, data});
    res.json(usuario);
  } catch (error) {
    res.status(400).json({error: "Erro ao atualizar usuário."});
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    await prisma.usuario.delete({where: {id}});
    res.status(204).send();
  } catch (error) {
    res.status(400).json({error: "Erro ao excluir usuário."});
  }
};
