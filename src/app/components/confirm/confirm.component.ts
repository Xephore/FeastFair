import { Component, OnInit } from '@angular/core';
import { CookbookHandlerService } from 'src/app/services/cookbook-handler.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(private CookbookHandler: CookbookHandlerService) { }

  ngOnInit(): void {
  }

  confirm(): void {
    this.CookbookHandler.loadCookbook();
  }

}
