import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import recipeDataScraper from "recipe-scraper";
import { TRPCError } from "@trpc/server";
import { type Recipe } from "@prisma/client";

export const recipeRouter = createTRPCRouter({
  getByName: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.recipe.findFirstOrThrow({
        where: {
          name: input.name,
          AND: {
            owner: {
              email: ctx.session.user.email,
            },
          },
        },
      });
    }),
  getRecipesForSidebar: protectedProcedure.query(({ ctx }) => {
    // TODO: pagination/lazy loading
    return ctx.prisma.recipe.findMany({
      where: {
        owner: {
          email: ctx.session.user.email,
        },
      },
    });
  }),
  scrape: protectedProcedure
    .input(z.object({ url: z.string().url() }))
    .mutation(async ({ input, ctx }) => {
      console.log("test");
      if (!ctx.session.user.email) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      try {
        const recipe = await recipeDataScraper(input.url);
        console.log(recipe);
        const entry: Recipe = await ctx.prisma.recipe.create({
          data: {
            cookTime: recipe.cookTime,
            prepTime: recipe.prepTime,
            totalTime: recipe.totalTime,
            url: recipe.url,
            description: recipe.description,
            image: recipe.image,
            name: recipe.name,
            keyword: recipe.keywords,
            recipeCategories: recipe.recipeCategories,
            recipeCuisines: recipe.recipeCuisines,
            recipeIngredients: recipe.recipeIngredients,
            recipeInstructions: recipe.recipeInstructions,
            recipeTypes: recipe.recipeTypes,
            recipeYield: recipe.recipeYield,
            owner: {
              connect: {
                email: ctx.session.user.email,
              },
            },
          },
        });
        // throw redirect(303, `/recipes/${recipe.name}`);
        return { name: entry.name };
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not parse recipe",
        });
      }
    }),
});
