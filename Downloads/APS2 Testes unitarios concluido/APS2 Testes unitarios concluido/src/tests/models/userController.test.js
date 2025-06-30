import { describe, it, expect, jest, afterEach } from "@jest/globals";
import UserController from "../../controllers/userController.js";
import { UserService } from "../../services/userService.js";
import { UserDTO } from "../../dtos/userDTO.js";

jest.mock("../../services/userService.js");

describe("Testes do UserController", () => {
  const mockRequest = (body = {}, params = {}) => ({ body, params });
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  afterEach(() => {
    jest.restoreAllMocks(); // restaura mocks para evitar interferência entre testes
  });

  it("Deve listar todos os usuários", async () => {
    const usersMock = [{ _id: "1", name: "Gabriel" }, { _id: "2", name: "Felipe" }];
    const serviceInstance = UserController.UserService;
    jest.spyOn(serviceInstance, "getAllUser").mockResolvedValue(usersMock);

    const req = mockRequest();
    const res = mockResponse();

    await UserController.getAllUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(usersMock.map(u => new UserDTO(u)));
  });

  it("Deve criar um novo usuário", async () => {
    const newUser = { _id: "1", name: "Gabriel" };
    const serviceInstance = UserController.UserService;
    jest.spyOn(serviceInstance, "register").mockResolvedValue(newUser);

    const req = mockRequest(newUser);
    const res = mockResponse();

    await UserController.createUser(req, res);

    expect(serviceInstance.register).toHaveBeenCalledWith(newUser);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User Criado com sucesso",
      User: new UserDTO(newUser),
    });
  });

  it("Deve buscar usuário por ID", async () => {
    const userMock = { _id: "1", name: "Gabriel" };
    const serviceInstance = UserController.UserService;
    jest.spyOn(serviceInstance, "getUserById").mockResolvedValue(userMock);

    const req = mockRequest({}, { id: "1" });
    const res = mockResponse();

    await UserController.getUserById(req, res);

    expect(serviceInstance.getUserById).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(new UserDTO(userMock));
  });

  it("Deve retornar 404 se usuário não for encontrado", async () => {
    const serviceInstance = UserController.UserService;
    jest.spyOn(serviceInstance, "getUserById").mockResolvedValue(null);

    const req = mockRequest({}, { id: "404" });
    const res = mockResponse();

    await UserController.getUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("User não encontrado");
  });

  it("Deve atualizar um usuário existente", async () => {
    const updated = { _id: "1", name: "Atualizado" };
    const serviceInstance = UserController.UserService;
    jest.spyOn(serviceInstance, "updateUser").mockResolvedValue(updated);

    const req = mockRequest({ name: "Atualizado" }, { id: "1" });
    const res = mockResponse();

    await UserController.updateUser(req, res);

    expect(serviceInstance.updateUser).toHaveBeenCalledWith("1", { name: "Atualizado" }, { new: true });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User Criado com sucesso",
      Users: new UserDTO(updated),
    });
  });

  it("Deve retornar 404 ao tentar atualizar usuário inexistente", async () => {
    const serviceInstance = UserController.UserService;
    jest.spyOn(serviceInstance, "updateUser").mockResolvedValue(null);

    const req = mockRequest({ name: "Falha" }, { id: "404" });
    const res = mockResponse();

    await UserController.updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("User não encontrado");
  });

  it("Deve deletar um usuário por ID", async () => {
    const serviceInstance = UserController.UserService;
    jest.spyOn(serviceInstance, "deleteUser").mockResolvedValue({});

    const req = mockRequest({}, { id: "1" });
    const res = mockResponse();

    await UserController.deletedUser(req, res);

    expect(serviceInstance.deleteUser).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("Autor deletado");
  });

  it("Deve retornar 404 ao tentar deletar usuário inexistente", async () => {
    const serviceInstance = UserController.UserService;
    jest.spyOn(serviceInstance, "deleteUser").mockResolvedValue(null);

    const req = mockRequest({}, { id: "999" });
    const res = mockResponse();

    await UserController.deletedUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("User não encontrado");
  });

  // --- Testes de erro (500) ---

  it("Deve retornar 500 se erro ocorrer em getAllUser", async () => {
    const serviceInstance = UserController.UserService;
    jest.spyOn(serviceInstance, "getAllUser").mockRejectedValue(new Error("Erro interno"));

    const req = mockRequest();
    const res = mockResponse();

    await UserController.getAllUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Erro interno");
  });

  it("Deve retornar 500 se erro ocorrer em createUser", async () => {
    const serviceInstance = UserController.UserService;
    jest.spyOn(serviceInstance, "register").mockRejectedValue(new Error("Erro criação"));

    const req = mockRequest({ name: "Gabriel" });
    const res = mockResponse();

    await UserController.createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Erro criação");
  });

  it("Deve retornar 500 se erro ocorrer em getUserById", async () => {
    const serviceInstance = UserController.UserService;
    jest.spyOn(serviceInstance, "getUserById").mockRejectedValue(new Error("Erro ID"));

    const req = mockRequest({}, { id: "1" });
    const res = mockResponse();

    await UserController.getUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Erro ID");
  });

  it("Deve retornar 500 se erro ocorrer em updateUser", async () => {
    const serviceInstance = UserController.UserService;
    jest.spyOn(serviceInstance, "updateUser").mockRejectedValue(new Error("Erro update"));

    const req = mockRequest({ name: "Novo" }, { id: "1" });
    const res = mockResponse();

    await UserController.updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Erro update");
  });

  it("Deve retornar 500 se erro ocorrer em deletedUser", async () => {
    const serviceInstance = UserController.UserService;
    jest.spyOn(serviceInstance, "deleteUser").mockRejectedValue(new Error("Erro delete"));

    const req = mockRequest({}, { id: "1" });
    const res = mockResponse();

    await UserController.deletedUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Erro delete");
  });
});
