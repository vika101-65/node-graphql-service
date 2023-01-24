import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        // const request = context.switchToHttp().getRequest();
        const authorizationHeader =
            request.headers['authorization'] ||
            request.headers['Authorization'];
        try {
            const { data } = await this.authService.verifyToken(
                authorizationHeader,
            );
            request.user = data;
            return true;
        } catch (err) {
            return false;
        }
    }
}
