export class User {
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public age: number,
    public email: string,
    public token: string
  ) {}
}

export class LoginUser {
  constructor(
    public id: number,
    public username: string,
    public password: string
  ) {}
}
