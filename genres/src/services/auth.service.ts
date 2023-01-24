import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(private readonly httpService: HttpService) {}

    verifyToken(token) {
        return firstValueFrom(
            this.httpService.post(
                process.env.VERIFY_TOKEN_URL,
                {},
                {
                    headers: {
                        authorization: token,
                    },
                },
            ),
        );
    }
}
