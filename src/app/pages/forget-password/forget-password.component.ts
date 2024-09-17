import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule,FormControl, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserService} from "../../shared/service/user.service";
import {CommonModule} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forget-password',
  standalone: true,
    imports: [
        FormsModule,  
        CommonModule,
        ReactiveFormsModule,
        TranslateModule
    ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  formForgetPassword: FormGroup;
  step1: boolean = true;
  step2: boolean = false;
  myCode: string = '';
  recent_email: string = '';
  otpControl = new FormControl('', Validators.required); 

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private translate: TranslateService,
    private toastService: ToastrService
  ) {
    this.translate.setDefaultLang('fr');
    this.formForgetPassword = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async forgetPassword2() {
    if (this.step2) {
        let data = {
            email: this.recent_email,  // Assurez-vous que cette variable est correctement définie
            otp: this.otpControl.value,
            newPassword: this.formForgetPassword.value.password
        };

        console.log('Sending data:', data); // Pour vérifier les données envoyées

        try {
            const response = await this.userService.forgetPasswordSecondStep(data);
            if (response) {
                console.log(response);
                this.toastService.success('Password reset successful!', 'Congratulations!');
                this.router.navigate(['/login']);
            }
        } catch (error) {
            console.error('Error in forgetPassword2:', error);
            this.toastService.error('Invalid OTP or other error.', 'Error');
        }
    }
}

  async forgetPassword() {
    if (this.step1) {
      this.recent_email = this.formForgetPassword.value.email; // Stockez l'email ici
      let data = { email: this.recent_email };

      try {
        const response = await this.userService.forgetPasswordFirstStep(data);

        if (response) {
          this.toastService.success('Code sent successfully!', 'Congratulations!');
          this.step1 = false;
          this.step2 = true;
        }
      } catch (error) {
        console.error('Error in forgetPassword:', error);
        this.toastService.error('Email not found.', 'Error');
      }
    }
  }
}