export interface User {
  email: string
  password: string
}

export interface RegisterUser {
  name: string
  email: string
  password: string
}

export interface Position {
  name: string
  user: string
  family: string
}

export interface NewFamily {
  name: string
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
