
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class AddFavouritesInput {
    userId: string;
    id?: Nullable<string>;
}

export class Favourites {
    id: string;
    userId?: Nullable<string>;
    bands?: Nullable<Nullable<Band>[]>;
    genres?: Nullable<Nullable<Genre>[]>;
    artists?: Nullable<Nullable<Artist>[]>;
    tracks?: Nullable<Nullable<Track>[]>;
}

export abstract class IQuery {
    abstract favourites(userId?: Nullable<string>): Nullable<Favourites> | Promise<Nullable<Favourites>>;
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

export class Track {
    id: string;
}

export abstract class IMutation {
    abstract addTrackToFavourites(input?: Nullable<AddFavouritesInput>): Nullable<Favourites> | Promise<Nullable<Favourites>>;

    abstract addBandToFavourites(input?: Nullable<AddFavouritesInput>): Nullable<Favourites> | Promise<Nullable<Favourites>>;

    abstract addArtistToFavourites(input?: Nullable<AddFavouritesInput>): Nullable<Favourites> | Promise<Nullable<Favourites>>;

    abstract addGenreToFavourites(input?: Nullable<AddFavouritesInput>): Nullable<Favourites> | Promise<Nullable<Favourites>>;
}

type Nullable<T> = T | null;
