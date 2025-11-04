import { mutation } from "../_generated/server";
import { v } from "convex/values";

export default mutation({
  args: {
    items: v.array(
      v.object({
        id: v.id("todos"),
        order: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    for (const it of args.items) {
      // Check if document exists before patching (in case it was deleted)
      const doc = await ctx.db.get(it.id);
      if (doc) {
        await ctx.db.patch(it.id, { 
          order: it.order, 
          updatedAt: new Date().toISOString() 
        });
      }
    }
    return true;
  },
});
