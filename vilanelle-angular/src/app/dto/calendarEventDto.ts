export class CalendarEventDto {

  constructor(
        private _id: number,
        private _title: string,
        private _start: string,
        private _end: string,
        private _allDay: boolean,
        private _description: string,
    ) {}

    get id(): number {
        return this._id;
    }
    
    get title(): string {
        return this._title;
    }
    get start(): string {
        return this._start;
    }
    get end(): string {
        return this._end;
    }
    get allDay(): boolean {
        return this._allDay;
    }
    get description(): string {
        return this._description;
    }

    public toJson(): any {
        return {
            id: this.id,
            title: this.title,
            start: this.start,
            end: this.end,
            allDay: this.allDay,
            description: this.description
        };
    }
}