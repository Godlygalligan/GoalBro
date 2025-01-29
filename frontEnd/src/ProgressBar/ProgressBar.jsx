import React from "react";

const ProgressBar = ({ goalAmount, currentProgress, closed }) => {

    const percentage = (currentProgress / goalAmount) * 100

    const failed = closed ? currentProgress < goalAmount : false

    const containerStyle = {
        width: "95%",
        marginLeft: "2.5%",
        backgroundColor: "#e0e0df",
        borderRadius: "50px",
        overflow: "hidden",
    };

    const fillerStyle = {
        height: "20px",
        width: `${percentage}%`,
        backgroundColor: !failed ? "#4caf50" : "red",
        textAlign: "start",
        borderRadius: "inherit",
        transition: "width 0.5s ease-in-out",
    };

    const labelStyle = {
        paddingTop: "2px",
        position: "absolute",
        left: "50%",
        fontSize: "1rem",
        color: "white",
        fontWeight: "bold",
    };

    return (
        <div style={containerStyle}>
        <div style={fillerStyle}>
            <div style={labelStyle}>{`${currentProgress}/${goalAmount}`}</div>
        </div>
        </div>
    );
};

export default ProgressBar;
