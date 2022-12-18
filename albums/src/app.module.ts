import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumsService } from './services/albums.service';
import { Album, AlbumSchema } from './schemas/album.schema';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './services/auth.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AlbumsResolver } from './gql/resolver/album.resolver';
import {
    ApolloFederationDriver,
    ApolloFederationDriverConfig,
} from '@nestjs/apollo';

@Module({
    imports: [
        // ServeStaticModule.forRoot({
        //     rootPath: join(__dirname, '..', 'public'),
        // }),
        MongooseModule.forRoot(process.env.MONGO_URL),
        MongooseModule.forFeature([
            {
                name: Album.name,
                schema: AlbumSchema,
            },
        ]),
        HttpModule,
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
    providers: [AlbumsService, AuthService, AlbumsResolver],
})
export class AppModule {}
