import { Component, inject } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { TagModule } from 'primeng/tag';
import { ActivatedRoute } from '@angular/router';
import { CocktailService } from '../../services/cocktail.service';
import { FieldsetModule } from 'primeng/fieldset';
import { PopoverModule } from 'primeng/popover';
import { MessageService } from 'primeng/api';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [BreadcrumbModule, StepperModule, ButtonModule, AccordionModule, TagModule, FieldsetModule, PopoverModule, TitleCasePipe],
  templateUrl: './details.html',
  styles: ``,
})
export class Details {

  activatedRoute = inject(ActivatedRoute)
  id = this.activatedRoute.snapshot.paramMap.get('id')

  private cocktailService = inject(CocktailService)
  cocktail = this.cocktailService.getCocktail(this.id || '')
  saved = this.cocktailService.savedCocktails

  private messageService = inject(MessageService)


  async sharePage() {
    try {
      await navigator.share({
        title: document.title,
        url: window.location.href
      });
    } catch (error) {
      navigator.clipboard.writeText(window.location.href)
      this.messageService.add({
        severity: 'success',
        summary: 'Link Copied',
        detail: 'The link has been copied to your clipboard.',
      })
    }
  }

  toggleSaved() {
    this.cocktailService.toggleSaveCocktail(this.cocktail.id)
    this.saved = this.cocktailService.savedCocktails
  }
}
