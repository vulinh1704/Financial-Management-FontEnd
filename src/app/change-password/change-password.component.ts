import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  pass=localStorage.getItem('PASS')
  // @ts-ignore
  currentUser: User;
  // @ts-ignore
  sub: Subscription;
  // @ts-ignore
  currentUserToken: UserToken;
  newPasswordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    password: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  constructor(private userService: UserService,
              private router: Router,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
  }


  changePassword() {
    const user = this.setNewUser();
    if (confirm('Are you sure you want to change password ?')) {
      if(this.newPasswordForm.value.oldPassword === localStorage.getItem('PASS')) {
        if (this.newPasswordForm.value.password === this.newPasswordForm.value.confirmPassword) {
          this.authService.currentUser.subscribe(
            currentUser => {
              this.userService.changePass(currentUser.id, user).subscribe(() => {
                alert('Đổi mật khẩu thành công');
                localStorage.setItem('PASS', this.newPasswordForm.value.password);
                this.newPasswordForm.reset();
                this.router.navigate(['/user']);
              }, err => {
                console.log(err)
              });
            }
          )
        }
        else {
          alert('Mật khẩu không trùng');
        }
      }else {
        alert('Mật khẩu cũ không đúng ');
      }
    }
  }

  private setNewUser() {
    // @ts-ignore
    const user: User = {
      password: this.newPasswordForm.value.password,
      confirmPassword: this.newPasswordForm.value.confirmPassword,
    };
    return user;
  }

  get password(){
   return  this.newPasswordForm.get('password')
  }
  get oldPassword(){
    return  this.newPasswordForm.get('oldPassword')
  }
  get confirmPassword(){
    return  this.newPasswordForm.get('confirmPassword')
  }


}
