import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-show-wallet',
  templateUrl: './show-wallet.component.html',
  styleUrls: ['./show-wallet.component.css']
})
export class ShowWalletComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  confirmDelete() {
    Swal.fire({
      title: '<h3 style="color: #575656">Bạn muốn xóa ?</h3>',
      text: 'Khi xóa ví của bạn sẽ không còn trong danh sách !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đúng, xóa ngay !',
      cancelButtonText:'Đóng '
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '<h3 style="color: #575656">Đã xóa !</h3>',
          'Ví này đã bị xóa khỏi danh sách',
          'success'
        )
      }
    })
  }
}
