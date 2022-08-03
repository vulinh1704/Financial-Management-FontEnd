import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  isLogin = false;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  logout() {
    Swal.fire({
      title: '<img src="assets/img/loli-unscreen.gif">Cám ơn tất cả mọi người đã tới tham dự ngày hôm nay !!',
      width: 400,
      padding: '0.5em',
      color: '#5fa0f6',
      // background: '#fff url(/images/trees.png)',
      backdrop: `
    rgba(0,0,123,0.4)
    url("https://thumbs.gfycat.com/ShockingFastAgouti-max-1mb.gif")
    left top
    no-repeat
  `
    })
    // localStorage.clear();
    // this.isLogin = false;
    // this.router.navigate(['/']);
  }
}
