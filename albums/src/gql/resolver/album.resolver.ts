import { Args, Query, Resolver, ResolveReference } from '@nestjs/graphql';
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
        @Args('filter') filter: number,
    ) {
        return this.albumService.findAll({ limit, offset }, filter);
    }

    @ResolveReference()
    resolveReference(reference: { __typename: string; id: string }) {
        return this.albumService.findOne(reference.id);
    }
}
