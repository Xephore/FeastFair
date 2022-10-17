export class Food{
    name: string;
    serving: {
        size: number, 
        units: string
    };
    macros: {
        carbohydrates: number,
        proteins: number,
        fats: {
            unsaturated: number,
            saturated: number,
            trans: number
        }
    };
    nutrients: {
        fiber: number;
    };
    vitamins: {
        A: number
    };

    constructor(){
        this.name = '';
        this.serving = {
            size: 0, 
            units: 'g'
        };
        this.macros = {
            carbohydrates: 0,
            proteins: 0, 
            fats: {
                unsaturated: 0, 
                saturated: 0, 
                trans: 0
            }
        };
        this.nutrients = {
            fiber: 0
        };
        this.vitamins = {
            A: 0
        };
    }
}