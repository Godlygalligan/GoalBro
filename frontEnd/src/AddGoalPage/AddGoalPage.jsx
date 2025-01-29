import { useContext, useState } from "react";
import { GoalsContext } from "../context";
import styles from "./AddGoalPage.module.css"
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay"

export default function AddGoalPage({ setCurrentTab }) {
    const { categories, addGoal } = useContext(GoalsContext);

    const [ error, setError ] = useState("")

    const handleFormSubmission = async () => {
        event.preventDefault();
        const form = document.querySelector('form');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const response = await addGoal(data)
        if (response != "Success") {
            setError(response)
            return;
        } 
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
            Category:
            <select name="category">
                {categories?.map(category => (
                    <option key={category[0]} value={category[0]}>{category[1]}</option>
                ))}
            </select>
        </label>
        <label>
            Current Progress:
            <input type="number" name="currentProgress" required />
        </label>
        <label>
            Goal Amount:
            <input type="number" name="goalAmount" required />
        </label>
        {error && <ErrorDisplay message={error} />}
        <button type="submit">Add Goal</button>
    </form>)

}