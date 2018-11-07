import { Component, OnInit, Inject } from '@angular/core';
import { GardenService } from '../../service/garden.service';
export interface user {
  title: string,
  email: string,
  phoneNumber: string,
  userName: string,
  password: string,
  memo: string
}
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

let getUrlParameter = function (name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let r = window.location.search.substr(1).match(reg);
  if (r !== null) return decodeURI(r[2]);
  return null;
}
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  params: user = {
    title: '', email: '', phoneNumber: '', userName: '', password: '', memo: ''
  };
  isEdit = false;
  constructor(private gardenService: GardenService) {
  }

  ngOnInit() {
    if (getUrlParameter('type') == 'edit') {
      this.isEdit = true;
      this.gardenService.queryItemById(getUrlParameter('id')).then(result => {
        if (result.data && result.data.length) {
          this.params = result.data[0];
        }
      });
    }
  }
  onSubmit() {
    if (!this.params.title) {
      alert('title is empty');
      return;
    }
    if (this.isEdit){
      this.gardenService.updateItem(this.params).then(function (result: any) {
        if (result.code === 0) {
          alert('success!!!');
        } else {
          alert(result.msg);
        }
      });
    }else{
      this.gardenService.saveItem(this.params).then(function (result: any) {
        if (result.code === 0) {
          alert('success!!!');
        } else {
          alert(result.msg);
        }
      });
    }
  }
  
  removeItem(): void {
    if (confirm('confirm remove - ' + this.params.title)) {
      this.gardenService.removeItem(this.params).then(result => {
        alert('success!!!');
        window.location.href = '/';
      })
    }
  }
}