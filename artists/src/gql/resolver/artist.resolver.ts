import { Query, Resolver, Parent, ResolveField, Args } from '@nestjs/graphql';
import { ArtistsService } from '../../services/artists.service';
import { Artist } from '../../schemas/artist.schema';

@Resolver('Artist')
export class PostsResolver {
    constructor(private artistsService: ArtistsService) {}

    @Query('getPosts')
    artist(@Args('id') id: string) {
        return this.artistsService.findOne(id);
    }

    @ResolveField('albums')
    albums(@Parent() artist: Artist) {
        return { __typename: 'User', id: artist.bandsIds };
    }
}
