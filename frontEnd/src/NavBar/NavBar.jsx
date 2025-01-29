import { useContext, useState } from "react"
import styles from "./NavBar.module.css"
import { UserContext } from "../context";

export default function NavBar({ currentTab, setCurrentTab }) {

    const handleTabClick = (event) => {
        setCurrentTab(event.target.dataset.tabname);
    }

    const { user,logout } = useContext(UserContext)

    return (
    <div className={styles.nav}>
        <div className={styles.username}><span className={styles.white}>{user.username}</span></div>
        <div onClick={async (event) => {await logout(); handleTabClick(event);}} data-tabname = "" className={styles.logout}>Log out</div>
        <div onClick={handleTabClick} data-tabname = "current" className={`${currentTab == "current" && styles.current}`}>Current Goals</div>
        <div onClick={handleTabClick} data-tabname = "completed" className={`${currentTab == "completed" && styles.current}`}>Completed Goals</div>
    </div>)
}