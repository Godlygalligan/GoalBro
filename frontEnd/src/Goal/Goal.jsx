import ProgressBar from "../ProgressBar/ProgressBar"
import styles from "./Goal.module.css"

export default function Goal({setCurrentTab, ...props}) {
    return (
        <div className={styles.ctn} onClick={() => setCurrentTab(`goal/${props.id}`)}>
            <div className={styles.title}>{props.name}</div>
            <div className={styles.description}>{props.category[1]}</div>
            <div className={styles.description}>{props.description}</div>
            <ProgressBar goalAmount={props.goalAmount} currentProgress={props.currentProgress} closed={props.closed} />
            <div className={styles.updated}>Last updated: {new Date(props.lastUpdated).toDateString()}</div>
        </div>
    )
}