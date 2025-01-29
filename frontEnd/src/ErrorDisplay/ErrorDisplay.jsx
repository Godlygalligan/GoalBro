import styles from "./ErrorDisplay.module.css"

export default function ErrorDisplay({ message }) {
    return (
        <div className={`${styles.error} ${message.toString().length > 30 && styles.long}`}>
            {message.toString().length < 150 ? message.toString() : "Unreadable Error, please report this immediately"}
        </div>
    )
}