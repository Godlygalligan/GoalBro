
import CurrentGoalPage from "../CurrentGoalPage/CurrentGoalPage"
import CompletedGoalPage from "../CompletedGoalPage/CompletedGoalPage"
import NavBar from "../NavBar/NavBar"
import styles from "./HomePage.module.css"
import { useState } from "react"
import AddGoalPage from "../AddGoalPage/AddGoalPage"

export default function HomePage() {
    const [ currentTab, setCurrentTab ] = useState(sessionStorage.getItem("currentTab") || "current")

    // Need another function to also set the localstorage tab
    const setCurrentTabFunc = (tab) => {
        setCurrentTab(tab)
        sessionStorage.setItem("currentTab", tab)
    }
    return (
    <>
    <NavBar currentTab={currentTab} setCurrentTab={setCurrentTabFunc}/>
    <div className={styles.ctn}>
        {currentTab == "current" && <CurrentGoalPage setCurrentTab={setCurrentTabFunc}/>}
        {currentTab == "completed" && <CompletedGoalPage />}
        {currentTab == "addGoal" && <AddGoalPage setCurrentTab={setCurrentTabFunc} />}
    </div>
    </>
)
}