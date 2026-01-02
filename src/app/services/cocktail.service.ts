import { Injectable } from '@angular/core';
import cocktails from '../../../public/data/cocktails.json';
import { CocktailModel } from '../models/cocktail.model';

@Injectable({
  providedIn: 'root',
})
export class CocktailService {

  get cocktails(): CocktailModel[] {
    return [...cocktails] as CocktailModel[];
  }

  getCocktail(id: string): CocktailModel {
    return cocktails.find(x => x.id == id)!
  }

  get savedCocktails(): Set<string> {
    const str = localStorage.getItem('saved_cocktails') || "[]"
    const ar = JSON.parse(str)
    return new Set(ar)
  }

  toggleSaveCocktail(id: string) {
    const saved = this.savedCocktails
    if(saved.has(id)) {
      saved.delete(id)
    } else {
      saved.add(id)
    }
    localStorage.setItem('saved_cocktails', JSON.stringify([...saved]))
  }


}
