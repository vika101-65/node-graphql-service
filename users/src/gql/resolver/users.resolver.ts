import {
    Args,
    Mutation,
    Query,
    Resolver,
    ResolveReference,
} from '@nestjs/graphql';
import { RegisterDto } from 'src/dto/register.dto';
import { User } from 'src/schemas/user.schema';
import { UsersService } from '../../services/users.service';

@Resolver('User')
export class UsersResolver {
    constructor(private usersService: UsersService) {}

    @Mutation('createUser')
    createUser(@Args('input') input: RegisterDto) {
        console.log('input', input);
        return this.usersService.create(input);
    }

    @Query('findUser')
    findUser(@Args('id') id: string) {
        console.log('iput', id);
        return this.usersService.findOneById(id);
    }

    // @ResolveReference()
    // resolveReference(reference: { __typename: string; id: string }) {
    //     return this.usersService.findById(reference.id);
    // }
}
