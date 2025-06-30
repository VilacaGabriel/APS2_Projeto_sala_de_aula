import { describe, expect, it, jest, afterEach } from "@jest/globals";
import AuthorController from "../../controllers/authorController.js";
import * as AuthorModule from "../../models/Author.js";
import { AuthorDTO } from "../../dtos/authorDTO.js";

jest.mock("../../models/Author.js");

describe("Testando o AuthorController com acesso direto ao Model", () => {
  const mockRequest = (body = {}, params = {}) => ({ body, params });
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Deve listar todos os autores", async () => {
    const authorsMock = [
      { _id: "1", name: "João", email: "joao@email.com" },
      { _id: "2", name: "Maria", email: "maria@email.com" },
    ];
    AuthorModule.author.find = jest.fn().mockResolvedValue(authorsMock);

    const req = mockRequest();
    const res = mockResponse();
    const controller = new AuthorController();

    await controller.getAllAuthor(req, res);

    expect(AuthorModule.author.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      authorsMock.map((a) => new AuthorDTO(a))
    );
  });

  it("Deve criar um novo autor", async () => {
    const newAuthor = { name: "Novo", email: "novo@email.com" };
    AuthorModule.author.create = jest.fn().mockResolvedValue(newAuthor);

    const req = mockRequest(newAuthor);
    const res = mockResponse();
    const controller = new AuthorController();

    await controller.createAuthor(req, res);

    expect(AuthorModule.author.create).toHaveBeenCalledWith(newAuthor);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Author Criado com sucesso",
      Author: new AuthorDTO(newAuthor),
    });
  });

  it("Deve buscar autor por ID", async () => {
    const authorMock = { _id: "123", name: "João", email: "joao@email.com" };
    AuthorModule.author.findById = jest.fn().mockResolvedValue(authorMock);

    const req = mockRequest({}, { id: "123" });
    const res = mockResponse();
    const controller = new AuthorController();

    await controller.getAuthorById(req, res);

    expect(AuthorModule.author.findById).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(new AuthorDTO(authorMock));
  });

  it("Deve retornar 404 se autor não for encontrado por ID", async () => {
    AuthorModule.author.findById = jest.fn().mockResolvedValue(null);

    const req = mockRequest({}, { id: "naoexiste" });
    const res = mockResponse();
    const controller = new AuthorController();

    await controller.getAuthorById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("Author não encontrado");
  });

  it("Deve buscar autores por nome", async () => {
    const authorsMock = [
      { name: "Carlos", email: "carlos@email.com" },
      { name: "Carla", email: "carla@email.com" },
    ];
    AuthorModule.author.find = jest.fn().mockResolvedValue(authorsMock);

    const req = mockRequest({}, { name: "Carl" });
    const res = mockResponse();
    const controller = new AuthorController();

    await controller.searchAuthorByName(req, res);

    expect(AuthorModule.author.find).toHaveBeenCalledWith({
      name: { $regex: "Carl", $options: "i" },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      authorsMock.map((a) => new AuthorDTO(a))
    );
  });

  it("Deve retornar erro ao buscar autores sem nome", async () => {
    const req = mockRequest({}, { name: "" });
    const res = mockResponse();
    const controller = new AuthorController();

    await controller.searchAuthorByName(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "invalid_name",
      message: "Nome não pode ser vazio",
    });
  });

  it("Deve atualizar um autor por ID", async () => {
    const updatedAuthor = {
      _id: "123",
      name: "Atualizado",
      email: "teste@email.com",
    };

    AuthorModule.author.findByIdAndUpdate = jest
      .fn()
      .mockResolvedValue(updatedAuthor);

    const req = mockRequest({ name: "Atualizado" }, { id: "123" });
    const res = mockResponse();
    const controller = new AuthorController();

    await controller.updateAuthor(req, res);

    expect(AuthorModule.author.findByIdAndUpdate).toHaveBeenCalledWith(
      "123",
      { name: "Atualizado" },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Author atualizado com sucesso!",
      author: new AuthorDTO(updatedAuthor),
    });
  });

  it("Deve retornar 404 ao tentar atualizar autor inexistente", async () => {
    AuthorModule.author.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

    const req = mockRequest({ name: "Falha" }, { id: "000" });
    const res = mockResponse();
    const controller = new AuthorController();

    await controller.updateAuthor(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("Author não encontrado");
  });

  it("Deve excluir um autor por ID", async () => {
    AuthorModule.author.findByIdAndDelete = jest.fn().mockResolvedValue({});

    const req = mockRequest({}, { id: "321" });
    const res = mockResponse();
    const controller = new AuthorController();

    await controller.deletedAuthor(req, res);

    expect(AuthorModule.author.findByIdAndDelete).toHaveBeenCalledWith("321");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Autor removido com sucesso!",
    });
  });

  it("Deve retornar 404 ao tentar excluir autor inexistente", async () => {
    AuthorModule.author.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    const req = mockRequest({}, { id: "999" });
    const res = mockResponse();
    const controller = new AuthorController();

    await controller.deletedAuthor(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("Author não encontrado");
  });
});
