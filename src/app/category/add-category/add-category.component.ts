import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {CategoryService} from "../../service/category.service";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  categoryForm = new FormGroup({
    name: new FormControl(),
    status: new FormControl(),
    note: new FormControl(),
    color: new FormControl('#E9E612'),
  })
  color: any;
  category: any;

  constructor(private categoryService: CategoryService,
              private router: Router,
              private toast : NgToastService) { }
  ngOnInit(): void {
  }

  addCategory() {
    this.category = {
      name: this.categoryForm.value.name,
      status: this.categoryForm.value.status,
      note: this.categoryForm.value.note,
      color: this.categoryForm.value.color,
      user: {
        id: localStorage.getItem('ID')
      }
    }
    console.log(this.category);
    this.categoryService.save(this.category).subscribe(() => {
      this.toast.success({detail:"Thông báo", summary: "Thêm danh mục thành công!",duration: 3000,position:'br'})
      this.router.navigate(['/category/']).then(() => {
        setInterval(() => {
          location.reload()
        }, 500)
      })
    }, e => {
      this.toast.error({detail: "Thông Báo", summary: "Thêm danh mục thất bại", duration: 3000, position: "br"})
      console.log(e);
    });
  }
}
