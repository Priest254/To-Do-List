import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export const useTodos = () => useQuery(api.functions.getTodos.default, {});
export const useAddTodo = () => useMutation(api.functions.addTodo.default);
export const useUpdateTodo = () => useMutation(api.functions.updateTodo.default);
export const useDeleteTodo = () => useMutation(api.functions.deleteTodo.default);
export const useReorderTodos = () => useMutation(api.functions.reorderTodos.default);
