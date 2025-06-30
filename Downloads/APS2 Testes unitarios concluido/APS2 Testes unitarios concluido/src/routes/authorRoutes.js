import express from "express"
import AuthorController from "../controllers/authorController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const routes = express.Router();

const authorController = new AuthorController();

/**
 * @swagger
 * tags: 
 *  name: Autores
 *  description: Endpoints para gerenciamento de autores
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Author:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "663ccf1e934d1eab3a4ed27f"
 *         name:
 *           type: string
 *           example: "João Silva"
 *         email:
 *           type: string
 *           example: "joao.silva@example.com"
 *     AuthorInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           example: "João Silva"
 *         email:
 *           type: string
 *           example: "joao.silva@example.com"
 */


/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Lista todos os autores
 *     tags: 
 *       - Autores
 *     responses:
 *       200:
 *         description: Lista de autores retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 */
routes.get("/authors", authorController.getAllAuthor);

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Cria um novo Autor
 *     tags: 
 *       - Autores
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthorInput'
 *           example:
 *             name: "João Silva"
 *             email: "joao.silva@example.com"
 *     responses:
 *       201:
 *         description: Autor criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
routes.post("/authors", authMiddleware, authorController.createAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Busca um autor pelo ID
 *     tags: 
 *       - Autores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do autor
 *     responses:
 *       200:
 *         description: Autor encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: Autor não encontrado
 */
routes.get("/authors/:id", authorController.getAuthorById);

/**
 * @swagger
 * /authors/search/{name}:
 *   get:
 *     summary: Busca autores por nome
 *     tags: 
 *       - Autores
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do autor
 *     responses:
 *       200:
 *         description: Lista de autores encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 */
routes.get("/authors/search/:name", authorController.searchAuthorByName)

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Remove um autor pelo ID
 *     tags: 
 *       - Autores
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do autor
 *     responses:
 *       204:
 *         description: Autor removido com sucesso (sem conteúdo)
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Autor não encontrado
 */
routes.delete("/authors/:id", authMiddleware, authorController.deletedAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Atualiza um autor pelo ID
 *     tags: 
 *       - Autores
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do autor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthorInput'
 *           example:
 *             name: "João Silva Atualizado"
 *             email: "joao.atualizado@example.com"
 *     responses:
 *       200:
 *         description: Autor atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Autor não encontrado
 */
routes.put("/authors/:id", authMiddleware, authorController.updateAuthor);

export default routes;


