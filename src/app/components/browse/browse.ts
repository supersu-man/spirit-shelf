import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Cocktail } from '../../common/cocktail/cocktail';
import { CocktailService } from '../../services/cocktail.service';

@Component({
  selector: 'app-browse',
  imports: [InputTextModule, TagModule, ButtonModule, Cocktail],
  templateUrl: './browse.html',
  styles: ``,
})
export class Browse {
  router = inject(Router)
  browse = this.router.url == '/browse'

  private cocktailService = inject(CocktailService);
  saved = this.cocktailService.savedCocktails;
  cocktails = this.browse ? this.cocktailService.cocktails : this.cocktailService.cocktails.filter(x => this.saved.has(x.id))

  onSearch(event: any) {
    const cocktails = this.browse ? this.cocktailService.cocktails : this.cocktailService.cocktails.filter(x => this.saved.has(x.id))
    const searchValue = event.target.value.toLowerCase()
    if (!searchValue)
        this.cocktails = cocktails
    else
      this.cocktails = cocktails.filter(x => x.title.toLowerCase().includes(searchValue))
  }

  goToDetails(id: string) {
    this.router.navigate(['browse', id])
  }

  save(id: string) {
    this.cocktailService.toggleSaveCocktail(id)
    this.saved = this.cocktailService.savedCocktails
    if (!this.browse)
      this.cocktails = this.cocktailService.cocktails.filter(x => this.saved.has(x.id))
  }

}
