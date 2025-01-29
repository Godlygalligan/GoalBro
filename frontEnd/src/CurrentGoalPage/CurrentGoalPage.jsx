import { useContext, useEffect, useState } from "react"
import styles from "./CurrentGoalPage.module.css"
import Goal from "../Goal/Goal"
import { GoalsContext } from "../context"

export default function CurrentGoalPage({ setCurrentTab }) {

    const { fetchGoals, categories } = useContext(GoalsContext)
    const [ goals,setGoals ] = useState([])
    const [ category, setCategory ] = useState("all")

    useEffect(() => {
        const getGoals = async () => {
            const goals = await fetchGoals("current")

            setGoals(goals)
        }

        getGoals();        
    }, [])

    return (
    <>
    <div className={styles.ctn}>
        <div className={styles.title}>
            Your Goals!
        </div>
        <select onChange={event => {setCategory(event.target.value)}} className={styles.categories}>
            <option value="all">All ♻️</option>
            {categories?.map(category => (
                <option key={category[0]} value={category[0]}>{category[1]}</option>
            ))}
        </select>
        <div className={styles.addGoal} onClick={() => setCurrentTab("addGoal")}>Add Goal</div>
        <div className={styles.goals}>
            {goals.filter(goal => {return category == "all" ? true : goal.category[0] == category}).map(goal => (
                <>
                <Goal 
                    id = {goal.id}
                    key = {goal.id}
                    setCurrentTab = {setCurrentTab}
                    name = {goal.name}
                    category = {goal.category}
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