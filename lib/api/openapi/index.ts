import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const CreateUserDto = z.object({}).partial().passthrough();
const UpdateUserDto = z.object({}).partial().passthrough();
const UserResponseDto = z
  .object({
    id: z.number(),
    googleId: z.string(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    avatar: z.string().nullable(),
    isVerified: z.boolean(),
  })
  .passthrough();
const AuthResponseDto = z
  .object({ accessToken: z.string(), user: UserResponseDto })
  .passthrough();
const SignupUserDTO = z
  .object({
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string(),
  })
  .passthrough();
const SignupResponse = z
  .object({ id: z.string(), message: z.string() })
  .passthrough();
const VerifyDTO = z.object({ verificationCode: z.string() }).passthrough();
const VerifyResponse = z.object({ message: z.string() }).passthrough();
const LoginUserDTO = z
  .object({ email: z.string(), password: z.string() })
  .passthrough();

export const schemas = {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
  AuthResponseDto,
  SignupUserDTO,
  SignupResponse,
  VerifyDTO,
  VerifyResponse,
  LoginUserDTO,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/users",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({}).partial().passthrough(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/users",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/users/:id",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "patch",
    path: "/api/users/:id",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({}).partial().passthrough(),
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/api/users/:id",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/auth/google",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/auth/google/callback",
    requestFormat: "json",
    response: AuthResponseDto,
  },
  {
    method: "post",
    path: "/auth/login",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: LoginUserDTO,
      },
    ],
    response: AuthResponseDto,
  },
  {
    method: "post",
    path: "/auth/signup",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: SignupUserDTO,
      },
    ],
    response: SignupResponse,
  },
  {
    method: "post",
    path: "/auth/verify/:id",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ verificationCode: z.string() }).passthrough(),
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ message: z.string() }).passthrough(),
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
