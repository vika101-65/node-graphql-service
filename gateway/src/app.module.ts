import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import 'dotenv/config';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            // {
            //   name: 'albums',
            //   url: `http://localhost:${process.env.PORT_ALBUMS}/graphql`,
            // },
            // {
            //   name: 'artists',
            //   url: `http://localhost:${process.env.PORT_ARTISTS}/graphql`,
            // },
            {
              name: 'users',
              url: `http://localhost:${process.env.PORT_USERS}/graphql`,
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