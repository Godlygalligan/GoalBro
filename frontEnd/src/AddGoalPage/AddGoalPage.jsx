import { useContext } from "react";
import { GoalsContext } from "../context";
import styles from "./AddGoalPage.module.css"

export default function AddGoalPage({ setCurrentTab }) {
    const { addGoal } = useContext(GoalsContext);

    const handleFormSubmission = () => {
        const form = document.querySelector('form');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        addGoal(data)
        setCurrentTab("current")
    }

    return (
    <form onSubmit={handleFormSubmission} className={styles.form}>
        <label>
            Name:
        <input type="text" name="name" required />
        </label>
        <label>
            Description:
            <textarea name="description" required />
        </label>
        <label>
            Current Progress:
            <input type="number" name="currentProgress" required />
        </label>
        <label>
            Goal Amount:
            <input type="number" name="goalAmount" required />
        </label>
        <button type="submit">Add Goal</button>
    </form>)

}