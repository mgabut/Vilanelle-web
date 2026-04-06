export class PartitionDto {

  constructor(
    private _id: number,
    private _auteur: string,
    private _titre: string,
    private _pdfPath: string,
    private _pdfName: string,
    private _audioPath: string | null,
    private _audioName: string | null,
    private _dateCreation: string | Date
  ) {}

  get id(): number {
    return this._id;
  }

  get titre(): string {
    return this._titre;
  }

  get auteur(): string {
    return this._auteur;
  }

  get pdfPath(): string {
    return this._pdfPath;
  }

  get pdfName(): string {
    return this._pdfName;
  }
  
  get audioPath(): string | null {
    return this._audioPath;
  }

  get audioName(): string | null {
    return this._audioName;
  }

  get dateCreation(): string | Date {
    return this._dateCreation;
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
      titre: this.titre,
      auteur: this.auteur,
      pdfPath: this.pdfPath,
      pdfName: this.pdfName,
      dateCreation: this.formatDateForBackend(this.dateCreation),
    };
  }

  public static fromJson(json: any): PartitionDto {
    return new PartitionDto(
      json.id,
      json.titre,
      json.auteur,
      json.pdfPath,
      json.pdfName,
      json.audioPath || null,
      json.audioName || null,
      json.dateCreation ? new Date(json.dateCreation) : new Date()
    );
  }

}