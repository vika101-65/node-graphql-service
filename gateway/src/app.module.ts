import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GqlExecutionContext, GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import 'dotenv/config';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        context: ({ req }) => ({
          authorization: `${req.headers.authorization}`,
        }),
      },
      gateway: {
        buildService: ({ name, url }) => {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
              request.http.headers.set('authorization', context.authorization);
            },
          });
        },
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: 'albums',
              url: `http://localhost:${process.env.PORT_ALBUMS}/graphql`,
            },
            {
              name: 'artists',
              url: `http://localhost:${process.env.PORT_ARTISTS}/graphql`,
            },
            {
              name: 'users',
              url: `http://localhost:${process.env.PORT_USERS}/graphql`,
            },
            {
              name: 'bands',
              url: `http://localhost:${process.env.PORT_BANDS}/graphql`,
            },
            {
              name: 'genres',
              url: `http://localhost:${process.env.PORT_GENRES}/graphql`,
            },
            {
              name: 'tracks',
              url: `http://localhost:${process.env.PORT_TRACKS}/graphql`,
            },
            {
              name: 'favorites',
              url: `http://localhost:${process.env.PORT_FAVORITES}/graphql`,
            },
          ],
        }),
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
