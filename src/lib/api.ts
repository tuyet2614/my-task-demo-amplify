import { generateClient } from "aws-amplify/api";
import "@/lib/amplify";
import { Task, CreateTaskInput, UpdateTaskInput, TaskStatus } from "@/types";
import { createTodo, updateTodo, deleteTodo } from "@/lib/mutations";
import { listTodos, getTodo } from "@/lib/queries";

const client = generateClient({ authMode: "apiKey" });

export const taskService = {
  async createTask(input: CreateTaskInput): Promise<Task> {
    const result = await client.graphql({
      query: createTodo,
      variables: {
        input: {
          name: input.title,
          description: input.description ?? "",
        },
      },
    });
    const todo = (result as { data?: { createTodo?: any } }).data?.createTodo;
    if (!todo) throw new Error("CreateTodo returned no data");
    return {
      id: todo.id,
      title: todo.name,
      description: todo.description ?? undefined,
      status: TaskStatus.OPEN,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    };
  },

  async updateTask(input: UpdateTaskInput): Promise<Task> {
    const result = await client.graphql({
      query: updateTodo,
      variables: {
        input: {
          id: input.id,
          name: input.title,
          description: input.description,
        },
      },
    });
    const todo = (result as { data?: { updateTodo?: any } }).data?.updateTodo;
    if (!todo) throw new Error("UpdateTodo returned no data");
    return {
      id: todo.id,
      title: todo.name,
      description: todo.description ?? undefined,
      status: input.status ?? TaskStatus.OPEN,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    };
  },

  async deleteTask(id: string): Promise<void> {
    await client.graphql({
      query: deleteTodo,
      variables: { input: { id } },
    });
  },

  async listTasks(): Promise<Task[]> {
    const result = await client.graphql({ query: listTodos });
    const items = (result as { data?: { listTodos?: { items?: any[] } } }).data?.listTodos?.items ?? [];
    return items.map((todo: any) => ({
      id: todo.id,
      title: todo.name,
      description: todo.description ?? undefined,
      status: TaskStatus.OPEN,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    }));
  },

  async getTask(id: string): Promise<Task> {
    const result = await client.graphql({
      query: getTodo,
      variables: { id },
    });
    const todo = (result as { data?: { getTodo?: any } }).data?.getTodo;
    if (!todo) throw new Error("GetTodo returned no data");
    return {
      id: todo.id,
      title: todo.name,
      description: todo.description ?? undefined,
      status: TaskStatus.OPEN,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    };
  },
};
