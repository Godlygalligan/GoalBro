import { createContext, useEffect, useState } from "react"

const getError = async (data) => {
    const parsedData = await data.json()
    return parsedData.error 
}

const convertToCamelCase = (snakeStr) => {
    return snakeStr.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

const convertDataKeysToCamelCase = (data) => {
    if (Array.isArray(data)) {
        // If data is an array, map over its elements
        return data.map(convertDataKeysToCamelCase);
    } else if (data !== null && typeof data === "object") {
        // If data is an object, create a new object with camelCase keys
        const newData = {};
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const camelCaseKey = convertToCamelCase(key); // Convert key to camelCase
                newData[camelCaseKey] = convertDataKeysToCamelCase(data[key]); // Recursively process the value
            }
        }
        return newData;
    }
    return data;
};



import Cookies from 'js-cookie';

const getCSRFToken = () => {
    return Cookies.get('csrftoken');  // 'csrftoken' should match Django's cookie name
};

export const GoalsContext = createContext(undefined)

export const GoalsProvider = ({ children }) => {

    const [ categories, setCategories ] = useState([])
    const checkCompletion = (goal) => {
        return goal.currentProgress >= goal.goalAmount && goal.closed
    }

    useEffect(() => {
        const getCategories = async () => {
            const response = await fetch("/api/categories")

            if (!response.ok) {
                throw new Error(getError(response))
            }

            const data = await response.json()

            const dataInCamelCase = convertDataKeysToCamelCase(data)

            console.log(dataInCamelCase);
            setCategories(dataInCamelCase.categories)
        }

        getCategories();

    }, [])

    const fetchGoals = async (type) => {
        const allowedTypes = ["current","closed"];

        if (!allowedTypes.includes(type) && !typeof type === "number") {
            return "Invalid type"
        }

        try {
            const response = await fetch(`/api/goals?type=${type}`)

            if (!response.ok) {
                throw new Error(getError(response))
            }

            const data = await response.json()

            const dataInCamelCase = convertDataKeysToCamelCase(data)

            console.log(dataInCamelCase)
            
            return dataInCamelCase.goals || dataInCamelCase.goal
        } catch (error) {
            return error
        }
    }


    const addGoal = async (data) => {
        try {
            const response = await fetch("/api/add-goal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCSRFToken()
                }, 
                body: JSON.stringify({
                    name: data.name,
                    description: data.description,
                    currentProgress: parseInt(data.currentProgress),
                    goalAmount: parseInt(data.goalAmount),
                    category: data.category
                }), credentials: "include"
            })
            
            if (!response.ok) {
                throw new Error(await getError(response))
            }

            return "Success";

        } catch (error) {
            console.log(error)
            return error
        }
        }
    

    const updateAmount = async (id, type, amount) => {
        if (!id || isNaN(id)) {
            return "Invalid Goal Id";
        }

        try {
            const response = await fetch("/api/update-goal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCSRFToken()
                }, body: JSON.stringify({
                    "id": id,
                    "type": type,
                    "amount": amount
                }),
                credentials: "include"
            }) 

            if (!response.ok) {
                throw new Error(await getError(response))
            }

            return "Success"
        } catch (error) {
            return error
        }
    }

    const giveUp = async (id) => {
        try {
            const response = await fetch(`/api/close-goal`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCSRFToken()
                }, body: JSON.stringify({"id":id})
                , credentials: "include"
            })

            if (!response.ok) {
                throw new Error(getError(response))
            }

            return "Success"
        } catch (error) {
            return error
        }
    }

    return (
        <GoalsContext.Provider value={{ categories, fetchGoals, checkCompletion, addGoal, updateAmount, giveUp }}>
            { children }
        </GoalsContext.Provider>)
} 

export const UserContext = createContext(undefined)

export const UserProvider = ({ children }) => {
    const [user,setUser] = useState(null)

    const getUser = async () => {
        try {
            const response = await fetch("/api/get-user", {
                method: "GET"
            });
            
            if (!response.ok) {
                throw new Error(await getError(response));
            }
            const data = await response.json();
            const dataInCamelCase = convertDataKeysToCamelCase(data)
            setUser(dataInCamelCase.user);
        } catch (error) {
            return;
        }
    } 

    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, [])

    const login = async (username, password, permanent) => {
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCSRFToken()
                },
                body: JSON.stringify({"username": username, "password": password, "permanent": permanent}),
                credentials: "include"
            })

            if (!response.ok) {
                throw new Error(await getError(response))
            }

            await getUser();
            return "Success";
        } catch (error) {
            return error;
        }
    }

    const register = async (email, username, password, confirmation, permanent) => {
        try {
            if (!email || !username || !password || !confirmation ) {
                return "Please fill all fields in the form"
            }

            if (confirmation !== password) {
                return "Passwords do not match";
            }

            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCSRFToken()
                },
                body: JSON.stringify({"email": email, "username": username, "password": password, "permanent": permanent}),
                credentials: "include"
            })

            if (!response.ok) {
                throw new Error(await getError(response))
            }

            await getUser();
            return "Success";
        } catch (error) {
            return error;
        }
    }

    const logout = async () => {
        try {
            const response = await fetch("/api/logout", {
                method: "POST",
                headers: {
                    "X-CSRFToken": getCSRFToken()
                }, credentials: "include"
            });

            if (!response.ok) {
                throw new Error(await getError(response))
            }

            setUser(null);

            return "Success";

        } catch (error) {
            return error;
        } 
    }

    return (
        <UserContext.Provider value={{ user, login, logout, register, getUser }}>
            { children }
        </UserContext.Provider>
    )
} 



export const AppProvider = ({ children }) => (
    <UserProvider>
    <GoalsProvider>
        { children }
    </GoalsProvider>
    </UserProvider>
)