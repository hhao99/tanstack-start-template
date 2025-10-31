import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
    id: integer('id').primaryKey(),
    name: text('name'),
    email: text('email')
})

export const posts = sqliteTable('posts', {
    id: integer('id').primaryKey(),
    content: text('context'),
    author_id: integer('author_id')
        .notNull()
        .references( ()=> users.id)
})

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;