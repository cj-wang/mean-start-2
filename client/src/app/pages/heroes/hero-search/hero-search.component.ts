import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {

  constructor(private heroService: HeroService, private router: Router, private route: ActivatedRoute) {}

  search = (term: string) => this.heroService.searchHeroes(term);

  select = (id: number) => this.router.navigate(['detail', id], {relativeTo: this.route.parent});

  ngOnInit(): void {
  }
}
