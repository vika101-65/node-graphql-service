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
import { AuthGuard } from 'src/auth/auth.guard';
import { AlbumsService } from '../../services/albums.service';

@Resolver('Album')
export class AlbumsResolver {
    constructor(private albumService: AlbumsService) {}

    @Query()
    album(@Args('id') id: string) {
        return this.albumService.findOne(id);
    }

    @Query()
    albums(
        @Args('limit') limit: number,
        @Args('offset') offset: number,
        @Args('filter') filter: any,
    ) {
        return this.albumService.findAll({ limit, offset }, { filter });
    }

    @Mutation()
    @UseGuards(AuthGuard)
    createAlbum(@Args('input') input) {
        input.artistsIds = input.artists;
        input.bandsIds = input.bands;
        input.trackIds = input.tracks;
        input.genresIds = input.genres;
        return this.albumService.create(input);
    }

    @Mutation()
    @UseGuards(AuthGuard)
    deleteAlbum(@Args('id') id: string) {
        return this.albumService.delete(id);
    }

    @Mutation()
    @UseGuards(AuthGuard)
    updateAlbum(@Args('input') input) {
        const { id } = input;
        delete input.id;
        return this.albumService.update(id, input);
    }

    @ResolveField('artists')
    artists(@Parent() album) {
        const artistsList = [];
        album.artistsIds.forEach((artistIds) =>
            artistsList.push({ __typename: 'Artist', id: artistIds }),
        );
        return artistsList;
    }

    @ResolveField('bands')
    bands(@Parent() album) {
        const bandsList = [];
        album.bandsIds.forEach((bandsIds) =>
            bandsList.push({ __typename: 'Artist', id: bandsIds }),
        );
        return bandsList;
    }

    @ResolveField('tracks')
    tracks(@Parent() album) {
        const tracksList = [];
        album.trackIds.forEach((bandsIds) =>
            tracksList.push({ __typename: 'Track', id: bandsIds }),
        );
        return tracksList;
    }

    @ResolveField('genres')
    genres(@Parent() album) {
        const genresList = [];
        album.genresIds.forEach((genresIds) =>
            genresList.push({ __typename: 'Artist', id: genresIds }),
        );
        return genresList;
    }

    @ResolveReference()
    resolveReference(reference: { __typename: string; id: string }) {
        return this.albumService.findOne(reference.id);
    }
}
