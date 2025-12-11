export class SubscribeResponseDto {
    constructor(private _id: string, private _username: string, private _surnom: string ) { }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }
    
    public get username(): string {
        return this._username;
    }

    public set username(value: string) {
        this._username = value;
    }

    public get surnom(): string {
        return this._surnom;
    }

    public set surnom(value: string) {
        this._surnom = value;
    }
}
