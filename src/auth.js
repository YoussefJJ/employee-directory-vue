export const login = (username, password) => {
    return new Promise((resolve, reject) => {
        if (username !== "admin" || password !== "admin") {
            reject({
                code: 401,
                message: "Invalid credentials"
            })
        } else {
            resolve({
                username
            })
        }

    })
    
}