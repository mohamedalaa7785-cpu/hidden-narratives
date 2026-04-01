import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import * as db from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  episodes: router({
    list: publicProcedure.query(async () => {
      return await db.getAllEpisodes();
    }),
    bySlug: publicProcedure.input((val: any) => (typeof val === "string" ? val : undefined)).query(async ({ input }) => {
      if (!input) return null;
      return await db.getEpisodeBySlug(input);
    }),
  }),

  newsletter: router({
    subscribe: publicProcedure
      .input((val: any) => ({
        email: typeof val?.email === "string" ? val.email : "",
        language: typeof val?.language === "string" ? val.language : "en",
      }))
      .mutation(async ({ input }) => {
        if (!input.email || !input.email.includes("@")) {
          throw new Error("Invalid email");
        }
        await db.subscribeEmail(input.email, input.language);
        return { success: true, message: "Subscribed successfully" };
      }),
  }),

  contact: router({
    submit: publicProcedure
      .input((val: any) => ({
        name: typeof val?.name === "string" ? val.name : "",
        email: typeof val?.email === "string" ? val.email : "",
        subject: typeof val?.subject === "string" ? val.subject : "",
        message: typeof val?.message === "string" ? val.message : "",
        language: typeof val?.language === "string" ? val.language : "en",
      }))
      .mutation(async ({ input }) => {
        if (!input.name || !input.email || !input.subject || !input.message) {
          throw new Error("All fields are required");
        }
        await db.createContact({
          name: input.name,
          email: input.email,
          subject: input.subject,
          message: input.message,
          language: input.language,
        });
        return { success: true, message: "Message sent successfully" };
      }),
  }),
});

export type AppRouter = typeof appRouter;
