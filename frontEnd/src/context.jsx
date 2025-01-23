import { createContext, useState } from "react"

export const GoalsContext = createContext(undefined)

export const GoalsProvider = ({ children }) => {
    const [ goals,setGoals ] = useState([{
        id: 1,
        name: "Bench press 100KG",
        description: "I want to be able to bench press 100kg",
        currentProgress: 90,
        goalAmount: 100,
        lastUpdated: Date.now()
    },
    {
        id: 2,
        name: "Achieve 3 CS50 ceritficates",
        description: "I wish to complete CS50X, CS50 Python and CS50 Web",
        currentProgress: 2,
        goalAmount: 3,
        lastUpdated: Date.now()
    },
    {
        id: 3,
        name: "Hit 500 followers on twitch",
        description: "I want to have entertained 500 people enough to have followed me!",
        currentProgress: 355,
        goalAmount: 500,
        lastUpdated: Date.now()
    }, 
    {
        id: 4,
        name: "Get a beautiful girlfriend",
        description: "I want a beautiful, kind, loving girlfriend who i will cherish and treat well",
        currentProgress: 1,
        goalAmount: 1,
        lastUpdated: new Date(2024, 1, 12)
    }])

    const checkCompletion = (goal) => {
        return goal.currentProgress >= goal.goalAmount
    }

    const addGoal = (data) => {
        setGoals(prev => [...prev, {
            id: goals.length + 1,
            name: data.name,
            description: data.description,
            currentProgress: parseInt(data.currentProgress),
            goalAmount: parseInt(data.goalAmount),
            lastUpdated: Date.now()
        }])
    }

    return (
        <GoalsContext.Provider value={{ goals, setGoals, checkCompletion, addGoal }}>
            { children }
        </GoalsContext.Provider>)
} 



export const AppProvider = ({ children }) => (
    <GoalsProvider>
        { children }
    </GoalsProvider>

)