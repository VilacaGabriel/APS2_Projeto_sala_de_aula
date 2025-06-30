import express from "express"
import PostController from "../controllers/postController.js"
import authMiddleware from "../middleware/authMiddleware.js";

const routes = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Postagens
 *     description: Endpoints para gerenciamento de postagens
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "663cd098d6eaf51ceba2c008"
 *         title:
 *           type: string
 *           example: "Título do Post"
 *         description:
 *           type: string
 *           example: "Descrição detalhada do post."
 *         author:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: "663ccf1e934d1eab3a4ed27f"
 *             name:
 *               type: string
 *               example: "João Silva"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-05-10T14:12:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-05-12T10:30:00.000Z"
 *
 *     PostInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - author
 *       properties:
 *         title:
 *           type: string
 *           example: "Novo Post"
 *         description:
 *           type: string
 *           example: "Conteúdo do novo post"
 *         author:
 *           type: string
 *           example: "663ccf1e934d1eab3a4ed27f"
 */


/**
 * @swagger
 * /post:
 *   get:
 *     summary: Lista todas as postagens
 *     tags:
 *       - Postagens
 *     responses:
 *       200:
 *         description: Lista de postagens retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
routes.get("/post", PostController.getAllPost);

/**
 * @swagger
 * /post:
 *   post:
 *     summary: Cria uma nova postagem
 *     tags:
 *       - Postagens
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostInput'
 *     responses:
 *       201:
 *         description: Postagem criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
routes.post("/post", authMiddleware, PostController.createPost);

/**
 * @swagger
 * /post/{id}:
 *   put:
 *     summary: Atualiza uma postagem pelo ID
 *     tags:
 *       - Postagens
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da postagem
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostInput'
 *     responses:
 *       200:
 *         description: Postagem atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Postagem não encontrada
 */
routes.put("/post/:id", authMiddleware, PostController.updatePost);

/**
 * @swagger
 * /post/search/{keyword}:
 *   get:
 *     summary: Busca postagens por palavra-chave
 *     tags:
 *       - Postagens
 *     parameters:
 *       - in: path
 *         name: keyword
 *         required: true
 *         schema:
 *           type: string
 *         description: Palavra-chave a ser pesquisada no título ou descrição
 *     responses:
 *       200:
 *         description: Lista de postagens encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
routes.get("/post/search/:keyword", PostController.searchPostByKeyword);

/**
 * @swagger
 * /post/{id}:
 *   get:
 *     summary: Busca uma postagem pelo ID
 *     tags:
 *       - Postagens
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da postagem
 *     responses:
 *       200:
 *         description: Postagem encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Postagem não encontrada
 */
routes.get("/post/:id", PostController.getPostById);

/**
 * @swagger
 * /post/{id}:
 *   delete:
 *     summary: Remove uma postagem pelo ID
 *     tags:
 *       - Postagens
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da postagem
 *     responses:
 *       204:
 *         description: Postagem removida com sucesso (sem conteúdo)
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Postagem não encontrada
 */
routes.delete("/post/:id", authMiddleware, PostController.deletedPost);

export default routes;


