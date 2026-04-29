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
    },
    {
      name: 'Follows',
      description: 'Endpoints relacionados ao gerenciamento de seguidores, permitindo que os usuários sigam e deixem de seguir outros usuários.',
    },
    {
      name: 'Tweets',
      description: 'Endpoints relacionados ao gerenciamento de tweets, incluindo criação, leitura, atualização e exclusão de tweets.',
    },
    {
      name: 'Likes',
      description: 'Endpoints relacionados ao gerenciamento de curtidas em tweets, permitindo que os usuários curtam e descurtam tweets.',
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
        type: {
          type: 'string',
          description: 'Tipo do tweet (POST ou REPLY)',
          example: 'POST'
        },
        parentId: {
          type: 'string',
          description: 'ID do tweet pai, presente apenas para tweets do tipo REPLY',
          example: ''
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
    TweetReply: {
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
        type: {
          type: 'string',
          description: 'Tipo do tweet (POST ou REPLY)',
          example: 'REPLY'
        },
        parentId: {
          type: 'string',
          description: 'ID do tweet pai, presente apenas para tweets do tipo REPLY',
          example: '123e4567-e89b-12d3-a456-426614174000'
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
    Like: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          description: 'ID do usuário que curtiu o tweet',
          example: '72b29c86-3525-4ce3-84c0-c76243b090c3'
        },
        tweetId: {
          type: 'string',
          description: 'ID do tweet que foi curtido',
          example: '123e4567-e89b-12d3-a456-426614174000'
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          description: 'Data e hora de criação da curtida',
          example: '2024-06-01T12:00:00Z'
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          description: 'Data e hora da última atualização da curtida',
          example: '2024-06-02T15:30:00Z'
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
    Follow: {
      type: 'object',
      properties: {
        followerId: {
          type: 'string',
          description: 'ID do usuário que está seguindo',
          example: '72b29c86-3525-4ce3-84c0-c76243b090c3'
        },
        followingId: {
          type: 'string',
          description: 'ID do usuário que está sendo seguido',
          example: '123e4567-e89b-12d3-a456-426614174000'
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          description: 'Data e hora de criação da curtida',
          example: '2024-06-01T12:00:00Z'
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          description: 'Data e hora da última atualização da curtida',
          example: '2024-06-02T15:30:00Z'
        }
      },
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
      createTweetSchema: {
        type: 'object',
        properties: {
          content: {
            type: 'string',
            description: 'Conteúdo do tweet',
            example: 'Este é um tweet de exemplo.'
          }
        },
        required: ['content']
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
      followResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Usuário seguido / deixado de seguir com sucesso.' },
          data: {
            $ref: '#/components/Follow'
          }
        }
      },
      tweetResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Tweet criado com sucesso!' },
          data: {
            $ref: '#/components/Tweet'
          }
        }
      },
      likeResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Tweet curtido com sucesso!' },
          data: {
            $ref: '#/components/Like'
          }
        }
      },
      createTweetReplyResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Resposta ao tweet criada com sucesso!' },
          data: {
            $ref: '#/components/TweetReply'
          }
        }
      },
      getTweetResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Tweet recuperado com sucesso!' },
          data: {
            type: 'object',
            properties: {
              tweet: {
                $ref: '#/components/Tweet'
              },
              likes: {
                type: 'array',
                items: {
                  $ref: '#/components/Like'
                }
              },
              replies: {
                type: 'array',
                items: {
                  $ref: '#/components/TweetReply'
                }
              }
            }
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
      tweetId: {
        name: 'id',
        in: 'path',
        description: 'ID do tweet',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
          example: 'f09e401a-88ca-4842-b475-cc55bb4c7070'
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
const routes = ['./routes/health.routes.ts', './routes/auth.routes.ts', './routes/users.routes.ts', './routes/follows.routes.ts', './routes/tweets.routes.ts', './routes/likes.routes.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc);
