import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recipe } from 'src/app/models/Recipe';
import { CookbookHandlerService } from 'src/app/services/cookbook-handler.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  recipeIndex: (number | undefined);
  recipe: Recipe;

  recipeForm: FormGroup;
  directionsArray: FormArray;
  ingredientsArray: FormArray;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {
      recipe: (Recipe | undefined),
      index: (number | undefined)},
    private fb: FormBuilder,
    private CookbookHandler: CookbookHandlerService){
      this.recipeIndex = data.index;
      this.ingredientsArray = {} as FormArray;
      this.directionsArray = {} as FormArray;
      if (data.recipe){
        this.recipe = Object.assign(Object.create(Object.getPrototypeOf(data.recipe)), data.recipe); 
      } else {
        this.recipe = new Recipe();
      }
      this.recipeForm = this.fb.group({
        name: this.recipe.name,
        ingredients: this.fb.array([]),
        directions: this.fb.array([])
      });
    }

  ngOnInit(): void {
    this.ingredientsArray = this.recipeForm.get('ingredients') as FormArray;
    this.directionsArray = this.recipeForm.get('directions') as FormArray;
    this.data.recipe?.ingredients.forEach(ingredient => {
      this.ingredientsArray.push(
        this.fb.group({
          quantity: [ingredient.quantity],
          units: [ingredient.units],
          name: [ingredient.name]
        })
      );
    });
    this.data.recipe?.directions.forEach(direction=>{
      this.directionsArray.push(
        this.fb.group({
          name: [direction.name]
        })
      );
    });
    this.recipeForm.controls['name'].valueChanges.subscribe(data=>{
      this.recipe.name = data;
    });
    this.recipeForm.controls['ingredients'].valueChanges.subscribe(data=>{
      this.recipe.ingredients = data;
    });
    this.recipeForm.controls['directions'].valueChanges.subscribe(data=>{
      this.recipe.directions = data;
    });
  }

  addIngredient(){
    this.ingredientsArray.push(this.fb.group({
      quantity: 0,
      units: '',
      name: ''
    }));
  }

  removeIngredient(index: number){
    this.ingredientsArray.removeAt(index);
  }

  addDirection(){
    this.directionsArray.push(this.fb.group({
      name: ''
    }));
  }

  removeDirection(index: number){
    this.directionsArray.removeAt(index);
  }

  save(): void {
    console.log('save')
    this.CookbookHandler.createRecipe(this.recipe, this.recipeIndex);
  }

}
