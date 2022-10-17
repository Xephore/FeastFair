import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Cookbook } from 'src/app/models/Cookbook';
import { Recipe } from 'src/app/models/Recipe';
import { CookbookHandlerService } from 'src/app/services/cookbook-handler.service';
import { CreateComponent } from 'src/app/components/create/create.component';
import { DeleteComponent } from 'src/app/components/delete/delete.component';
import { Subscription } from 'rxjs';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  validExtensions: Array<string>;
  cookbook: Cookbook;
  cookbookSub: (Subscription | undefined);

  constructor(
    private CookbookHandler: CookbookHandlerService,
    private dialog: MatDialog
    ){
      this.validExtensions = [];
      this.cookbook = new Cookbook();
      this.cookbookSub = undefined;
  }

  ngOnInit(): void {
    this.cookbookSub = this.CookbookHandler.watchCookbook().subscribe(value=>{
      this.cookbook = value || new Cookbook();
      console.log(`sub: ${value}`);
      console.log(this.cookbook)
    });
    this.validExtensions = ['application/json'];
    this.cookbook = new Cookbook();
    this.cookbook.recipies = [
      new Recipe('Smoked Beets'),
      new Recipe('Roasted Beets'),
      new Recipe('Beet Salad'),
      new Recipe('Red Beet Velvet Cake'),
      new Recipe('Pickled Beets')
    ];
    for (let i=0;i<this.cookbook.recipies.length;i++){
      this.cookbook.recipies[i].ingredients = [{
        name: 'Gold',
        quantity: 7,
        units: 'grams'
      },{
        name: 'Salt',
        quantity: 1.5,
        units: 'cups'
      },{
        name: 'Beets',
        quantity: 57,
        units: 'whole'
      }];
      this.cookbook.recipies[i].directions = [
        {name: 'wash'},
        {name: 'chop'},
        {name: 'boil'},
        {name: 'sear'},
        {name: 'serve'}
      ];
    }
    this.CookbookHandler.loadCookbook(this.cookbook);
  }

  @HostListener('window:beforeunload')
  ngOnDestroy(){
    console.log(`unsub: ${this.cookbookSub}`);
    this.cookbookSub?.unsubscribe();
    console.log('unsub: done');
  }

  openCookbook(event: Event): void{
    const target: HTMLInputElement = event.target as HTMLInputElement;
    if (!target.files){
      console.error('[FeastFair] No cookbook file selected!');
      return;
    }
    let file = target.files[0];
    if(this.validExtensions.includes(file.type)){
      const fr = new FileReader();
      fr.addEventListener("load", ()=>{
        this.CookbookHandler.loadCookbook(JSON.parse(`${fr.result}`));
        console.log(this.cookbook);
      });
      fr.readAsText(file);
    } else {
      alert('Invalid File Type Selected');
    }
  }

  createCookbook(): void{
    this.dialog.open(ConfirmComponent);
  }

  saveCookbook(): void{
    let file = document.createElement('a') as HTMLAnchorElement;
    file.href = URL.createObjectURL(
      new Blob([JSON.stringify(this.cookbook, null, 2)],
      {type: 'text/json'})
    );
    file.download = `${this.cookbook.name}.json`;
    file.click();
  }

  addRecipe(): void{
    this.dialog.open(CreateComponent, {
      data: {
        recipe: undefined,
        index: undefined
      }
    });
  }

  editRecipe(e: Event, index: number): void{
    e.stopPropagation();
    this.dialog.open(CreateComponent, {
      data: {
        recipe: this.cookbook.recipies[index],
        index: index
      }
    });
  }

  removeRecipe(e: Event, index: number): void{
    e.stopPropagation();
    console.log(this.cookbook.recipies[index])
    this.dialog.open(DeleteComponent, {
      data: {
        recipe: this.cookbook.recipies[index],
        index: index
      }
    });
  }

}
