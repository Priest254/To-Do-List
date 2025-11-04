/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as functions_addTodo from "../functions/addTodo.js";
import type * as functions_deleteTodo from "../functions/deleteTodo.js";
import type * as functions_getTodos from "../functions/getTodos.js";
import type * as functions_reorderTodos from "../functions/reorderTodos.js";
import type * as functions_updateTodo from "../functions/updateTodo.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "functions/addTodo": typeof functions_addTodo;
  "functions/deleteTodo": typeof functions_deleteTodo;
  "functions/getTodos": typeof functions_getTodos;
  "functions/reorderTodos": typeof functions_reorderTodos;
  "functions/updateTodo": typeof functions_updateTodo;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
