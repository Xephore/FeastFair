import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cookbook } from '../models/Cookbook';
import { Recipe } from '../models/Recipe';

@Injectable({
  providedIn: 'root'
})
export class CookbookHandlerService {

  private cookbook$: BehaviorSubject<(Cookbook | undefined)>;

  constructor() {
    this.cookbook$ = new BehaviorSubject<Cookbook | undefined>(undefined);
  }

  // Return the cookbook$ observable
  watchCookbook(): BehaviorSubject<(Cookbook | undefined)>{
    return this.cookbook$;
  }

  getCookbook(): Cookbook{
    return this.cookbook$.value || new Cookbook();
  }

  // Initializes cookbook$ with the Cookbook object passed
  loadCookbook(src?: Cookbook): void{
    this.cookbook$.next(src || new Cookbook());
  }

  // Adds the Recipe passed to the current cookbook
  createRecipe(src: Recipe, recipeIndex: (number | undefined)): void{
    console.log(`create ${recipeIndex}`)
    if(recipeIndex !== undefined){
      this.updateRecipe(src, recipeIndex);
      return;
    }
    let recipies: Array<Recipe> = this.cookbook$.value?.recipies || [];
    recipies?.push(src);
    this.cookbook$.next(new Cookbook(this.cookbook$.value, recipies));
  }

  // Replaces the cookbook's recipe at 'index' with the Recipe object passed 
  updateRecipe(src: Recipe, recipeIndex: number){
    console.log('update')
    console.log(this.cookbook$.value)
    // Break out of function if invalid cookbook or index
    if (!this.cookbook$.value || this.cookbook$.value.recipies.length < recipeIndex){
      console.error('Error: Invalid Cookbook');
      return;
    }
    let recipies: Array<Recipe> = this.cookbook$.value.recipies;
    recipies[recipeIndex] = src;
    this.cookbook$.next(new Cookbook(this.cookbook$.value, recipies));
  }

  // Removes the cookbook's recipe at 'index' passed
  deleteRecipe(index: number): void{
    // Break out of function if invalid cookbook or index
    if (!this.cookbook$.value || this.cookbook$.value.recipies.length < index){
      return;
    }
    let recipies: Array<Recipe> = this.cookbook$.value.recipies;
    recipies.splice(index, 1);
    this.cookbook$.next(new Cookbook(this.cookbook$.value, recipies));
  }
}
