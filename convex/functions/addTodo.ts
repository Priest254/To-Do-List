import { mutation } from "../_generated/server";
import { v } from "convex/values";

export default mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    dueDate: v.optional(v.union(v.string(), v.null())),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    const doc = {
      title: args.title,
      description: args.description ?? "",
      dueDate: args.dueDate ?? null,
      completed: false,
      order: args.order ?? Date.now(),
      createdAt: now,
      updatedAt: null,
    };
    return await ctx.db.insert("todos", doc);
  },
});
