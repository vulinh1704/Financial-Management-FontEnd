import {Component, OnInit} from '@angular/core';
import {User} from "../model/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | any;
  id: any;
  title = "cloudsSorage";
  image: any
  downloadURL: any;

  updateForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
    // name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
    address: new FormControl('',[Validators.required]),
    age: new FormControl('', [Validators.required, Validators.pattern("^(1[6789]|[2-9]\\d)$")]),
    sex: new FormControl('',[Validators.required]),
  })

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private storage: AngularFireStorage,
              private toast : NgToastService) {
  }

  ngOnInit(): void {
    this.findById();
  }

  findById() {
    this.userService.findById(localStorage.getItem('ID')).subscribe(data => {
      this.updateForm.patchValue({
        email: data.email,
        username: data.username,
        address: data.address,
        age: data.age,
        sex: data.sex + "",
      })
      this.image = data.avatar;
    }, error => {
      console.log(error)
    })
  }

  update() {
    this.user = {
      email: this.updateForm.value.email,
      username: this.updateForm.value.username,
      // name: this.updateForm.value.name,
      address: this.updateForm.value.address,
      age: this.updateForm.value.age,
      sex: this.updateForm.value.sex,
      avatar: this.image,
    }
    this.userService.updateUserProfile(localStorage.getItem('ID'), this.user).subscribe(() => {
      this.toast.success({detail:"Thông báo", summary: "Cập nhật trang cá nhân thành công!",duration: 3000,position:'br'})
      localStorage.setItem('USERNAME', this.user.username);
      localStorage.setItem('AVATAR', this.user.avatar);
      this.router.navigateByUrl("/home")
    }, error => {
      console.log(error)
    })
  }

  onFileSelected(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url: any) => {
            if (url) {
              this.image = url;
            }
            console.log("img",this.image);
          });
        })
      )
      .subscribe((url: any) => {
        if (url) {
          console.log(url);
        }
      });
  }

  get username(){
    return this.updateForm.get('username');
  }

  get email(){
    return this.updateForm.get('email');
  }

  get address(){
    return this.updateForm.get('address');
  }

  get age(){
    return this.updateForm.get('age');
  }

  get sex(){
    return this.updateForm.get('sex');
  }

  get profilename(){
    return this.updateForm.get('profilename');
  }
}
