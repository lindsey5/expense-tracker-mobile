import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const UserLookupDto = z.object({ email: z.string() }).passthrough();
const UserLookupResponse = z.object({ message: z.string() }).passthrough();
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
const VerifyDTO = z
  .object({ verificationCode: z.string(), email: z.string() })
  .passthrough();
const VerifyResponse = z.object({ message: z.string() }).passthrough();
const ResendDTO = z.object({ email: z.string() }).passthrough();
const ResendResponse = z.object({ message: z.string() }).passthrough();
const LoginUserDTO = z
  .object({ email: z.string(), password: z.string() })
  .passthrough();
const UserResponseDto = z
  .object({
    id: z.string(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    isVerified: z.boolean(),
  })
  .passthrough();
const AuthResponseDto = z
  .object({ accessToken: z.string(), user: UserResponseDto })
  .passthrough();
const CreateTransactionDto = z
  .object({
    walletId: z.string(),
    type: z.enum(["INCOME", "EXPENSE"]),
    category: z.enum([
      "FOOD",
      "TRANSPORTATION",
      "BILLS",
      "SHOPPING",
      "ENTERTAINMENT",
      "HEALTHCARE",
      "EDUCATION",
      "TRAVEL",
      "HOUSING",
      "PERSONAL_CARE",
      "SUBSCRIPTIONS",
      "GROCERIES",
      "GIFTS_DONATIONS",
      "INSURANCE",
      "SALARY",
      "BUSINESS",
      "FREELANCE",
      "INVESTMENT",
      "ALLOWANCE",
      "GIFT",
      "BONUS",
      "OTHER",
    ]),
    amount: z.number(),
    title: z.string(),
    date: z.string(),
  })
  .passthrough();
const WalletDto = z
  .object({
    id: z.string(),
    userId: z.string(),
    name: z.string(),
    type: z.enum(["CASH", "BANK", "E_WALLET", "CREDIT_CARD", "OTHER"]),
    balance: z.number(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const TransactionResponseDto = z
  .object({
    id: z.string(),
    walletId: z.string(),
    type: z.enum(["INCOME", "EXPENSE"]),
    category: z.enum([
      "FOOD",
      "TRANSPORTATION",
      "BILLS",
      "SHOPPING",
      "ENTERTAINMENT",
      "HEALTHCARE",
      "EDUCATION",
      "TRAVEL",
      "HOUSING",
      "PERSONAL_CARE",
      "SUBSCRIPTIONS",
      "GROCERIES",
      "GIFTS_DONATIONS",
      "INSURANCE",
      "SALARY",
      "BUSINESS",
      "FREELANCE",
      "INVESTMENT",
      "ALLOWANCE",
      "GIFT",
      "BONUS",
      "OTHER",
    ]),
    amount: z.number(),
    title: z.string(),
    date: z.string().datetime({ offset: true }),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
    wallet: WalletDto,
  })
  .passthrough();
const CreateUpdateTransactionResponse = z
  .object({ message: z.string(), transaction: TransactionResponseDto })
  .passthrough();
const PaginationResponseDto = z
  .object({
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
    total: z.number(),
  })
  .passthrough();
const GetTransactionsResponseDto = z
  .object({
    transactions: z.array(TransactionResponseDto),
    pagination: PaginationResponseDto,
  })
  .passthrough();
const UpdateTransactionDto = z
  .object({
    walletId: z.string(),
    type: z.enum(["INCOME", "EXPENSE"]),
    category: z.enum([
      "FOOD",
      "TRANSPORTATION",
      "BILLS",
      "SHOPPING",
      "ENTERTAINMENT",
      "HEALTHCARE",
      "EDUCATION",
      "TRAVEL",
      "HOUSING",
      "PERSONAL_CARE",
      "SUBSCRIPTIONS",
      "GROCERIES",
      "GIFTS_DONATIONS",
      "INSURANCE",
      "SALARY",
      "BUSINESS",
      "FREELANCE",
      "INVESTMENT",
      "ALLOWANCE",
      "GIFT",
      "BONUS",
      "OTHER",
    ]),
    amount: z.number(),
    title: z.string(),
    date: z.string(),
  })
  .partial()
  .passthrough();
const CreateWalletDto = z
  .object({
    name: z.string(),
    type: z.enum(["CASH", "BANK", "E_WALLET", "CREDIT_CARD", "OTHER"]),
    balance: z.number().optional(),
  })
  .passthrough();
const CreateWalletResponseDto = z
  .object({ wallet: WalletDto, message: z.string() })
  .passthrough();
const GetWalletsResponseDto = z
  .object({ wallets: z.array(WalletDto) })
  .passthrough();
const GetTotalBalance = z
  .object({ totalBalance: z.number(), totalWallets: z.number() })
  .passthrough();
const UpdateWalletDto = z
  .object({
    name: z.string(),
    type: z.enum(["CASH", "BANK", "E_WALLET", "CREDIT_CARD", "OTHER"]),
    balance: z.number(),
  })
  .partial()
  .passthrough();
const UpdateWalletResponseDto = z
  .object({ wallet: WalletDto, message: z.string() })
  .passthrough();

export const schemas = {
  UserLookupDto,
  UserLookupResponse,
  SignupUserDTO,
  SignupResponse,
  VerifyDTO,
  VerifyResponse,
  ResendDTO,
  ResendResponse,
  LoginUserDTO,
  UserResponseDto,
  AuthResponseDto,
  CreateTransactionDto,
  WalletDto,
  TransactionResponseDto,
  CreateUpdateTransactionResponse,
  PaginationResponseDto,
  GetTransactionsResponseDto,
  UpdateTransactionDto,
  CreateWalletDto,
  CreateWalletResponseDto,
  GetWalletsResponseDto,
  GetTotalBalance,
  UpdateWalletDto,
  UpdateWalletResponseDto,
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
    path: "/auth/resend",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ email: z.string() }).passthrough(),
      },
    ],
    response: z.object({ message: z.string() }).passthrough(),
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
    path: "/auth/verify",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: VerifyDTO,
      },
    ],
    response: z.object({ message: z.string() }).passthrough(),
  },
  {
    method: "post",
    path: "/transaction",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateTransactionDto,
      },
    ],
    response: CreateUpdateTransactionResponse,
  },
  {
    method: "get",
    path: "/transaction",
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().optional(),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.number().optional(),
      },
      {
        name: "type",
        type: "Query",
        schema: z.enum(["INCOME", "EXPENSE"]).optional(),
      },
      {
        name: "category",
        type: "Query",
        schema: z
          .enum([
            "FOOD",
            "TRANSPORTATION",
            "BILLS",
            "SHOPPING",
            "ENTERTAINMENT",
            "HEALTHCARE",
            "EDUCATION",
            "TRAVEL",
            "HOUSING",
            "PERSONAL_CARE",
            "SUBSCRIPTIONS",
            "GROCERIES",
            "GIFTS_DONATIONS",
            "INSURANCE",
            "SALARY",
            "BUSINESS",
            "FREELANCE",
            "INVESTMENT",
            "ALLOWANCE",
            "GIFT",
            "BONUS",
            "OTHER",
          ])
          .optional(),
      },
      {
        name: "month",
        type: "Query",
        schema: z.number().optional(),
      },
      {
        name: "year",
        type: "Query",
        schema: z.number().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: GetTransactionsResponseDto,
  },
  {
    method: "get",
    path: "/transaction/:id",
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
    path: "/transaction/:id",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateTransactionDto,
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
    path: "/transaction/:id",
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
    method: "post",
    path: "/user/lookup",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ email: z.string() }).passthrough(),
      },
    ],
    response: z.object({ message: z.string() }).passthrough(),
  },
  {
    method: "post",
    path: "/wallet",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateWalletDto,
      },
    ],
    response: CreateWalletResponseDto,
  },
  {
    method: "get",
    path: "/wallet",
    requestFormat: "json",
    response: GetWalletsResponseDto,
  },
  {
    method: "patch",
    path: "/wallet/:id",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateWalletDto,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: UpdateWalletResponseDto,
  },
  {
    method: "delete",
    path: "/wallet/:id",
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
    path: "/wallet/total-balance",
    requestFormat: "json",
    response: GetTotalBalance,
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
