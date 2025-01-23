import { useContext, useState } from "react"
import styles from "./CompletedGoalPage.module.css"
import Goal from "../Goal/Goal"
import { GoalsContext } from "../context"

export default function CurrentGoalPage() {

    const { goals,checkCompletion } = useContext(GoalsContext)

    return (
    <>
    <div className={styles.ctn}>
        <div className={styles.title}>
            Your Completed Goals!
        </div>
        <div className={styles.goals}>
            {goals.filter(goal => checkCompletion(goal)).map(goal => (
                <>
                <Goal 
                    name = {goal.name}
                    description = {goal.description}
                    currentProgress = {goal.currentProgress}
                    goalAmount = {goal.goalAmount}
                    lastUpdated = {goal.lastUpdated}
                />
                <br />
                </>
            ))}
        </div>
    </div>
    </>)
}