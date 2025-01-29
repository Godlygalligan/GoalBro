import styles from "./RegisterPage.module.css"
import { useContext, useState } from "react"
import { UserContext } from "../context"
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay"

export default function RegisterPage({ setCurrentTab }) {

    const { register } = useContext(UserContext)

    const [ pending, setPending ] = useState(false) 

    const [ error,setError ] = useState("")

    const handleRegister= async (event) => {
        setPending(true)
        event.preventDefault()
        const email = event.target.email.value
        const username = event.target.username.value
        const password = event.target.password.value
        const confirmation = event.target.confirmation.value
        const permanent = event.target.permanent.checked
        const response = await register(email,username, password, confirmation, permanent)
        if (response == "Success") {
            setCurrentTab("current")
        } else {
            setError(response)
        }
        setPending(false)
    }
    
    return (
        <div className={styles.ctn}>
            <form className={styles.registerForm} onSubmit={handleRegister}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" required />
                </div>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <div>
                    <label htmlFor="confirmation">Password (again):</label>
                    <input type="password" id="confirmation" name="confirmation" required />
                </div>
                <div className={styles.formGroup}>
                <label htmlFor="permanent">Remember Me:</label>
                <input type="checkbox" id="permanent" name="permanent" /> 
                </div>
                <button disabled={pending} type="submit" className={styles.loginButton}>{pending ? "Creating user..." : "Register"}</button>
                {error && <ErrorDisplay message={error} />}
            </form>
            <div className={styles.login}>
            <button onClick={() => setCurrentTab("login")} className={styles.loginButton}>
                Already have an account?
            </button>
            </div>
        </div>
    )
}