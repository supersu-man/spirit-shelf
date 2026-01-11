import { Component, inject, signal, computed } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { Router, ActivatedRoute } from '@angular/router';
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
  activatedRoute = inject(ActivatedRoute)
  browse = computed(() => this.activatedRoute.snapshot.url[0]?.path === 'browse')

  private cocktailService = inject(CocktailService);
  saved = this.cocktailService.savedCocktails;
  
  private searchValue = signal<string>('');
  
  private baseCocktails = computed(() => {
    const saved = this.saved();
    return this.browse() 
      ? this.cocktailService.cocktails() 
      : this.cocktailService.cocktails().filter(x => saved.has(x.id));
  });

  cocktails = computed(() => {
    const search = this.searchValue().toLowerCase();
    const base = this.baseCocktails();
    if (!search) {
      return base;
    }
    return base.filter(x => x.title.toLowerCase().includes(search));
  });

  onSearch(event: any) {
    this.searchValue.set(event.target.value);
  }

  goToDetails(id: string) {
    this.router.navigate(['browse', id])
  }

  save(id: string) {
    this.cocktailService.toggleSaveCocktail(id)
  }

}
