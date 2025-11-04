import { mutation } from "../_generated/server";
import { v } from "convex/values";

export default mutation({
  args: {
    id: v.id("todos"),
    patch: v.object({
      title: v.optional(v.string()),
      description: v.optional(v.string()),
      dueDate: v.optional(v.union(v.string(), v.null())),
      completed: v.optional(v.boolean()),
      order: v.optional(v.number()),
      updatedAt: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const patch = { ...args.patch };
    patch.updatedAt = new Date().toISOString();
    await ctx.db.patch(args.id, patch);
    return true;
  },
});
