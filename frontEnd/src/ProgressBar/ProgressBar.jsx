import React from "react";

const ProgressBar = ({ goalAmount, currentProgress }) => {

    const percentage = (currentProgress / goalAmount) * 100

    const containerStyle = {
        width: "90%",
        marginLeft: "5%",
        backgroundColor: "#e0e0df",
        borderRadius: "50px",
        overflow: "hidden",
    };

    const fillerStyle = {
        height: "20px",
        width: `${percentage}%`,
        backgroundColor: "#4caf50",
        textAlign: "right",
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
