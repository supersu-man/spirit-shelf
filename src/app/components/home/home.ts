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
