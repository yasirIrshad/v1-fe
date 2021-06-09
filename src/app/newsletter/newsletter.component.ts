import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HelpersService } from '../config/helpers.service';
import { ApiService } from '../config/api.service';
import { TokenService } from '../config/token.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {
  user: any;
  newsletter: any;

  newsletterForm = this.fb.group({
    notify_new_events: [''],
    notify_weekly_newsletter: [''],
  })

  constructor(
    private fb: FormBuilder,
    private helpers: HelpersService,
    private api: ApiService,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    if (this.helpers.isBrowser()) {
      this.user = this.tokenService.getUser();
      this.newsletter = this.user.news_letter;
      if (this.newsletter) {
        this.setFormAttributes();
      }
    }
  }

  setFormAttributes() {
    this.newsletterForm.setValue({notify_new_events: this.newsletter.notify_new_events, notify_weekly_newsletter: this.newsletter.notify_weekly_newsletter });
  }

  onSubmit() {
    this.newsletterForm.patchValue({notify_new_event: this.newsletterForm.value.notify_new_event ? true : false, notify_weekly_newsletter: this.newsletterForm.value.notify_weekly_newsletter ? true : false})
    this.api.createOrUpdatNewsletter(this.newsletterForm.value).subscribe(
      data => this.tokenService.saveUser(data),
      err => console.error(err)
    )
  }

}
