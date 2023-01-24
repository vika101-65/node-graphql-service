import { UseGuards } from '@nestjs/common';
import {
    Args,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
    ResolveReference,
} from '@nestjs/graphql';
import { FavoritesService } from '../../services/favorites.service';
import { AuthGuard } from '../../auth/auth.guard';

@Resolver('Favourites')
export class FavoritesResolver {
    constructor(private favoritesService: FavoritesService) {}

    @Query()
    @UseGuards(AuthGuard)
    favourites(@Args('userId') userId: string) {
        return this.favoritesService.findOne(userId);
    }

    @Mutation()
    @UseGuards(AuthGuard)
    addTrackToFavourites(@Args('input') input) {
        const { userId, id } = input;
        const type = 'tracks';
        return this.favoritesService.addToFavourites(userId, { type, id });
    }

    @Mutation()
    @UseGuards(AuthGuard)
    addBandToFavourites(@Args('input') input) {
        const { userId, id } = input;
        const type = 'bands';
        return this.favoritesService.addToFavourites(userId, { type, id });
    }

    @Mutation()
    @UseGuards(AuthGuard)
    addArtistToFavourites(@Args('input') input) {
        const { userId, id } = input;
        const type = 'artists';
        return this.favoritesService.addToFavourites(userId, { type, id });
    }

    @Mutation()
    @UseGuards(AuthGuard)
    addGenreToFavourites(@Args('input') input) {
        const { userId, id } = input;
        const type = 'genres';
        return this.favoritesService.addToFavourites(userId, { type, id });
    }

    @ResolveField('bands')
    bands(@Parent() favorites) {
        const bandsList = [];
        favorites.bandsIds.forEach((bandsIds) =>
            bandsList.push({ __typename: 'Band', id: bandsIds }),
        );
        return bandsList;
    }

    @ResolveField('genres')
    genres(@Parent() favorites) {
        const genresList = [];
        favorites.genresIds.forEach((genresIds) =>
            genresList.push({ __typename: 'Artist', id: genresIds }),
        );
        return genresList;
    }

    @ResolveField('artists')
    artists(@Parent() favorites) {
        const artistsList = [];
        favorites.artistsIds.forEach((artistIds) =>
            artistsList.push({ __typename: 'Artist', id: artistIds }),
        );
        return artistsList;
    }

    @ResolveField('tracks')
    tracks(@Parent() favorites) {
        const tracksList = [];
        favorites.trackIds.forEach((bandsIds) =>
            tracksList.push({ __typename: 'Track', id: bandsIds }),
        );
        return tracksList;
    }

    @ResolveReference()
    resolveReference(reference: { __typename: string; id: string }) {
        return this.favoritesService.findOne(reference.id);
    }
}
