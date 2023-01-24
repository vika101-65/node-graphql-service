import {
    Query,
    Resolver,
    Parent,
    ResolveField,
    Args,
    Mutation,
    ResolveReference,
} from '@nestjs/graphql';
import { ArtistsService } from '../../services/artists.service';
import { Artist } from '../../schemas/artist.schema';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateArtistDto } from 'src/dto/create-artist.dto';

@Resolver('Artist')
export class ArtistResolver {
    constructor(private artistsService: ArtistsService) {}

    @Query()
    artist(@Args('id') id: string) {
        return this.artistsService.findOne(id);
    }

    @Query()
    artists(
        @Args('limit') limit: number,
        @Args('offset') offset: number,
        @Args('filter') filter: string,
    ) {
        return this.artistsService.findAll({ limit, offset }, { filter });
    }

    @Mutation()
    @UseGuards(AuthGuard)
    createArtist(@Args('input') input) {
        const { bands } = input;
        input.bandsIds = bands;
        return this.artistsService.create(input);
    }

    @Mutation()
    @UseGuards(AuthGuard)
    deleteArtist(@Args('id') id: string) {
        return this.artistsService.delete(id);
    }

    @Mutation()
    @UseGuards(AuthGuard)
    updateArtist(@Args('input') input) {
        const { id } = input;
        input.bandsIds = input.bands;
        return this.artistsService.update(id, input);
    }

    @ResolveField('bands')
    bands(@Parent() artist) {
        const listBands = [];
        artist.bandsIds.forEach((bandId) =>
            listBands.push({ __typename: 'Band', id: bandId }),
        );
        return listBands;
    }

    @ResolveReference()
    resolveReference(reference: { __typename: string; id: string }) {
        console.log('resolveReference', reference);
        return this.artistsService.findOne(reference.id);
    }
}
