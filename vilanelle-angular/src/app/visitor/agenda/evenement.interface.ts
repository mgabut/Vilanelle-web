export interface Evenement {
    ville: string;
    lieu: string;
    libelle: string;
    date: Date;
    heure: string;
}

export type AgendaConcerts = Evenement[];