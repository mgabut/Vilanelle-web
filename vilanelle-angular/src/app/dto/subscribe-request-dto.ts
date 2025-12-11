export class SubscribeRequestDto {
    constructor(private _username: string, private _password: string, private _surnom: string ) { }

    public get username(): string {
        return this._username;
    }

    public set username(value: string) {
        this._username = value;
    }

    public get password(): string {
        return this._password;
    }

    public set password(value: string) {
        this._password = value;
    }

    public get surnom(): string {
        return this._surnom;
    }

    public set surnom(value: string) {
        this._surnom = value;
    }

    public toJson(): any {
        return {
            username: this.username,
            password: this.password,
            surnom: this.surnom
        };
    }
}
