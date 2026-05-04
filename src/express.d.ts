// src/express.d.ts

import "express";

declare module "express-serve-static-core" {
  interface Request {
    user: {
      id: string;
      name?: string;
      username?: string;
    };
  }
}

export { };
