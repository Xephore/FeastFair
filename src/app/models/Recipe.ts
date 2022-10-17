export class Recipe{
    name: string;
    ingredients: Array<{
        name: string, 
        quantity: number, 
        units: string
    }>
    directions: Array<{
        name: string
    }>

    constructor(name?: string){
        this.name = name || '';
        this.ingredients = [{name: '', quantity: 0, units: ''}];
        this.directions = [{name: ''}];
    }
    
}