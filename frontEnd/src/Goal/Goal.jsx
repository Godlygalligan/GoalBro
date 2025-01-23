import ProgressBar from "../ProgressBar/ProgressBar"
import styles from "./Goal.module.css"

export default function Goal(props) {
    return (
        <div className={styles.ctn}>
            <div className={styles.title}>{props.name}</div>
            <div className={styles.description}>{props.description}</div>
            <ProgressBar goalAmount={props.goalAmount} currentProgress={props.currentProgress} />
            <div className={styles.updated}>Last updated: {new Date(props.lastUpdated).toDateString()}</div>
        </div>
    )
}