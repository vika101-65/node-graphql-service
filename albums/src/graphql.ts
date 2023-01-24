
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateAlbumInput {
    name?: Nullable<string>;
    released?: Nullable<number>;
    artists?: Nullable<Nullable<string>[]>;
    bands?: Nullable<Nullable<string>[]>;
    tracks?: Nullable<Nullable<string>[]>;
    genres?: Nullable<Nullable<string>[]>;
    image?: Nullable<string>;
}

export class UpdateAlbumInput {
    id: string;
    name?: Nullable<string>;
    released?: Nullable<number>;
    artists?: Nullable<Nullable<string>[]>;
    bands?: Nullable<Nullable<string>[]>;
    tracks?: Nullable<Nullable<string>[]>;
    genres?: Nullable<Nullable<string>[]>;
    image?: Nullable<string>;
}

export class Album {
    id: string;
    name?: Nullable<string>;
    released?: Nullable<number>;
    artists?: Nullable<Nullable<Artist>[]>;
    bands?: Nullable<Nullable<Band>[]>;
    tracks?: Nullable<Nullable<Track>[]>;
    genres?: Nullable<Nullable<Genre>[]>;
    image?: Nullable<string>;
}

export abstract class IQuery {
    abstract album(id: string): Nullable<Album> | Promise<Nullable<Album>>;

    abstract albums(limit?: Nullable<number>, offset?: Nullable<number>, filter?: Nullable<string>): Nullable<Nullable<Album>[]> | Promise<Nullable<Nullable<Album>[]>>;
}

export class DeletedCount {
    acknowledged?: Nullable<boolean>;
    deletedCount?: Nullable<number>;
}

export class Artist {
    id: string;
}

export class Band {
    id: string;
}

export class Track {
    id: string;
}

export class Genre {
    id: string;
}

export abstract class IMutation {
    abstract createAlbum(input?: Nullable<CreateAlbumInput>): Nullable<Album> | Promise<Nullable<Album>>;

    abstract deleteAlbum(id: string): Nullable<DeletedCount> | Promise<Nullable<DeletedCount>>;

    abstract updateAlbum(input?: Nullable<UpdateAlbumInput>): Nullable<Album> | Promise<Nullable<Album>>;
}

type Nullable<T> = T | null;
