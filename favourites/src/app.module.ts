import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoritesService } from './services/favorites.service';
import { Favourite, FavouriteSchema } from './schemas/favourite.schema';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './services/auth.service';
import { GraphQLModule } from '@nestjs/graphql';
import {
    ApolloFederationDriver,
    ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { join } from 'path';
import { FavoritesResolver } from './gql/resolver/favourites.resolver';

@Module({
    imports: [
        HttpModule,
        MongooseModule.forRoot(process.env.MONGO_URL),
        MongooseModule.forFeature([
            {
                name: Favourite.name,
                schema: FavouriteSchema,
            },
        ]),
        GraphQLModule.forRoot<ApolloFederationDriverConfig>({
            driver: ApolloFederationDriver,
            typePaths: ['./**/*.graphql'],
            definitions: {
                path: join(process.cwd(), 'src/graphql.ts'),
                outputAs: 'class',
            },
            playground: true,
        }),
    ],
    controllers: [AppController],
    providers: [FavoritesService, AuthService, FavoritesResolver],
})
export class AppModule {}
