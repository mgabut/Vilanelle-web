export class EvenementDto {
    constructor(
        private _id: number,
        private _ville: string,
        private _lieu: string,
        private _cp: number,
        private _libelle: string,
        private _date: string | Date,
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
    get date(): string | Date {
        return this._date;
    }

    private formatDateForBackend(dateInput: string | Date): string {
    const d = new Date(dateInput);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = '00';

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
    public toJson(): any {
        return {
            ville: this.ville,
            lieu: this.lieu,
            cp: this.cp,
            libelle: this.libelle,
            date: this.formatDateForBackend(this.date),
        };
    }
}