
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Album {
    id: string;
    name?: Nullable<string>;
    released?: Nullable<number>;
    image?: Nullable<string>;
}

export abstract class IQuery {
    abstract album(id: string): Nullable<Album> | Promise<Nullable<Album>>;

    abstract albums(limit?: Nullable<number>, offset?: Nullable<number>, filter?: Nullable<number>): Nullable<Nullable<Album>[]> | Promise<Nullable<Nullable<Album>[]>>;
}

type Nullable<T> = T | null;
