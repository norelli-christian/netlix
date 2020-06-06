import { Actor } from './Actor';
import { Genre } from './Genre';

export interface Film{
    id?:number;
    title:string;
    description:string;
    plot?: string;
    director:string;
    duration:string;
    releaseYear:number;
    stars:number;
    cast:Actor[];
    genres:Genre[];
    tags:string;
    coverUrl:string;
}