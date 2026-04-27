import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API de Tweeter',
    "description": "API para gerenciar tweets. A API permite que um usuário cadastrado crie, leia, atualize e exclua tweets. Cada tweet possui um conteúdo, data de criação e informações do usuário que o criou. A API é protegida por autenticação JWT, garantindo que apenas usuários autorizados possam acessar e modificar seus tweets."
  },
  host: 'localhost:3030',
  schemes: ["http"],
  securityDefinitions: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: [
    {
      name: 'Health',
      description: 'Endpoints relacionados à verificação de saúde da API.',
    },
    {
      name: 'Auth',
      description: 'Endpoints relacionados à autenticação, como login e logout.',
    },
    {
      name: 'Users',
      description: 'Endpoints relacionados ao gerenciamento de usuários, incluindo registro, login e atualização de perfil.',
    }
  ],
  components: {
    Tweet: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'ID do tweet',
          example: '123e4567-e89b-12d3-a456-426614174000'
        },
        content: {
          type: 'string',
          description: 'Conteúdo do tweet',
          example: 'Este é um tweet de exemplo.'
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          description: 'Data e hora de criação do tweet',
          example: '2024-06-01T12:00:00Z'
        },
        userId: {
          type: 'string',
          description: 'ID do usuário que criou o tweet',
          example: '72b29c86-3525-4ce3-84c0-c76243b090c3'
        }
      }
    },
    User: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'ID do usuário',
          example: '123e4567-e89b-12d3-a456-426614174000'
        },
        name: {
          type: 'string',
          description: 'Nome do usuário',
          example: 'Luara Kerlen'
        },
        username: {
          type: 'string',
          description: 'Nome de usuário único para login',
          example: 'luarakerlen'
        },
        email: {
          type: 'string',
          format: 'email',
          description: 'Email do usuário',
          example: 'luara.kerlen@example.com'
        },
        photoUrl: {
          type: 'string',
          format: 'uri',
          description: 'URL da foto de perfil do usuário',
          example: 'https://example.com/foto.jpg'
        },
        tweets: {
          type: 'array',
          description: 'Lista de tweets criados pelo usuário',
          items: {
            $ref: '#/components/Tweet'
          }
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          description: 'Data e hora de criação do usuário',
          example: '2024-06-01T12:00:00Z'
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          description: 'Data e hora da última atualização do usuário',
          example: '2024-06-02T15:30:00Z'
        },
      }
    },
    Pagination: {
      type: 'object',
      properties: {
        page: {
          type: 'integer',
          description: 'Número da página atual',
          example: 1
        },
        pageSize: {
          type: 'integer',
          description: 'Número de itens por página',
          example: 10
        },
        total: {
          type: 'integer',
          description: 'Número total de itens disponíveis',
          example: 100
        },
        totalPages: {
          type: 'integer',
          description: 'Número total de páginas disponíveis',
          example: 20
        },
      }
    },
    Error400Response: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Requisição inválida' }
      }
    },
    Error401CredentialsResponse: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'E-mail ou senha inválidos' }
      }
    },
    Error401TokenAusenteResponse: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Token de autenticação ausente. Por favor, forneça um token válido no cabeçalho Authorization.' }
      }
    },
    Error401TokenInvalidoResponse: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Token de autenticação inválido ou expirado. Por favor, forneça um token válido.' }
      }
    },
    Error404Response: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Recurso não encontrado' }
      }
    },
    Error409Response: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Falha de validação: valor duplicado' },
        details: { type: 'string', example: 'email/username já existe.' }
      }
    },
    Error500Response: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Internal server error' }
      }
    },
    '@schemas': {
      createUserSchema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Nome do usuário',
            example: 'Luara Kerlen'
          },
          username: {
            type: 'string',
            description: 'Nome de usuário único para login',
            example: 'luarakerlen'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Email do usuário',
            example: 'luara.kerlen@example.com'
          },
          password: {
            type: 'string',
            description: 'Senha do usuário',
            example: 'senha123'
          },
          photoUrl: {
            type: 'string',
            format: 'uri',
            description: 'URL da foto de perfil do usuário',
            example: 'https://example.com/foto.jpg'
          }
        },
        required: ['name', 'username', 'email', 'password']
      },
      loginSchema: {
        type: 'object',
        properties: {
          emailOrUsername: {
            type: 'string',
            description: 'Email ou nome de usuário do usuário',
            example: 'luara.kerlen@example.com'
          },
          password: {
            type: 'string',
            description: 'Senha do usuário',
            example: 'senha123'
          }
        },
        required: ['emailOrUsername', 'password']
      },
      updateUserSchema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Nome do usuário',
            example: 'Luara Kerlen'
          },
          username: {
            type: 'string',
            description: 'Nome de usuário único para login',
            example: 'luarakerlen'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Email do usuário',
            example: 'luara.kerlen@example.com'
          },
          password: {
            type: 'string',
            description: 'Senha do usuário',
            example: 'senha123'
          },
          photoUrl: {
            type: 'string',
            format: 'uri',
            description: 'URL da foto de perfil do usuário',
            example: 'https://example.com/foto.jpg'
          }
        },
        required: []
      },
      // Responses
      createUserResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Usuário criado com sucesso!' },
          data: {
            $ref: '#/components/User'
          }
        }
      },
      loginResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Autenticação realizada com sucesso.' },
          data: {
            type: 'object',
            properties: {
              token: {
                type: 'string',
                description: 'Token JWT gerado após login bem-sucedido',
                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLCJpYXQiOjE2ODg4ODg4MDAsImV4cCI6MTY4ODg5MjQwMH0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
              },
              user: {
                $ref: '#/components/User'
              }
            }
          }
        }
      },
      updateUserResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Usuário atualizado com sucesso!' },
          data: {
            $ref: '#/components/User'
          }
        }
      },
      deleteUserResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Usuário deletado com sucesso!' },
          data: {
            $ref: '#/components/User'
          }
        }
      },
      getUserByIdResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Usuário encontrado com sucesso!' },
          data: {
            $ref: '#/components/User'
          }
        }
      },
      apiHealthResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'A API está saudável.' }
        }
      }
    },
    parameters: {
      userId: {
        name: 'id',
        in: 'path',
        description: 'ID do usuário',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
          example: '72b29c86-3525-4ce3-84c0-c76243b090c3'
        }
      },
      taskTitle: {
        name: 'title',
        in: 'query',
        description: 'Filtro por título da tarefa',
        required: false,
        schema: {
          type: 'string',
          example: 'Comprar leite'
        }
      },
      taskStatus: {
        name: 'status',
        in: 'query',
        description: 'Filtro por status da tarefa',
        required: false,
        schema: {
          type: 'string',
          enum: ['pending', 'in_progress', 'completed'],
          example: 'pending'
        }
      },
      page: {
        name: 'page',
        in: 'query',
        description: 'Número da página para paginação',
        required: false,
        schema: {
          type: 'integer',
          minimum: 1,
          example: 1
        }
      },
      pageSize: {
        name: 'pageSize',
        in: 'query',
        description: 'Quantidade de itens por página para paginação',
        required: false,
        schema: {
          type: 'integer',
          minimum: 1,
          example: 10
        }
      }
    }
  },
};

const outputFile = './swagger.json';
const routes = ['./routes/health.routes.ts', './routes/auth.routes.ts', './routes/users.routes.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc);
