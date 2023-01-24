
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateTrackInput {
    title: string;
    album?: Nullable<string>;
    artists?: Nullable<Nullable<string>[]>;
    bands?: Nullable<Nullable<string>[]>;
    duration?: Nullable<number>;
    released?: Nullable<number>;
    genres?: Nullable<Nullable<string>[]>;
}

export class UpdateTrackInput {
    id: string;
    title?: Nullable<string>;
    album?: Nullable<string>;
    artists?: Nullable<Nullable<string>[]>;
    bands?: Nullable<Nullable<string>[]>;
    duration?: Nullable<number>;
    released?: Nullable<number>;
    genres?: Nullable<Nullable<string>[]>;
}

export class Track {
    id: string;
    title: string;
    album?: Nullable<Album>;
    artists?: Nullable<Nullable<Artist>[]>;
    bands?: Nullable<Nullable<Band>[]>;
    duration?: Nullable<number>;
    released?: Nullable<number>;
    genres?: Nullable<Nullable<Genre>[]>;
}

export abstract class IQuery {
    abstract track(id: string): Nullable<Track> | Promise<Nullable<Track>>;

    abstract tracks(limit?: Nullable<number>, offset?: Nullable<number>, filter?: Nullable<string>): Nullable<Nullable<Track>[]> | Promise<Nullable<Nullable<Track>[]>>;
}

export class DeletedCount {
    acknowledged?: Nullable<boolean>;
    deletedCount?: Nullable<number>;
}

export class Album {
    id: string;
}

export class Band {
    id: string;
}

export class Genre {
    id: string;
}

export class Artist {
    id: string;
}

export abstract class IMutation {
    abstract createTrack(input?: Nullable<CreateTrackInput>): Nullable<Track> | Promise<Nullable<Track>>;

    abstract deleteTrack(id: string): Nullable<DeletedCount> | Promise<Nullable<DeletedCount>>;

    abstract updateTrack(input?: Nullable<UpdateTrackInput>): Nullable<Track> | Promise<Nullable<Track>>;
}

type Nullable<T> = T | null;
