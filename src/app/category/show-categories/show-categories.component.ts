import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";

@Component({
  selector: 'app-show-categories',
  templateUrl: './show-categories.component.html',
  styleUrls: ['./show-categories.component.css']
})
export class ShowCategoriesComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  confirmDelete() {
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
      }
    })
  }
}
