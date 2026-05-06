import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { HTTPError, onError } from "../../src/utils";

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("utils/onError", () => {
  it("should handle with HTTPError errors", () => {
    const error = new HTTPError(400, "Bad request", [
      {
        type: "validation",
        field: "email",
        description: "Email is required",
        location: "body",
      },
    ]);

    const res = mockResponse();
    onError(error, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Bad request",
      data: undefined,
      details: [
        {
          type: "validation",
          field: "email",
          description: "Email is required",
          location: "body",
        },
      ],
    });
  })

  it("should return Internal server error to unknown errors", () => {
    const error = new Error("Unknown error");

    const res = mockResponse();
    onError(error, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Internal server error",
      data: undefined,
      details: [
        {
          type: "system",
          field: "unknown",
          description: 'Error: Unknown error',
          location: error.name,
        },
      ],
    });
  })

  describe("PrismaClientKnownRequestError", () => {
    it("should handle with P2002 error", () => {
      const error = new PrismaClientKnownRequestError(
        "Unique constraint failed on the fields: (`email`)",
        {
          code: 'P2002',
          clientVersion: "4.0.0",
          meta: {
            target: "email",
          }
        });

      const res = mockResponse();
      onError(error, res);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Falha de validação: valor duplicado",
        data: undefined,
        details: "email já existe.",
      });
    })

    it("should handle with P2025 error", () => {
      const error = new PrismaClientKnownRequestError(
        "An operation failed because it depends on one or more records that were required but not found. No changes were made.",
        {
          code: 'P2025',
          clientVersion: "4.0.0"
        });

      const res = mockResponse();
      onError(error, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Recurso não encontrado",
        data: undefined,
        details: "O recurso que você está tentando acessar ou modificar não existe.",

      });
    })

    it("should handle with unknown PrismaClientKnownRequestError", () => {
      const error = new PrismaClientKnownRequestError(
        "Some other error",
        {
          code: 'P9999',
          clientVersion: "4.0.0"
        });

      const res = mockResponse();
      onError(error, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Internal server error",
        data: undefined,
        details: "P9999: Some other error",
      });
    })
  })
})