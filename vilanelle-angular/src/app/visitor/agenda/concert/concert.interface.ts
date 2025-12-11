export interface Concert{
    place:string;
    date:Date;   
    city:string;
    hour:number;
}

export type AgendaConcerts = Concert[];