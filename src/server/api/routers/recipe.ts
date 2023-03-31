import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { recipeSchema } from "@/server/zodSchemas";
import { type Recipe } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import recipeDataScraper from "recipe-scraper";
import { z } from "zod";

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
      select: {
        name: true,
        image: true,
        recipeInstructions: true,
        totalTime: true,
      },
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
        //TODO ensure recipe with name doesn't already exist
        const entry: Recipe = await ctx.prisma.recipe.create({
          data: {
            cookTime: recipe.cookTime,
            prepTime: recipe.prepTime,
            totalTime: recipe.totalTime,
            url: recipe.url,
            description: recipe.description,
            image: recipe.image,
            name: recipe.name,
            keywords: recipe.keywords,
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
  new: protectedProcedure
    .input(z.object({ recipe: recipeSchema }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session.user.email) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      //TODO ensure recipe with name doesn't already exist
      const entry = await ctx.prisma.recipe.create({
        data: {
          ...input.recipe,
          owner: {
            connect: {
              email: ctx.session.user.email,
            },
          },
        },
      });

      return { name: entry.name };
    }),
  update: protectedProcedure
    .input(z.object({ recipe: recipeSchema }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session.user.email) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const recipe = await ctx.prisma.recipe.findFirstOrThrow({
        where: {
          name: input.recipe.name,
          AND: {
            owner: {
              email: ctx.session.user.email,
            },
          },
        },
      });

      await ctx.prisma.recipe.update({
        data:{
          ...input.recipe,
        },
        where: {
          id: recipe.id,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session.user.email) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const recipe = await ctx.prisma.recipe.findFirstOrThrow({
        where: {
          name: input.name,
          AND: {
            owner: {
              email: ctx.session.user.email,
            },
          },
        },
      });

      await ctx.prisma.recipe.delete({
        where: {
          id: recipe.id,
        },
      });
    }),
});
