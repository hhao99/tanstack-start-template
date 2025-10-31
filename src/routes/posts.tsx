import { createFileRoute } from '@tanstack/react-router'
import { getUsers } from '~/lib/services/users'
export const Route = createFileRoute('/posts')({
    loader: async ()=> {
        try {
            const users = await getUsers();
            return users;
        }
        catch(err) {
            console.log(err)
        }
    },
  component: RouteComponent,
})

function RouteComponent() {
    const users = Route.useLoaderData()
  return (
    <>
        <h1>All user page</h1>
        <div>
            <h3>{JSON.stringify(users) }</h3>
        </div>
    </>
)
}
