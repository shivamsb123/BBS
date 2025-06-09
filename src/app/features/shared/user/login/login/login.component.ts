import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { trigger, transition, animate, style } from '@angular/animations';
import { UserService } from '../../services/user.service';
import { TokenService } from 'src/app/features/http-services/token.service';
import { AuthService } from 'src/app/features/http-services/auth-gaurd.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/features/http-services/notification.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 })),
      ]),
      transition('* => void', [
        style({ opacity: 1 }),
        animate('1000ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class LoginComponent {
  registerForm!: FormGroup;
  submitted: boolean = false;
  current = 0;

  img_list = [
    '../../../../../../assets/images/bhuvneshwar-eletric.jpeg',
    '../../../../../../assets/images/bhuvneshwar-eletric-2.jpeg',
    '../../../../../../assets/images/bhuvneshwar-eletric-3.jpg',
    '../../../../../../assets/images/bhuvneshwar-eletric-4.jpg',
  ];
  isloading: boolean = true;
  constructor(
    private _fb: FormBuilder,
    private userService: UserService,
    private tokenService: TokenService,
    private _auth: AuthService,
    private router: Router,
    private NotificationService: NotificationService
  ) { }
  toggleStyle: boolean = false;
  isLoading = false;

  toggleMessage() {
    console.log(this.toggleStyle);
    this.toggleStyle = !this.toggleStyle;
  }
  ngOnInit(): void {

    setTimeout(() => {
      this.isloading = false;
    }, 200);
    if (this._auth.isLoggedIn()) {
      this.router.navigate(['Dashboard/DashboardDMS']);
    }
    this.setFormValue();

    setInterval(() => {
      this.current = ++this.current % this.img_list.length;
    }, 2000);
  }
  /**
   *  register form controls
   */
  get f() {
    return this.registerForm.controls;
  }

  /**
   * set Form value
   */
  setFormValue() {
    this.registerForm = new FormGroup(
      {
        username: new FormControl(
          '',
          Validators.compose([Validators.required])
        ),
        password: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.minLength(3)])
        ),
      },
      {}
    );
  }
  onSubmit(formValue: any) {
    this.isLoading = true;
    this.submitted = true;

    this.tokenService.generateToken(formValue.username, formValue.password)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (res: any) => {
          if (res.body?.flag == '1') {
            const role = res.body.data.role;
            if (role == 151) {
              this.router.navigateByUrl('vendordashboard/homepage');
            } else {
              window.location.href = 'Dashboard/DashboardDMS';
            }
          }
        },
        error: () => this.NotificationService.showError('Login failed. Please try again.')
      });

  }
}
