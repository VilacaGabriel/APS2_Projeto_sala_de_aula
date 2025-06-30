import { AuthorRepository } from "../repositories/authorRepository.js";
import { AuthorDTO } from "../dtos/authorDTO.js";

export class AuthorService {
  constructor() {
    this.AuthorRepository = new AuthorRepository();
  }

  createAuthor = async (authorData) => {
    const author = AuthorDTO.fromRequest(authorData);
    return await this.AuthorRepository.create(author);
  };

  getAllAuthor = async () => {
    return await this.AuthorRepository.findAll();
  };

  getAuthorById = async (id) => {
    const foundAuthor = await this.AuthorRepository.findById(id);
    if (!foundAuthor) {
      throw new Error("Autor não encontrado");
    }
    return foundAuthor;
  };

  updateAuthor = async (id, authorData) => {
    const updatedAuthor = await this.AuthorRepository.update(id, authorData);
    if (!updatedAuthor) {
      throw new Error("Autor não encontrado");
    }
    return updatedAuthor;
  };

  deleteAuthor = async (id) => {
    const deletedAuthor = await this.AuthorRepository.delete(id);
    if (!deletedAuthor) {
      throw new Error("Autor não encontrado");
    }
    return deletedAuthor;
  };

  searchAutorByName = async (name) => {
    if (!name || name.trim() === "") {
      throw new Error("Nome não pode ser vazio");
    }
    return await this.AuthorRepository.searchByName(name);
  };
}
