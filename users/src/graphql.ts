
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserInput {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    password?: Nullable<string>;
    email: string;
}

export class User {
    id: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    password?: Nullable<string>;
    email: string;
}

export class Jwt {
    jwt?: Nullable<string>;
}

export abstract class IQuery {
    abstract findUser(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract jwtToken(email?: Nullable<string>, password?: Nullable<string>): Nullable<Jwt> | Promise<Nullable<Jwt>>;
}

export abstract class IMutation {
    abstract createUser(input?: Nullable<CreateUserInput>): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
