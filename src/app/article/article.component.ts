import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from "apollo-angular";
import ARTICLE_QUERY from "../apollo/queries/article/article";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnDestroy {
  data: any = {};
  loading = true;
  errors: any;
  baseUri = environment.baseUri;
  private queryArticle: Subscription;

  constructor(private apollo: Apollo, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.queryArticle = this.apollo
      .watchQuery({
        query: ARTICLE_QUERY,
        variables: {
          id: this.route.snapshot.paramMap.get("id")
        }
      })
      .valueChanges.subscribe(result => {
        this.data = result.data;
        this.loading = result.loading;
        this.errors = result.errors;
      });
  }

  ngOnDestroy(): void {
    this.queryArticle.unsubscribe();
  }

}
