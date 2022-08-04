import { Component, OnInit } from '@angular/core';
import {Category} from "../../model/category";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoriesService} from "../../service/categories.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-show-categories',
  templateUrl: './show-categories.component.html',
  styleUrls: ['./show-categories.component.css']
})
export class ShowCategoriesComponent implements OnInit {
 categories: Category[] = [];
 categoriesForm: FormGroup = new FormGroup({
   name: new FormControl(''),
   status: new FormControl(''),
   note: new FormControl('')
 })

  constructor(private categoriesService: CategoriesService,
              private router: Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.showAll();
  }

  showAll(){
    this.categoriesService.findAll().subscribe(result =>{
      this.categories = result;
    })
  }

}
