import { mutation } from "../_generated/server";
import { v } from "convex/values";

export default mutation({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return true;
  },
});
