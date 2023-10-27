export interface Task{
      id: number,
      title: string,
      completed: boolean
}

export interface signUpUser{
      full_name: string,
      email: string,
      password: string
}

export interface loginUser{
      email: string,
      password: string
}

export interface Task {
  name: string;
  project_id: string;
  duration: string;
  description: string;
  start_date: Date;
  end_date: Date;
}

export interface User {
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  password: string;
  isAdmin: boolean;
  gender: string;
}