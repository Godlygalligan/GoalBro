
import CurrentGoalPage from "../CurrentGoalPage/CurrentGoalPage"
import CompletedGoalPage from "../CompletedGoalPage/CompletedGoalPage"
import NavBar from "../NavBar/NavBar"
import styles from "./HomePage.module.css"
import { useContext, useState } from "react"
import AddGoalPage from "../AddGoalPage/AddGoalPage"
import GoalPage from "../GoalPage/GoalPage"
import { UserContext } from "../context"
import LoginPage from "../LoginPage/LoginPage"
import RegisterPage from "../RegisterPage/RegisterPage"

export default function HomePage() {
    const [ currentTab, setCurrentTab ] = useState(sessionStorage.getItem("currentTab") || "current")
    const [ lastTab, setLastTab ] = useState(sessionStorage.getItem("previousTab") || "current")

    const { user } = useContext(UserContext); 

    // Need another function to also set the localstorage tab
    const setCurrentTabFunc = (tab) => {
        setLastTab(currentTab)
        sessionStorage.setItem("previousTab", currentTab)
        setCurrentTab(tab)
        sessionStorage.setItem("currentTab", tab)
    }

    if (!user) {
    return currentTab == "register" ? <RegisterPage setCurrentTab={setCurrentTabFunc} /> : <LoginPage setCurrentTab={setCurrentTabFunc} />; 
    }

    return (
    <>
    <NavBar currentTab={currentTab} setCurrentTab={setCurrentTabFunc}/>
    <div className={styles.ctn}>
        {currentTab == "current" && <CurrentGoalPage setCurrentTab={setCurrentTabFunc}/>}
        {currentTab == "completed" && <CompletedGoalPage setCurrentTab={setCurrentTabFunc}/>}
        {currentTab == "addGoal" && <AddGoalPage setCurrentTab={setCurrentTabFunc} />}
        {currentTab.startsWith("goal/") && <GoalPage id = {currentTab.split("/")[1]} setCurrentTab={setCurrentTabFunc}/>}
    </div>
    </>
)
}