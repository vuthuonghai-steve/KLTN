// collections/Posts.ts
// Payload collection configuration with afterChange hook for SSE notifications

import { CollectionConfig } from 'payload/types';
import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
});

const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'likesCount',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'commentsCount',
      type: 'number',
      defaultValue: 0,
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, previousDoc }) => {
        try {
          // On create: Notify followers
          if (operation === 'create') {
            console.log(`[SSE] New post created by user ${doc.author}`);

            // In production: Query followers and notify each
            // For now, publish to general feed channel
            await redis.publish(
              'feed:general',
              JSON.stringify({
                type: 'new-post',
                post: {
                  id: doc.id,
                  title: doc.title,
                  author: doc.author,
                  createdAt: doc.createdAt,
                },
              })
            );
          }

          // On update: Notify author if likes/comments changed
          if (operation === 'update' && previousDoc) {
            // Like notification
            if (doc.likesCount > previousDoc.likesCount) {
              console.log(`[SSE] Post ${doc.id} liked (count: ${doc.likesCount})`);

              await redis.publish(
                `notifications:${doc.author}`,
                JSON.stringify({
                  type: 'like',
                  message: `Your post got ${doc.likesCount - (previousDoc.likesCount || 0)} new like(s)!`,
                  postId: doc.id,
                  postTitle: doc.title,
                  timestamp: new Date().toISOString(),
                })
              );
            }

            // Comment notification
            if (doc.commentsCount > previousDoc.commentsCount) {
              console.log(`[SSE] Post ${doc.id} commented (count: ${doc.commentsCount})`);

              await redis.publish(
                `notifications:${doc.author}`,
                JSON.stringify({
                  type: 'comment',
                  message: `New comment on your post!`,
                  postId: doc.id,
                  postTitle: doc.title,
                  timestamp: new Date().toISOString(),
                })
              );
            }
          }
        } catch (error) {
          console.error('[SSE] Hook error:', error);
          // Don't throw - let document operation succeed
        }

        return doc;
      },
    ],
  },
};

export default Posts;
