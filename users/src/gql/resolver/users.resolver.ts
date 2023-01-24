import {
    Args,
    Context,
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

    @Mutation()
    createUser(@Args('input') input: RegisterDto) {
        return this.usersService.create(input);
    }

    @Query()
    findUser(@Args('id') id: string) {
        console.log('iput', id);
        return this.usersService.findOneById(id);
    }

    @Query()
    jwtToken(@Args('email') email: string, @Args('password') password: string) {
        return this.usersService.login({ email, password });
    }
}
