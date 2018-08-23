export class Apikey {

    name: string;
    description: string;
    id: string;
    value: string;
    customerId: string;
    enabled: boolean;
    createdDate: Date;
    lastUpdateDate: Date;


    constructor(jsonObj) {
        this.name = '';
        this.description = '';
        this.id = '';
        this.value = '';
        this.customerId = '';
        this.enabled = true;
        this.createdDate = null;
        this.lastUpdateDate = null;

        for (let prop in jsonObj) {
            if (this.hasOwnProperty(prop)) {
                this[prop] = jsonObj[prop];
            }
        }
    }


}
