import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  image: any;
  test: any;
  test2: any;
  constructor(private storageService: StorageService) { }
  uploadFile(event) {
    this.storageService.uploadImage(event);
  }
  async downloadFile(){
    this.image = await this.storageService.fetchFile('thumb@128_Capture.PNG');
    console.log('image', this.image)
  }
  ngOnInit() {
  }

}
