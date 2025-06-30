import { AuthorDTO } from "../dtos/authorDTO.js";
import { AuthorService } from "../services/authorService.js";

class AuthorController {
  constructor() {
    this.authorService = new AuthorService();
  }

  getAllAuthor = async (req, res) => {
    try {
      const listAuthors = await this.authorService.getAllAuthor();
      res.status(200).json(listAuthors.map((author) => new AuthorDTO(author)));
    } catch (error) {
      res.status(500).json({
        error: "Erro ao listar autor.",
        message: error.message,
      });
    }
  };

  createAuthor = async (req, res) => {
    try {
      const newAuthor = await this.authorService.createAuthor(req.body);
      res.status(201).json({
        message: "Author Criado com sucesso",
        Author: new AuthorDTO(newAuthor),
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  getAuthorById = async (req, res) => {
    try {
      const AuthorById = await this.authorService.getAuthorById(req.params.id);
      res.status(200).json(new AuthorDTO(AuthorById));
    } catch (error) {
      if (error.message === "Autor não encontrado") {
        return res.status(404).send("Author não encontrado");
      }
      res.status(500).send(error.message);
    }
  };

  searchAuthorByName = async (req, res) => {
    try {
      const { name } = req.params;
      if (!name || name.trim() === "") {
        return res.status(400).json({
          error: "invalid_name",
          message: "Nome não pode ser vazio",
        });
      }

      const authors = await this.authorService.searchAutorByName(name);

      if (authors.length === 0) {
        return res.status(404).json({
          message: "Não encontrado",
          name: name,
        });
      }

      res.status(200).json(authors.map((author) => new AuthorDTO(author)));
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  updateAuthor = async (req, res) => {
    try {
      const updateAuthor = await this.authorService.updateAuthor(
        req.params.id,
        req.body
      );

      res.status(200).json({
        message: "Author atualizado com sucesso!",
        author: new AuthorDTO(updateAuthor),
      });
    } catch (error) {
      if (error.message === "Autor não encontrado") {
        return res.status(404).send("Author não encontrado");
      }
      res.status(500).send(error.message);
    }
  };

  deletedAuthor = async (req, res) => {
    try {
      const deleteAuthor = await this.authorService.deleteAuthor(req.params.id);
      res.status(200).json({
        message: "Autor removido com sucesso!",
      });
    } catch (error) {
      if (error.message === "Autor não encontrado") {
        return res.status(404).send("Author não encontrado");
      }
      res.status(500).send(error.message);
    }
  };
}

export default AuthorController;
