export class Stream {
    _name: string;

    constructor(jsonObj) {
        this._name = '';

        for (let prop in jsonObj) {
            if (this.hasOwnProperty(prop)) {
                this[prop] = jsonObj[prop];
            }
        }
    }

}
