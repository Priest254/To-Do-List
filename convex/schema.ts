import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  todos: defineTable({
    title: v.string(),
    description: v.string(),
    dueDate: v.union(v.string(), v.null()),
    completed: v.boolean(),
    order: v.number(),
    createdAt: v.string(),
    updatedAt: v.union(v.string(), v.null()),
  })
    .index("by_order", ["order"])
    .index("by_completed", ["completed"]),
});

