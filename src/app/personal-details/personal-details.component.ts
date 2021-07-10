import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../config/auth.service';
import { ApiService } from '../config/api.service';
import { TokenService } from '../config/token.service';
import { HelpersService } from '../config/helpers.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {
  public user: any;
  public profile: any;
  files: any;
  arrayBuffer: any;
  public firstName: string;
  public lastName: string;
  public defaultImg = '../images/man-walking.png';
  @ViewChild('file') file: ElementRef;

  profileForm= this.fb.group({
    firstName: [''],
    lastName: [''],
    username: ['']
  })

  constructor(
    private fb: FormBuilder,
    private tokenService: TokenService,
    private api: ApiService,
    private helpers: HelpersService
    ) { }

  ngOnInit(): void {
    if (this.helpers.isBrowser()) {
      this.user = this.tokenService.getUser();
      this.profile = this.user.profile;
      // this.helpers.setHeader();

      if (this.profile) {
        this.setFormAttributes();
      }
    }
  }

  setFormAttributes() {
    this.profileForm.setValue({firstName: this.profile.firstName, lastName: this.profile.lastName, username: this.user.username });
    if (this.profile.avatar) this.defaultImg = this.profile.avatar.url;
  }

  readUrl(element) {
    const fileUpload = this.file;
    const reader = new FileReader();
    const result = (element.target as FileReader).result;
    this.arrayBuffer = result;
    reader.onload = function (e) {
      const result = e.target.result as string;
      document.getElementById('my-image')
      .setAttribute('src', result)
    };
    this.files = fileUpload.nativeElement.files[0];
    reader.readAsDataURL(fileUpload.nativeElement.files[0]);
  }

  removeImg() {
    document.getElementById('my-image').setAttribute('src', '../images/man-walking.png');
    this.profileForm.value.avatar = '';
  }

  onSubmit() {
    this.profileForm.value.username = this.user.username;

    const formData = new FormData();
    formData.append('data', JSON.stringify(this.profileForm.value));
    if (this.files) {
      formData.append('files.avatar', this.files, this.files.name);
    }

    this.api.createOrUpdateProfile(formData).subscribe(
      data => {
        this.tokenService.saveUser(data);
        if (this.helpers.isBrowser()) {
          window.location.reload()
        }
      },
      err => console.error(err)
    )
    
  }

}
