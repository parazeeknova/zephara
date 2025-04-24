import { v } from 'convex/values';
import type { Id } from './_generated/dataModel';
import { type QueryCtx, mutation } from './_generated/server';
import { auth } from './auth';

const getMember = async (
  ctx: QueryCtx,
  workspaceId: Id<'workspaces'>,
  userId: Id<'users'>
) => {
  return ctx.db
    .query('members')
    .withIndex('by_workspace_id_user_id', (q) =>
      q.eq('workspaceId', workspaceId).eq('userId', userId)
    )
    .unique();
};

export const create = mutation({
  args: {
    body: v.string(),
    image: v.optional(v.id('_storage')),
    workspaceId: v.id('workspaces'),
    channelId: v.optional(v.id('channels')),
    parentMessageId: v.optional(v.id('messages')),
    conversationId: v.optional(v.id('conversations')),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error('User not authenticated');
    }

    const member = await getMember(ctx, args.workspaceId, userId);
    if (!member) {
      throw new Error('Unauthorized to create message');
    }

    let _conversationId = args.conversationId;

    // Only possible if the message is a reply to a conversation 1:1
    if (!args.conversationId && !args.channelId && args.parentMessageId) {
      const parentMessage = await ctx.db.get(args.parentMessageId);
      if (!parentMessage) {
        throw new Error('Parent message not found');
      }

      _conversationId = parentMessage.conversationId;
    }

    const messageId = await ctx.db.insert('messages', {
      memberId: member._id,
      body: args.body,
      image: args.image,
      channelId: args.channelId,
      conversationId: _conversationId,
      workspaceId: args.workspaceId,
      parentMessageId: args.parentMessageId,
      updatedAt: Date.now(),
    });

    return messageId;
  },
});
