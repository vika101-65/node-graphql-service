import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GenresService } from './services/genres.service';
import { Genre, GenreSchema } from './schemas/genre.schema';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './services/auth.service';
import { GraphQLModule } from '@nestjs/graphql';
import {
    ApolloFederationDriver,
    ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { join } from 'path';
import { GenresResolver } from './gql/resolver/genres.resolver';
@Module({
    imports: [
        HttpModule,
        MongooseModule.forRoot(process.env.MONGO_URL),
        MongooseModule.forFeature([
            {
                name: Genre.name,
                schema: GenreSchema,
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
    providers: [GenresService, AuthService, GenresResolver],
})
export class AppModule {}
