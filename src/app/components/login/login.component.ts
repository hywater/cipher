import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GardenService } from '../../service/garden.service';
export interface account {
  name: string,
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  params: account = {
    name: '', password: ''
  };
  constructor(private router: Router, private gardenService: GardenService) { }

  ngOnInit() {
  }
  onSubmit() {
    if (!this.params.name) {
      alert('name is empty');
      return;
    }
    if (!this.params.password) {
      alert('password is empty');
      return;
    }
    this.gardenService.login(this.params).then(result => {
      if (result.code === 0) {
        this.router.navigate(['/']);
      } else {
        alert('login fail');
      }
    });
  }
}
