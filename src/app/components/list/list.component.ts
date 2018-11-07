import { Component, OnInit } from '@angular/core';
import { GardenService } from '../../service/garden.service';
import { Router } from '@angular/router';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  title = 'cipher';
  queryTitle = '';
  dataSource = [];

  constructor(private router:Router, private gardenService: GardenService) {

  }
  ngOnInit() {

  }
  setTempId(arr): Array<any> {
    let index = 1;
    arr.forEach(element => {
      element.tempId = index++;
    });
    return arr;
  }
  onQuery(): void {
    if (this.queryTitle) {
      this.gardenService.queryItemByTitle(this.queryTitle).then(result => {
        if (result.data) {
          this.dataSource = this.setTempId(result.data);
        }
      })
      return;
    }
    this.gardenService.queryAll().then(result => {
      if (result.data) {
        this.dataSource = this.setTempId(result.data);
      }
    });
  }
  editItem(item): void {
    window.location.href = '/edit?type=edit&id=' + item._id;
  }
  onLogout(): void {
    document.cookie = "sessionId=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    this.router.navigate(['/login']);
  }
  // removeItem(element): void {
  //   if (confirm('confirm remove - ' + element.title)) {
  //     this.gardenService.removeItem(element).then(result => {
  //       this.onQuery();
  //       alert('success!!!');
  //     })
  //   }
  // }
}
