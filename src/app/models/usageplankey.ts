export class Usageplankey {

    name: string;
    description: string;

    constructor(jsonObj) {
        this.name = '';
        this.description = '';

        for (let prop in jsonObj) {
            if (this.hasOwnProperty(prop)) {
                this[prop] = jsonObj[prop];
            }
        }
    }


}
