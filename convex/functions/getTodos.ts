import { query } from "../_generated/server";
import { v } from "convex/values";

export default query({
  args: {},
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").collect();
    return todos.sort((a, b) => (a.order || 0) - (b.order || 0));
  },
});
