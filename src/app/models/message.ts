export class Message {
    _key: string;
    _value: string;

    constructor(jsonObj) {
        this._key = '';
        this._value = '';

        for (let prop in jsonObj) {
            if (this.hasOwnProperty(prop)) {
                this[prop] = jsonObj[prop];
            }
        }
    }
}
