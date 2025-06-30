import { describe, it, expect, jest, afterEach } from "@jest/globals";
import AuthController from "../../controllers/authController.js";
import AuthService from "../../services/authService.js";

jest.mock("../../services/authService.js");

describe("Testando AuthController", () => {
  const mockRequest = (body = {}) => ({ body });
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Deve realizar login com sucesso", async () => {
    const loginResult = {
      token: "fake-jwt-token",
      user: {
        id: "1",
        email: "test@email.com",
      },
    };

    AuthService.prototype.login = jest.fn().mockResolvedValue(loginResult);

    const req = mockRequest({
      email: "test@email.com",
      password: "123456",
    });
    const res = mockResponse();

    await AuthController.login(req, res);

    expect(AuthService.prototype.login).toHaveBeenCalledWith({
      email: "test@email.com",
      password: "123456",
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(loginResult);
  });

  it("Deve retornar 401 se o login falhar", async () => {
    AuthService.prototype.login = jest
      .fn()
      .mockRejectedValue(new Error("Credenciais inválidas"));

    const req = mockRequest({
      email: "erro@email.com",
      password: "senhaerrada",
    });
    const res = mockResponse();

    await AuthController.login(req, res);

    expect(AuthService.prototype.login).toHaveBeenCalledWith({
      email: "erro@email.com",
      password: "senhaerrada",
    });

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({
      message: "Credenciais inválidas",
    });
  });
});
