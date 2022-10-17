import { Recipe } from "src/app/models/Recipe";

export class Cookbook{
    name: string;
    recipies: Array<Recipe>;

    constructor(src?: Cookbook, r?: Array<Recipe>){
        if (src){
            this.name = src.name;
            this.recipies = src.recipies;
        } else {
            this.name = 'yyz';
            this.recipies = [];
        }
    }
}