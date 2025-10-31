
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useAuth } from '~/auth'
export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  
    const auth = useAuth();
    const handleSubmit = async (evt) => {
        evt.preventDefault()
        const formData = new FormData(evt.target as HTMLFormElement)
        const username = formData.get('username') as string;
        const email = formData.get('email') as string
        await auth.login(email)
    }
  return (
    <div>
        <form id='login' onSubmit={(e) => handleSubmit(e)}>
        <h1>Login</h1>
        <div>
            <label htmlFor='username'>Username:</label>
            <input type='text' name='username' id='username' />
        </div>
        <div>
            <label htmlFor='email'>Email:</label>
            <input type='text' name='email' id='email' />
        </div>
        <div>
            <button type='submit'>Submit</button>
        </div>
    </form>
  </div>);
}
