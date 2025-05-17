import axios from 'axios'
import loginService from '../services/login'

const LoginForm = ({onLogin, onNotification}) => {
    const handleLogin = async (event) => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value

        try {
            const response = await loginService.login({username, password})
            if (response.token) {
                onLogin(response)
            }
        } catch (error) {
            onNotification('Wrong username or password')
            console.log(error.message)
        }
    }
    
    return(
        <div>
            <form  onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">username</label>
                    <input id="username" type="text" />
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input id="password" type="password" />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm