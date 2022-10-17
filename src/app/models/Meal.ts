export class Meal{
    name: string;
    ingredients: Array<{
        name: string, 
        quantity: number, 
        units: string
    }>;

    constructor(){
        this.name = '';
        this.ingredients = [];
    }
}