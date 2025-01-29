import styles from "./BackButton.module.css"

export default function BackButton({className, setCurrentTab}) {
    return (
        <div className={`${className} ${styles.btn}`} onClick={() => {
            setCurrentTab(sessionStorage.getItem("previousTab") || "current")
        }}>Back</div>
    )
}