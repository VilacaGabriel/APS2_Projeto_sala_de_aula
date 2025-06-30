import { describe, it, expect, jest, afterEach } from "@jest/globals";
import PostController from "../../controllers/postController.js";
import { PostDTO } from "../../dtos/postDTO.js";

describe("Testes do PostController", () => {
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

  it("Deve listar todos os posts", async () => {
    const postsMock = [{ title: "A" }, { title: "B" }];
    jest.spyOn(PostController.PostService, "getAllPost").mockResolvedValue(postsMock);

    const req = mockRequest();
    const res = mockResponse();

    await PostController.getAllPost(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(postsMock.map(p => new PostDTO(p)));
  });

  it("Deve criar um novo post", async () => {
    const newPost = { title: "Novo Post" };
    jest.spyOn(PostController.PostService, "createPost").mockResolvedValue(newPost);

    const req = mockRequest(newPost);
    const res = mockResponse();

    await PostController.createPost(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Post Criado com sucesso",
      Post: new PostDTO(newPost),
    });
  });

  it("Deve buscar post por ID", async () => {
    const postMock = { _id: "1", title: "Post A" };
    jest.spyOn(PostController.PostService, "getPostById").mockResolvedValue(postMock);

    const req = mockRequest({}, { id: "1" });
    const res = mockResponse();

    await PostController.getPostById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(new PostDTO(postMock));
  });

  it("Deve retornar 404 se post não for encontrado por ID", async () => {
    jest.spyOn(PostController.PostService, "getPostById").mockResolvedValue(null);

    const req = mockRequest({}, { id: "404" });
    const res = mockResponse();

    await PostController.getPostById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("Post não encontrado");
  });

  it("Deve buscar posts por palavra-chave", async () => {
    const posts = [{ title: "Teste" }];
    jest.spyOn(PostController.PostService, "searchPostByKeyword").mockResolvedValue(posts);

    const req = mockRequest({}, { Keyword: "Teste" });
    const res = mockResponse();

    await PostController.searchPostByKeyword(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(posts.map(p => new PostDTO(p)));
  });

  it("Deve retornar 404 se nenhum post for encontrado pela palavra-chave", async () => {
    jest.spyOn(PostController.PostService, "searchPostByKeyword").mockResolvedValue([]);

    const req = mockRequest({}, { Keyword: "Nada" });
    const res = mockResponse();

    await PostController.searchPostByKeyword(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Não encontrado",
      Title: "Nada",
    });
  });

  it("Deve atualizar um post existente", async () => {
    const updated = { _id: "1", title: "Atualizado" };
    jest.spyOn(PostController.PostService, "updatePost").mockResolvedValue(updated);

    const req = mockRequest({ title: "Atualizado" }, { id: "1" });
    const res = mockResponse();

    await PostController.updatePost(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Post Criado com sucesso",
      Posts: new PostDTO(updated),
    });
  });

  it("Deve retornar 404 ao tentar atualizar post inexistente", async () => {
    jest.spyOn(PostController.PostService, "updatePost").mockResolvedValue(null);

    const req = mockRequest({ title: "Falha" }, { id: "404" });
    const res = mockResponse();

    await PostController.updatePost(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("Post não encontrado");
  });

  it("Deve deletar um post por ID", async () => {
    jest.spyOn(PostController.PostService, "deletePost").mockResolvedValue({});

    const req = mockRequest({}, { id: "1" });
    const res = mockResponse();

    await PostController.deletedPost(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("Autor deletado");
  });

  it("Deve retornar 404 ao tentar deletar post inexistente", async () => {
    jest.spyOn(PostController.PostService, "deletePost").mockResolvedValue(null);

    const req = mockRequest({}, { id: "999" });
    const res = mockResponse();

    await PostController.deletedPost(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("Post não encontrado");
  });

  // --- Erros 500 ---

  it("Deve retornar 500 se erro ocorrer em getAllPost", async () => {
    jest.spyOn(PostController.PostService, "getAllPost").mockRejectedValue(new Error("Erro interno"));

    const req = mockRequest();
    const res = mockResponse();

    await PostController.getAllPost(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Erro interno");
  });

  it("Deve retornar 500 se erro ocorrer em createPost", async () => {
    jest.spyOn(PostController.PostService, "createPost").mockRejectedValue(new Error("Erro criação"));

    const req = mockRequest({ title: "Post" });
    const res = mockResponse();

    await PostController.createPost(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Erro criação");
  });

  it("Deve retornar 500 se erro ocorrer em getPostById", async () => {
    jest.spyOn(PostController.PostService, "getPostById").mockRejectedValue(new Error("Erro ID"));

    const req = mockRequest({}, { id: "1" });
    const res = mockResponse();

    await PostController.getPostById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Erro ID");
  });

  it("Deve retornar 500 se erro ocorrer em searchPostByKeyword", async () => {
    jest.spyOn(PostController.PostService, "searchPostByKeyword").mockRejectedValue(new Error("Erro busca"));

    const req = mockRequest({}, { Keyword: "bug" });
    const res = mockResponse();

    await PostController.searchPostByKeyword(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Erro busca");
  });

  it("Deve retornar 500 se erro ocorrer em updatePost", async () => {
    jest.spyOn(PostController.PostService, "updatePost").mockRejectedValue(new Error("Erro update"));

    const req = mockRequest({ title: "Novo" }, { id: "1" });
    const res = mockResponse();

    await PostController.updatePost(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Erro update");
  });

  it("Deve retornar 500 se erro ocorrer em deletedPost", async () => {
    jest.spyOn(PostController.PostService, "deletePost").mockRejectedValue(new Error("Erro delete"));

    const req = mockRequest({}, { id: "1" });
    const res = mockResponse();

    await PostController.deletedPost(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Erro delete");
  });
});
