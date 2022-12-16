import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtistsService } from './services/artists.service';
import { Artist, ArtistSchema } from './schemas/artist.schema';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './services/auth.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
    imports: [
        HttpModule,
        MongooseModule.forRoot(process.env.MONGO_URL),
        MongooseModule.forFeature([
            {
                name: Artist.name,
                schema: ArtistSchema,
            },
        ]),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            typePaths: ['./**/*.graphql'],
            definitions: {
                path: join(process.cwd(), 'src/graphql.ts'),
                outputAs: 'class',
            },
        }),
    ],
    controllers: [AppController],
    providers: [ArtistsService, AuthService],
})
export class AppModule {}
