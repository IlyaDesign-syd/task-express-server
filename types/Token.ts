import { AuthResult  } from "express-oauth2-jwt-bearer";

export interface Auth0Payload {
  iss: string;
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  scope: string;
  azp: string;
}

export interface AuthenticatedRequest {
  auth?: AuthResult;
}