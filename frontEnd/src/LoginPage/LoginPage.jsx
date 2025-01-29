import { useContext, useState } from "react"
import { UserContext } from "../context"
import styles from "./LoginPage.module.css"
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay"

export default function LoginPage({ setCurrentTab }) {

    const { login } = useContext(UserContext)

    const [ pending, setPending ] = useState(false) 

    const [ error,setError ] = useState("")

    const handleLogin = async (event) => {
        setPending(true)
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        const permanent = event.target.permanent.checked
        const response = await login(username, password, permanent)
        if (response == "Success") {
            setCurrentTab("current")
        } else {
            setError(response)
        }
        setPending(false)
    }
    
    return (
        <div className={styles.ctn}>
            <form className={styles.loginForm} onSubmit={handleLogin}>
                <div className={styles.formGroup}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <div className={`${styles.permanent} ${styles.formGroup}`}>
                    <label htmlFor="permanent">Remember Me:</label>
                    <input type="checkbox" id="permanent" name="permanent" /> 
                </div>
                <button disabled={pending} type="submit" className={styles.loginButton}>{pending ? "Logging in" : "Log in"}</button>
                {error && <ErrorDisplay message={error} />}
            </form>
            <div className={styles.register}>
            <button onClick={() => setCurrentTab("register")} className={styles.registerButton}>
                No account?
            </button>
            </div>
        </div>
    )
}