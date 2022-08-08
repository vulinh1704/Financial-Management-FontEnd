import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {Category} from "../../model/category";
import {CategoryService} from "../../service/category.service";
import {NgToastService} from "ng-angular-popup";
import {FormControl, FormGroup} from "@angular/forms";
import { Router } from '@angular/router';


@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.css']
})
export class ShowCategoryComponent implements OnInit {

  updateCategoryForm = new FormGroup({
    name: new FormControl(),
    status: new FormControl(),
    note: new FormControl(),
    color: new FormControl(),
  })
  categories: Category[] = [];
  category: any;
  categoryUpdate: any;

  constructor(private categoryService: CategoryService,
              private router: Router,
              private toast: NgToastService) {}

  ngOnInit(): void {
    this.showCategory();
  }

  getCategory(id: number) {
    this.categoryService.findById(id).subscribe(category => {
      this.category = category;
      this.updateCategoryForm = new FormGroup({
        name: new FormControl(category.name),
        status: new FormControl(category.status + ""),
        note: new FormControl(category.note),
        color: new FormControl(category.color),
      })
    })
  }

  confirmDelete(id: number) {
    Swal.fire({
      title: '<h3 style="color: #575656">Bạn muốn xóa ?</h3>',
      text: 'Sau khi xóa danh mục giao dịch sẽ không còn trong danh sách !',
      icon: 'warning',
      showCloseButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Xóa',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.delete(id).subscribe(() => {
          let timerInterval: any
          Swal.fire({
            title: '<h3 style="color:#d94646;"><i class="fa-solid fa-trash"></i> Đang xóa ...</h3>',
            html: 'Loại được xóa trong <b></b> mini giây.',
            timer: 1500,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
              // @ts-ignore
              const b = Swal.getHtmlContainer().querySelector('b')
              timerInterval = setInterval(() => {
                // @ts-ignore
                b.textContent = Swal.getTimerLeft()
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
            }
          })
          this.router.navigate(['/category/']).then(() => {
            setInterval(() => {
              location.reload()
            }, 1200)
          })
        })
      }
    })
  }

  showCategory() {
    this.categoryService.findAll().subscribe(categories => {
      this.categories = categories;
      console.log(this.categories);
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
    this.categoryService.update(this.category.id, this.categoryUpdate).subscribe(() => {
      this.toast.success({detail: "Thông Báo", summary: "Sửa danh mục thành công", duration: 3000, position: "br"})
      this.router.navigate(['/category/']).then(() => {
        setInterval(() => {
          location.reload()
        }, 500)
      })
    }, e => {
      this.toast.error({detail: "Thông Báo", summary: "Sửa danh mục thất bại", duration: 3000, position: "br"})
      console.log(e);
    });
  }
}

