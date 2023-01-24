import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BandsService } from './services/bands.service';
import { Band, BandSchema } from './schemas/band.schema';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './services/auth.service';
import {
    ApolloFederationDriver,
    ApolloFederationDriverConfig,
} from '@nestjs/apollo';

import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { BandsResolver } from './gql/resolver/banda.resolver';

import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

@Module({
    imports: [
        HttpModule,
        MongooseModule.forRoot(process.env.MONGO_URL),
        MongooseModule.forFeature([
            {
                name: Band.name,
                schema: BandSchema,
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
    providers: [BandsService, AuthService, BandsResolver],
})
export class AppModule {}
