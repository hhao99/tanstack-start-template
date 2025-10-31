import { createServerFn } from "@tanstack/react-start";
import { eq } from 'drizzle-orm';

import { users } from '~/drizzle/schema';
import type { NewUser } from '~/drizzle/schema';
import { db } from '~/lib/db'

/**
 * Get all users from the database
 * @return A promise that resolves to an array of user
 * @throws { Error } if there is a database error
 */
export const getUsers = createServerFn({method: "GET"})
    .handler( async ()=> {
        try {
        
        const result = await db.select().from(users).all();
        console.log("getUsers ===> ", result)
        return result
        } 
        catch(err) {
            console.log(err)
            throw new Error(String(err))
        }
    })
/**
 * Get user by user email
 * @param email - the user email
 * @return A promise of the user record with the email
 * @throws not found error
 *  
 */
export const getUserByEmail = createServerFn({method:"POST"})
    .inputValidator((email:string)=> email)
    .handler( async ({data}: {data:string})=> {
        try {
            const result = db.select().from(users).where(eq(users.email,data)).get();
            return result
        }
        catch(err) {
            console.log(err)
            throw new Error(String(err))
        }
    })
