import { Component, inject, computed } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RouterLink } from "@angular/router";
import { CarouselModule } from 'primeng/carousel';
import { CocktailService } from '../../services/cocktail.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [ButtonModule, TagModule, RouterLink, CarouselModule, TitleCasePipe],
  templateUrl: './home.html',
  styles: ``,
})
export class Home {

  cocktailService = inject(CocktailService)
  cocktails = this.cocktailService.cocktails

  window = window

  features = [
    {
      icon: 'search',
      title: 'Recipe Explorer',
      description: 'Smart Search allows you to find drinks by ingredients you already have in your cabinet. No more guessing.'
    },
    {
      icon: 'bookmark',
      title: 'Favourites Manager',
      description: 'Build your own digital bar. Save your top picks for quick access and create curated lists for any occasion.'
    },
    {
      icon: 'calculate',
      title: 'Ingredient Calculator',
      description: 'Planning a party? Scale ingredients instantly for 1 or 100 guests with our precise party calculator.'
    }
  ]

  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ]

  trending = computed(() => {
    const trendingIds = ['long-island-iced-tea', 'dry-martini', 'margarita', 'old-fashioned', 'sex-on-the-beach', 'mojito']
    return this.cocktails().filter(x => trendingIds.includes(x.id))
  })
}
