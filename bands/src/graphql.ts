
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateBandInput {
    name?: Nullable<string>;
    origin?: Nullable<string>;
    members?: Nullable<Nullable<MembersInput>[]>;
    website?: Nullable<string>;
    genres?: Nullable<Nullable<string>[]>;
}

export class UpdateBandInput {
    id: string;
    name?: Nullable<string>;
    origin?: Nullable<string>;
    members?: Nullable<Nullable<MembersInput>[]>;
    website?: Nullable<string>;
    genres?: Nullable<Nullable<string>[]>;
}

export class MembersInput {
    artist?: Nullable<string>;
    instrument?: Nullable<string>;
    years?: Nullable<Nullable<string>[]>;
}

export class Band {
    id: string;
    name?: Nullable<string>;
    origin?: Nullable<string>;
    members?: Nullable<Nullable<Member>[]>;
    website?: Nullable<string>;
    genres?: Nullable<Nullable<Genre>[]>;
}

export class Member {
    artist?: Nullable<string>;
    instrument?: Nullable<string>;
    years?: Nullable<Nullable<string>[]>;
}

export abstract class IQuery {
    abstract band(id: string): Nullable<Band> | Promise<Nullable<Band>>;

    abstract bands(limit?: Nullable<number>, offset?: Nullable<number>, filter?: Nullable<string>): Nullable<Nullable<Band>[]> | Promise<Nullable<Nullable<Band>[]>>;
}

export class DeletedCount {
    acknowledged?: Nullable<boolean>;
    deletedCount?: Nullable<number>;
}

export abstract class IMutation {
    abstract createBand(input?: Nullable<CreateBandInput>): Nullable<Band> | Promise<Nullable<Band>>;

    abstract deleteBand(id: string): Nullable<DeletedCount> | Promise<Nullable<DeletedCount>>;

    abstract updateBand(input?: Nullable<UpdateBandInput>): Nullable<Band> | Promise<Nullable<Band>>;
}

export class Genre {
    id: string;
}

type Nullable<T> = T | null;
