import {
    Args,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
    ResolveReference,
} from '@nestjs/graphql';
import { BandsService } from '../../services/bands.service';
import { CreateBandDto } from '../../dto/create-band.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver('Band')
export class BandsResolver {
    constructor(private bandsService: BandsService) {}

    @Query()
    band(@Args('id') id: string) {
        return this.bandsService.findOne(id);
    }

    @Query()
    bands(
        @Args('limit') limit: number,
        @Args('offset') offset: number,
        @Args('filter') filter: any,
    ) {
        return this.bandsService.findAll({ limit, offset }, { filter });
    }

    @Mutation()
    @UseGuards(AuthGuard)
    createBand(@Args('input') input: any) {
        input.genresIds = [...input.genres];
        return this.bandsService.create(input);
    }

    @Mutation()
    @UseGuards(AuthGuard)
    deleteBand(@Args('id') id: string) {
        return this.bandsService.delete(id);
    }

    @Mutation()
    @UseGuards(AuthGuard)
    updateBand(@Args('input') input) {
        const { id } = input;
        delete input.id;
        return this.bandsService.update(id, input);
    }

    @ResolveField('genres')
    genres(@Parent() band: any) {
        const genreList = [];
        band.genresIds.forEach((genreIds) =>
            genreList.push({ __typename: 'Genre', id: genreIds }),
        );
        return genreList;
    }

    @ResolveReference()
    resolveReference(reference: { __typename: string; id: number }) {
        return this.bandsService.findOne(reference.id);
    }
}
