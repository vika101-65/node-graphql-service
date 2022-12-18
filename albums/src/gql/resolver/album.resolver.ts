import { Args, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { AuthService } from 'src/services/auth.service';
import { AlbumsService } from '../../services/albums.service';

@Resolver('Album')
export class AlbumsResolver {
    constructor(private albumService: AlbumsService, private k: AuthService) {}

    @Query()
    async album(@Args('id') id: string) {
        console.log('++++', await this.k.verifyToken('111'));
        return this.albumService.findOne(id);
    }

    @Query()
    albums(
        @Args('limit') limit: number,
        @Args('offset') offset: number,
        @Args('filter') filter: any,
    ) {
        return this.albumService.findAll({ limit, offset }, filter);
    }

    @ResolveReference()
    resolveReference(reference: { __typename: string; id: string }) {
        return this.albumService.findOne(reference.id);
    }
}
