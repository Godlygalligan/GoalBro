import { useState } from "react"
import styles from "./NavBar.module.css"

export default function NavBar({ currentTab, setCurrentTab }) {

    const handleTabClick = (event) => {
        setCurrentTab(event.target.dataset.tabname);
    }

    return (
    <div className={styles.nav}>
        <div onClick={handleTabClick} data-tabname = "current" className={`${currentTab == "current" && styles.current}`}>Current Goals</div>
        <div onClick={handleTabClick} data-tabname = "completed" className={`${currentTab == "completed" && styles.current}`}>Completed Goals</div>
    </div>)
}