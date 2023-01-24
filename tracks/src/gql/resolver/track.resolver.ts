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
import { CreateTrackDto } from 'src/dto/create-track.dto';
import { TracksService } from 'src/services/tracks.service';

@Resolver('Track')
export class TracksResolver {
    constructor(private tracksService: TracksService) {}

    @Query()
    track(@Args('id') id: string) {
        return this.tracksService.findOne(id);
    }

    @Query()
    traks(
        @Args('limit') limit: number,
        @Args('offset') offset: number,
        @Args('filter') filter: any,
    ) {
        return this.tracksService.findAll({ limit, offset }, { filter });
    }

    @Mutation()
    @UseGuards(AuthGuard)
    createTrack(@Args('input') input) {
        input.albumId = input.album;
        input.artistsIds = input.artists;
        input.bandsIds = input.bands;
        input.genresIds = input.genres;
        return this.tracksService.create(input);
    }

    @Mutation()
    @UseGuards(AuthGuard)
    deleteTrack(@Args('id') id: string) {
        return this.tracksService.delete(id);
    }

    @Mutation()
    @UseGuards(AuthGuard)
    updateTrack(@Args('input') input) {
        const { id } = input;
        delete input.id;
        return this.tracksService.update(id, input);
    }

    @ResolveField('album')
    album(@Parent() track) {
        return { __typename: 'Album', id: track.albumId };
    }

    @ResolveField('artists')
    artists(@Parent() track) {
        const artistsList = [];
        track.artistsIds.forEach((artistIds) =>
            artistsList.push({ __typename: 'Artist', id: artistIds }),
        );
        return artistsList;
    }

    @ResolveField('bands')
    bands(@Parent() track) {
        const bandsList = [];
        track.bandsIds.forEach((bandsIds) =>
            bandsList.push({ __typename: 'Artist', id: bandsIds }),
        );
        return bandsList;
    }

    @ResolveField('genres')
    genres(@Parent() track) {
        const genresList = [];
        track.genresIds.forEach((genresIds) =>
            genresList.push({ __typename: 'Artist', id: genresIds }),
        );
        return genresList;
    }

    @ResolveReference()
    resolveReference(reference: { __typename: string; id: string }) {
        return this.tracksService.findOne(reference.id);
    }
}
