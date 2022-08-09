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
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    if (confirm('Bạn có chắc muốn đăng xuất không ?')) {
      localStorage.clear();
      this.isLogin = false;
<<<<<<< HEAD
      this.router.navigate(['/register']);
=======
      this.router.navigate(['/']);
>>>>>>> origin/dev
    }
  }
}
