import express from "express"
import UserController from "../controllers/userController.js"
import authMiddleware from "../middleware/authMiddleware.js";

const routes = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Usuarios
 *     description: Endpoints para gerenciamento de usuário
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "663ccf1e934d1eab3a4ed27f"
 *         name:
 *           type: string
 *           example: "Maria Oliveira"
 *         email:
 *           type: string
 *           format: email
 *           example: "maria.oliveira@example.com"
 *         password:
 *           type: string
 *           example: "$2a$10$ExemploDeHashBcrypt"
 *
 *     UserInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: "Maria Oliveira"
 *         email:
 *           type: string
 *           format: email
 *           example: "maria.oliveira@example.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "senhaSegura123"
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Lista todos os usuários
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Não autorizado
 */
routes.get("/user", authMiddleware, UserController.getAllUser);

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Cria um novo usuário
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Dados inválidos
 */
routes.post("/user", UserController.createUser);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Atualiza um usuário pelo ID
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Usuário não encontrado
 */

routes.put("/user/:id", authMiddleware, UserController.updateUser);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Usuário não encontrado
 */
routes.get("/user/:id", authMiddleware, UserController.getUserById);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Remove um usuário pelo ID
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       204:
 *         description: Usuário removido com sucesso (sem conteúdo)
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Usuário não encontrado
 */
routes.delete("/user/:id", authMiddleware, UserController.deletedUser);

export default routes;


