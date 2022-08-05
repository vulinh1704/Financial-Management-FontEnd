import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {Category} from "../../model/category";
import {CategoryService} from "../../service/category.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.css']
})
export class ShowCategoryComponent implements OnInit {
  categories: Category[] = [];
  category: any;
  showStatus: any;

  constructor(private categoryService: CategoryService,
              private router: Router) {}

  ngOnInit(): void {
    this.showCategory();
  }

  confirmDelete(id: number) {
    Swal.fire({
      title: '<h3 style="color: #575656">Bạn muốn xóa ?</h3>',
      text: 'Khi xóa loại giao dịch sẽ không còn trong danh sách !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đúng, xóa ngay !',
      cancelButtonText: 'Đóng '
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
}
