import { Injectable, signal, computed } from '@angular/core';
import cocktails from '../../../public/data/cocktails.json';
import { CocktailModel } from '../models/cocktail.model';

@Injectable({
  providedIn: 'root',
})
export class CocktailService {
  private readonly cocktailsData = signal<CocktailModel[]>([...cocktails] as CocktailModel[]);
  
  cocktails = this.cocktailsData.asReadonly();

  private savedCocktailsData = signal<Set<string>>(this.loadSavedCocktails());

  savedCocktails = computed(() => this.savedCocktailsData());

  private loadSavedCocktails(): Set<string> {
    const str = localStorage.getItem('saved_cocktails') || "[]"
    const ar = JSON.parse(str)
    return new Set(ar)
  }

  getCocktail(id: string): CocktailModel {
    return this.cocktailsData().find(x => x.id == id)!
  }

  toggleSaveCocktail(id: string) {
    const saved = new Set(this.savedCocktailsData())
    if(saved.has(id)) {
      saved.delete(id)
    } else {
      saved.add(id)
    }
    localStorage.setItem('saved_cocktails', JSON.stringify([...saved]))
    this.savedCocktailsData.set(saved)
  }


}
