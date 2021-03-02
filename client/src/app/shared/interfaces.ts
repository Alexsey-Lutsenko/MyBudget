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
  _id: string
  name: string
  userName: string
  user: string
  familyName: string
  family: string
  order: number
}

export interface Family {
  _id: string
  name: string
  users: Users[]
  def: number
}

export interface Users {
  _id: string
  name: string
  admin: boolean
}

export interface Income {
  _id: string
  date: Date
  sum: number
  userName: string
  user: string
  familyName: string
  family: string
}

export interface Outlay {
  _id: string
  date: Date
  position: string
  sum: number
  user: string
  userName: string
  family: string
  familyName: string
}
