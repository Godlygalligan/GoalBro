import { useContext, useState, useEffect } from "react"
import styles from "./CompletedGoalPage.module.css"
import Goal from "../Goal/Goal"
import { GoalsContext } from "../context"

export default function CurrentGoalPage({ setCurrentTab }) {

    const { fetchGoals,checkCompletion } = useContext(GoalsContext)

    const [ completedGoals,setCompletedGoals ] = useState([])
    const [ failedGoals,setFailedGoals ] = useState([])
    
    useEffect(() => {
        const getGoals = async () => {
            const goals = await fetchGoals("closed")

            setCompletedGoals(goals.filter(goal => goal.currentProgress >= goal.goalAmount))
            setFailedGoals(goals.filter(goal => goal.currentProgress < goal.goalAmount))
        }

        getGoals();        
    }, [])
    
    return (
    <>
    <div className={styles.ctn}>
        {completedGoals.length <= 0 && failedGoals.length <= 0 && <div className={styles.title}>You have not completed any goals yet!</div>}
        {completedGoals.length > 0 && 
        <div className={styles.title}>
            Your Completed Goals!
        </div>}
        <div className={styles.goals}>
            {completedGoals.map(goal => (
                <>
                <Goal 
                    id = {goal.id}
                    name = {goal.name}
                    description = {goal.description}
                    currentProgress = {goal.currentProgress}
                    category = {goal.category}
                    goalAmount = {goal.goalAmount}
                    lastUpdated = {goal.lastUpdated}
                    closed = {goal.closed}
                    setCurrentTab = {setCurrentTab}
                />
                <br />
                </>
            ))}
        </div>
        {failedGoals.length > 0 && <div className={styles.title}>Your Failures.</div>}
        <div className={styles.goals}>
            {failedGoals.map(goal => (
                <>
                <Goal 
                    id = {goal.id}
                    name = {goal.name}
                    description = {goal.description}
                    category = {goal.category}
                    currentProgress = {goal.currentProgress}
                    goalAmount = {goal.goalAmount}
                    lastUpdated = {goal.lastUpdated}
                    closed = {goal.closed}
                    setCurrentTab = {setCurrentTab}
                />
                <br />
                </>
            ))}
        </div>
        
    </div>
    </>)
}