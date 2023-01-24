import {
    Query,
    Args,
    ResolveField,
    Resolver,
    Parent,
    ResolveReference,
    Mutation,
} from '@nestjs/graphql';
import { GenresService } from 'src/services/genres.service';
import { CreateGenreDto } from 'src/dto/create-genre.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver('Genre')
export class GenresResolver {
    constructor(private readonly genresService: GenresService) {}

    @Query()
    genre(@Args('id') id: string) {
        return this.genresService.findOne(id);
    }

    @Query()
    genres(
        @Args('limit') limit: number,
        @Args('offset') offset: number,
        @Args('filter') filter: string,
    ) {
        return this.genresService.findAll({ limit, offset }, { filter });
    }

    @Mutation()
    @UseGuards(AuthGuard)
    createGenre(@Args('input') input: CreateGenreDto) {
        return this.genresService.create(input);
    }

    @Mutation()
    @UseGuards(AuthGuard)
    deleteGenre(@Args('id') id: string) {
        return this.genresService.delete(id);
    }

    @Mutation()
    @UseGuards(AuthGuard)
    updateGenre(@Args('input') input) {
        const { id, name, description, country, year } = input;
        return this.genresService.update(id, {
            name,
            description,
            country,
            year,
        });
    }

    @ResolveReference()
    resolveReference(reference: { __typename: string; id: string }) {
        return this.genresService.findOne(reference.id);
    }
}
