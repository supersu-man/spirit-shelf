import { Component, input, output } from '@angular/core';
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
  cocktail = input<CocktailModel | undefined>()
  saved = input<boolean>(false)
  onOpen = output<void>()
  onSave = output<void>()
}
