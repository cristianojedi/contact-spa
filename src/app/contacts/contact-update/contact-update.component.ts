import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { Contact } from "../../contacts/models/contact";
import { ContactService } from "../../services/contact.service";

@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.css']
})
export class ContactUpdateComponent implements OnInit {
  updateContactForm: FormGroup;

  public contact: Contact;
  public errors: any[] = [];

  constructor(
    private contactService: ContactService,
    private router: Router
  ) { }

  ngOnInit() {
    this.updateContactForm = new FormGroup({
      name: new FormControl('', { validators: [Validators.required] })
      // email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      // password: new FormControl('', { validators: [Validators.required] })
    });
  }

}
