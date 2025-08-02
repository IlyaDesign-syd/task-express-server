
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
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface UserSchema {
  auth0Id: string;
  email: string;
  firstName: string;
  lastName: string;
}