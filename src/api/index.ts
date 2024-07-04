export type User = {
    id: number
    name: string
    username: string
    email: string
    phone: string
    company: UserCompany
    address: UserAddress
}

export type UserCompany = {
    "street": string,
    "suite": string,
    "city": string,
}

export type UserAddress = {
    name: string
}

export const api = {
    getUser: (): Promise<User[]> => {
        return fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json())
    },
    getUserById: (id: number): Promise<User> => {
        return fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(r => r.json())
    }
}
export const getUser = (): Promise<User[]> => {
    return fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json())
}

export const getUserById = (id: number): Promise<User> => {
    return fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(r => r.json())
}
