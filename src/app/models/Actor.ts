import { Film } from './film';

export interface Actor{
    id?:number;
    fistname:string;
    lastname:string;
    selected?: boolean;
    films?: Film[];
}