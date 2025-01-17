import { IsArray, IsOptional, IsString } from 'class-validator';
import { Member } from '../classes/member';

export class CreateBandDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    origin: any;

    @IsArray()
    @IsOptional()
    members: Member[];

    @IsString()
    @IsOptional()
    website: string;

    @IsArray()
    @IsOptional()
    genresIds: string[];
}
