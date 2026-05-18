import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import {
  createActivitySession,
  completeActivitySession,
  getActivitySessionsByChild,
  createReward,
  getTotalStarsByChild,
} from "../db";

export const activitiesRouter = router({
  // Start a new activity session
  startActivity: protectedProcedure
    .input(
      z.object({
        childId: z.number(),
        activityTypeId: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const sessionId = await createActivitySession(
        input.childId,
        input.activityTypeId
      );
      return { sessionId };
    }),

  // Complete an activity session
  completeActivity: protectedProcedure
    .input(
      z.object({
        sessionId: z.number(),
        correctAnswers: z.number(),
        totalQuestions: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      await completeActivitySession(
        input.sessionId,
        input.correctAnswers,
        input.totalQuestions
      );

      // Calculate stars earned (1-3 based on percentage)
      const percentage = (input.correctAnswers / input.totalQuestions) * 100;
      let starsEarned = 1;
      if (percentage >= 80) starsEarned = 3;
      else if (percentage >= 60) starsEarned = 2;

      // Get child ID from session (simplified - in production, verify ownership)
      return { starsEarned };
    }),

  // Create reward for activity
  createRewardForActivity: protectedProcedure
    .input(
      z.object({
        childId: z.number(),
        starsEarned: z.number(),
        message: z.string().optional(),
        activitySessionId: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await createReward(
        input.childId,
        input.starsEarned,
        input.message,
        input.activitySessionId
      );
      return { success: true };
    }),

  // Get activity history for a child
  getActivityHistory: protectedProcedure
    .input(z.object({ childId: z.number() }))
    .query(async ({ input }) => {
      const sessions = await getActivitySessionsByChild(input.childId);
      return sessions;
    }),

  // Get total stars for a child
  getTotalStars: protectedProcedure
    .input(z.object({ childId: z.number() }))
    .query(async ({ input }) => {
      const totalStars = await getTotalStarsByChild(input.childId);
      return { totalStars };
    }),
});
