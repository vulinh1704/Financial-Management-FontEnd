import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CategoryService} from "../../service/category.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  updateCategoryForm = new FormGroup({
    name: new FormControl(),
    status: new FormControl(),
    note: new FormControl(),
    color: new FormControl(),
  })
  color: any;
  category: any;
  categoryUpdate: any;
  id: number = 0;

  constructor(private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      console.log(this.id);
      this.getCategory(this.id);
    })
  }

  getCategory(id: number) {
    this.categoryService.findById(id).subscribe(category => {
      this.category = category;
      this.updateCategoryForm = new FormGroup({
        name: new FormControl(category.name),
        status: new FormControl(category.status),
        note: new FormControl(category.note),
        color: new FormControl(category.color),
      })
    })
  }

  updateCategory() {
    this.categoryUpdate = {
      name: this.updateCategoryForm.value.name,
      status: this.updateCategoryForm.value.status,
      note: this.updateCategoryForm.value.note,
      color: this.updateCategoryForm.value.color,
      user: {
        id: localStorage.getItem('ID')
      }
    }
    console.log(this.category);
    this.categoryService.update(this.id, this.categoryUpdate).subscribe(() => {
      this.router.navigateByUrl('/category').then();
    })
  }
}
