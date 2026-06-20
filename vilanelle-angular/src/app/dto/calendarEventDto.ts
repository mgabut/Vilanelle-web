export class CalendarEventDto {

    constructor(
        private _id: number,
        private _title: string,
        private _start: string,
        private _end: string,
        private _allDay: boolean,
        private _description: string,
        private _rrule: string | null = null,
        private _duration: string | null = null
    ) {}

    get id(): number { return this._id; }
    get title(): string { return this._title; }
    get start(): string { return this._start; }
    get end(): string { return this._end; }
    get allDay(): boolean { return this._allDay; }
    get description(): string { return this._description; }
    get rrule(): string | null { return this._rrule; }
    get duration(): string | null { return this._duration; }

    public toJson(): any {
        const payload: any = {
            title: this.title,
            start: this.start,
            end: this.end || null,
            allDay: this.allDay,
            description: this.description,
            rrule: this.rrule,
            duration: this.duration
        };
        // Ne pas envoyer l'id pour une création (id=0) : JPA doit recevoir null pour appeler persist()
        if (this.id !== 0) {
            payload['id'] = this.id;
        }
        return payload;
    }
}
