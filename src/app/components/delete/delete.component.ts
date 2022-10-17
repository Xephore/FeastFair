import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recipe } from 'src/app/models/Recipe';
import { CookbookHandlerService } from 'src/app/services/cookbook-handler.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  recipe: Recipe;
  index: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {
      recipe: Recipe,
      index: number },
    private CookbookHandler: CookbookHandlerService) {
      this.recipe = data.recipe;
      this.index = data.index;
    }

  ngOnInit(): void {
  }

  deleteRecipe(){
    this.CookbookHandler.deleteRecipe(this.index);
  }

}
