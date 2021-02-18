export interface User {
  email: string
  password: string
}

export interface Message {
  message: string
}

export interface RegisterUser {
  name: string
  email: string
  password: string
}

export interface Position {
  name: string
  userName: string
  user: string
  familyName: string
  family: string
  order: number
}

export interface Family {
  name: string
  users: Users[]
}

export interface Users {
  id: string
  name: string
  admin: boolean
}

export interface Income {
  date: Date
  sum: number
  userName: string
  user: string
  familyName: string
  family: string
}

export interface Outlay {
  date: Date
  position: string
  sum: number
  user: string
  family: string
}
