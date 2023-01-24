import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TracksService } from './services/tracks.service';
import { Track, TrackSchema } from './schemas/track.schema';
import { AuthService } from './services/auth.service';
import { HttpModule } from '@nestjs/axios';
import { GraphQLModule } from '@nestjs/graphql';
import {
    ApolloFederationDriver,
    ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { join } from 'path';
import { TracksResolver } from './gql/resolver/track.resolver';

@Module({
    imports: [
        HttpModule,
        MongooseModule.forRoot(process.env.MONGO_URL),
        MongooseModule.forFeature([
            {
                name: Track.name,
                schema: TrackSchema,
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
    providers: [TracksService, AuthService, TracksResolver],
})
export class AppModule {}
