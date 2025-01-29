import styles from "./GoalPage.module.css"

import ProgressBar from "../ProgressBar/ProgressBar"
import { useContext, useEffect, useState } from "react"
import { GoalsContext } from "../context"
import BackButton from "../BackButton/BackButton";

export default function GoalPage({setCurrentTab, ...props}) {

    const { updateAmount, fetchGoals, giveUp } = useContext(GoalsContext);

    const [failed,setFailed] = useState(false)

    const [ giveUpClicks, setGiveUpClicks ] = useState(0);

    const [ giveUpText,setGiveUpText ] = useState("Give up")

    const [ error, setError ] = useState("")

    const [ goal, setGoal ] = useState({}) 

    const [ editing, setEditing ] = useState(false) 

    const getGoal = async () => {
        const response = await fetchGoals(props.id)
        setGoal(response)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const amount = parseFloat(e.target[0].value);
        if (amount === 0) {
            setEditing(false)
            return;
        }

        const action = amount > 0 ? "increase" : "decrease";
        await updateAmount(props.id, action, Math.abs(amount));
        setEditing(false);
    };

    const handleGiveUpClick = async (event) => {
        if (giveUpClicks === 0) {
            setGiveUpText("Are you sure?");
        } else if (giveUpClicks === 1) {
            setGiveUpText("Really?");
        } else if (giveUpClicks === 2) {
            const response = await giveUp(props.id);
            if (response != "Success") {
                setError(response)
            } else {
                alert("Disappointing.");
                setFailed(true);
            }
        }
        setGiveUpClicks(giveUpClicks + 1);

    }

    useEffect(() => {
        getGoal();
    }, [props.id, editing])

    useEffect(() => {
        setFailed(goal.closed ? goal.currentProgress < goal.goalAmount : false)
    }, [goal])
    return (
    <div className={styles.ctn}>
        <div className={styles.goal}>
            <div className={styles.title}>{goal?.name}</div>
            <div className={styles.description}>{goal.category ? goal.category[1] : ""}</div>
            <div className={styles.description}>{goal?.description || "You havent given this goal a description"}</div>
            <ProgressBar currentProgress={goal?.currentProgress} goalAmount={goal?.goalAmount} closed={goal?.closed}/>
            {!editing ? 
            !goal.closed && 
            <div className={styles.buttons}>
                <div className={styles.button} onClick={() => setEditing(true)}>Update</div>
            </div> :
            <form className={styles.updateForm} onSubmit={handleSubmit}>
                <div className={styles.group}>
                <input autoFocus type="number" placeholder="0"/>
                <button type="submit">Update!</button>
                </div>
                <div className={styles.note}>To decrement, input a negative number</div>
            </form>
            }
            {failed && <div className={styles.red} style={{"marginTop":"3vh"}}>You failed.</div>}
            <div className={styles.updated}>Last updated: {new Date(goal?.lastUpdated).toDateString()}</div>
            <BackButton className={styles.back} setCurrentTab={setCurrentTab} />
            {goal?.updates?.length > 0 && <div className={styles.updatesCtn}>
                <div className={styles.title}>
                    Updates:
                </div>
                <div className={styles.updates}>
                    {goal?.updates?.map(update => (
                        update.amount > 0 ?
                        <div className={styles.update}>{update.timestamp.split("T")[0]}: You got {update.amount} {update.type == "increase" ? "closer to" : "further from"} your Goal</div>
                        : <div className={styles.update}>{update.timestamp.split("T")[0]}: You completed your goal!</div>
                    ))}
                </div>
                </div>}
            <div className={styles.buttons}>
            {!goal.closed && <div className={`${styles.button} ${styles.red}`} onClick={handleGiveUpClick}>{giveUpText}</div>}
            {giveUpClicks > 0 && <div className={styles.button} onClick={() => {setGiveUpClicks(0); setGiveUpText("Give up"); alert("Good choice.")}}>No.</div>}
            </div>
        </div>
    </div>)
}