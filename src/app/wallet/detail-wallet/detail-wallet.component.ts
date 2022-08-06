import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {WalletService} from "../../service/wallet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-detail-wallet',
  templateUrl: './detail-wallet.component.html',
  styleUrls: ['./detail-wallet.component.css']
})
export class DetailWalletComponent implements OnInit {

  updateForm = new FormGroup({
    name: new FormControl(),
    moneyType: new FormControl(),
  });

  id: number = 0;
  idInUse = Number(localStorage.getItem('ID_WALLET'));
  icon: any;
  isCheck: boolean = false;
  wallet: any;
  walletInUse: any;
  walletDelete: any
  walletEdit: any;

  constructor(private walletService: WalletService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toast: NgToastService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.getWallet(this.id);
    })
  }

  changeIcon(event: any) {
    this.icon = event.target.src;
  }

  getWallet(id: number) {
    return this.walletService.findById(id).subscribe((wallet) => {
      this.wallet = wallet;
      this.icon = wallet.icon;
      this.updateForm = new FormGroup({
        name: new FormControl(wallet.name),
        moneyType: new FormControl("" + wallet.moneyType.id)
      });
      if (this.wallet.id == localStorage.getItem('ID_WALLET')) {
        this.isCheck = true;
      } else {
        this.isCheck = false;
      }
    })
  }

  alertOnOff(id: number) {
    this.walletService.findById(id).subscribe((wallet) => {
      this.wallet = wallet;
      if (this.wallet.id == localStorage.getItem('ID_WALLET')) {
        Swal.fire(
          '<h3 style="color: #575656">Tắt hoạt động ví ?</h3>',
          'Bạn vui lòng bật hoạt động ví khác để tắt ví này !!!',
          'question'
        )
        location.reload()
      } else {
        this.walletEdit = {
          name: this.wallet.name,
          moneyType: {
            id: this.wallet.moneyType.id,
          },
          icon: this.icon,
          moneyAmount: this.wallet.moneyAmount,
          status: 2,
          user: {
            id: localStorage.getItem('ID')
          }
        }
        this.walletService.update(this.wallet.id, this.walletEdit).subscribe(() => {
          localStorage.removeItem('ID_WALLET');
          localStorage.setItem('ID_WALLET', this.wallet.id);
          this.toast.success({detail: "Thông báo", summary: "Chuyển ví thành công!", duration: 3000, position: 'br'});
          location.reload();
        })
      }
    })
    this.walletService.findById(this.idInUse).subscribe((wallet) => {
      this.walletInUse = wallet;
      this.walletService.updateStatus(this.walletInUse.id, this.walletInUse).subscribe(() => {
      })
    })
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
      cancelButtonText: 'Đóng '
    }).then((result) => {
      if (result.isConfirmed) {
        this.walletDelete = {
          name: this.wallet.name,
          moneyType: {
            id: this.wallet.moneyType.id,
          },
          icon: this.wallet.icon,
          moneyAmount: this.wallet.moneyAmount,
          status: this.wallet.status,
          user: {
            id: localStorage.getItem('ID')
          }
        }
        this.walletService.delete(this.wallet.id, this.walletDelete).subscribe(() => {
          let timerInterval: any
          Swal.fire({
            title: '<h3 style="color:#d94646;"><i class="fa-solid fa-trash"></i> Đang xóa ...</h3>',
            html: 'Ví được xóa trong <b></b> mini giây.',
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
          this.router.navigate(['/wallet/' + localStorage.getItem('ID_WALLET')]).then(() => {
            setInterval(() => {
              location.reload()
            }, 1500)
          })
        })
      }
    })
  }

  updateWallet() {
    this.walletEdit = {
      name: this.updateForm.value.name,
      moneyType: {
        id: this.updateForm.value.moneyType,
      },
      icon: this.icon,
      moneyAmount: this.wallet.moneyAmount,
      status: this.wallet.status,
      user: {
        id: localStorage.getItem('ID')
      }
    }
    console.log(this.walletEdit);
    this.walletService.update(this.id, this.walletEdit).subscribe(() => {
      this.toast.success({detail: "Thông báo", summary: "Sửa ví thành công!", duration: 3000, position: 'br'});
    }, error => {
      this.toast.error({detail: "Thông báo", summary: "Sửa ví thất bại!", duration: 3000, position: 'br'});
    })
    location.reload();
  }
}
