export class EvenementDto {
    constructor(
        private _id: number,
        private _ville: string,
        private _lieu: string,
        private _cp: number,
        private _libelle: string,
        private _date: Date,
    ) {}

    get id(): number {
        return this._id;
    }
    
    get ville(): string {
        return this._ville;
    }
    get lieu(): string {
        return this._lieu;
    }
    get cp(): number {
        return this._cp;
    }
    get libelle(): string {
        return this._libelle;
    }
    get date(): Date {
        return this._date;
    }
    public toJson(): any {
        return {
            ville: this.ville,
            lieu: this.lieu,
            cp: this.cp,
            libelle: this.libelle,
            date: this.date,
        };
    }
}