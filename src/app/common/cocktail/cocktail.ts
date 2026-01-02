import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { CocktailModel } from '../../models/cocktail.model';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-cocktail',
  imports: [TagModule, TitleCasePipe],
  templateUrl: './cocktail.html',
  styles: ``,
})
export class Cocktail {
  @Input() cocktail: CocktailModel | undefined
  @Input() saved: boolean = false
  @Output() onOpen = new EventEmitter()
  @Output() onSave = new EventEmitter()
}
