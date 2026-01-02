import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { Router, RouterLink } from "@angular/router";
import { CocktailService } from '../../services/cocktail.service';
import { CocktailModel } from '../../models/cocktail.model';
import { Cocktail } from "../../common/cocktail/cocktail";
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [InputTextModule, ButtonModule, TagModule, RouterLink, Cocktail, TitleCasePipe],
  templateUrl: './dashboard.html',
  styles: ``,
})
export class Dashboard {
  private cocktailService = inject(CocktailService)
  
  drinkofTheDay = this.getDrinkOfTheDay(this.cocktailService.cocktails)
  random: CocktailModel[] = []
  saved = this.cocktailService.savedCocktails

  router = inject(Router)

  ngOnInit() {
    this.shuffle();
  }

  shuffle = () => {
    const cocktails = this.cocktailService.cocktails
    const shuffled = cocktails.sort(() => 0.5 - Math.random());
    this.random = shuffled.slice(0, 4);
  }

  private hash(str: string): number {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(31, h) + str.charCodeAt(i);
    }
    return h >>> 0;
  }

  getDrinkOfTheDay(cocktails: CocktailModel[]): CocktailModel {
    const today = new Date().toISOString().slice(0, 10);
    const index = this.hash(today) % cocktails.length;
    return cocktails[index];
  }

  goToDetails(id: string) {
    this.router.navigate(['browse', id])
  }

  toggleSave(id: string) {
    this.cocktailService.toggleSaveCocktail(id)
    this.saved = this.cocktailService.savedCocktails
  }

}
