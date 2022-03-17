import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  contactForm = this._fb.group({
    firstName:['', [Validators.required, Validators.minLength(3)]],
    userName:['',Validators.required],
    city:['',Validators.required],
    state:['',Validators.required],
    zip:['', [Validators.required,Validators.maxLength(5), Validators.minLength(5)]],
    email: ['',[Validators.required, Validators.pattern(this.emailRegex)]]
  })

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit():void {
    console.log('Form submitted', this.contactForm.value);
  }

  onSetDefault():void {
    const contact = {
      firstName: 'Pedro',
      userName: 'prisquez',
      city: 'Dos Hermanas',
      state: 'Sevilla',
      zip: '41702',
      email: 'prisquez@gmail.com'
    };

    this.contactForm.setValue(contact);
  }

  showFieldError(formField: string):boolean | undefined{
    const field = this.contactForm.get(formField);
    return (field?.invalid && (field?.touched || field?.dirty))

  }

  onPatch():void {
    this.contactForm.patchValue({city: 'Madrid'});
  }

  onSetValue():void {
    this.contactForm.setValue({firstName: 'DominiCode'});
  }

  onReset():void {
    this.contactForm.reset();
  }

}
