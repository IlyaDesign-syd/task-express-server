import { Auth0Payload } from "./Token";

export interface UserResponse {
  isUserRegistered: boolean;
  auth0Id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserRequest {
  auth?: { payload?: Auth0Payload };
}

export interface UserSchema {
  auth0Id: string;
  email: string;
  firstName: string;
  lastName: string;
}