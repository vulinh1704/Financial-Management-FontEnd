import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

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
      this.router.navigate(['/']);
    }
  }

}
