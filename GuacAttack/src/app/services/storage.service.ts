import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  uploadedImage: File;
  fileName: any;
  selectedFile: any;
  constructor(
    private storage: AngularFireStorage,
  ) {}
  async uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `tempFile${this.fileName}`;
    const fileRef = this.storage.ref(filePath);
    const task = await this.storage.upload(filePath, file).then(async res => await res.ref.getDownloadURL());
    console.log(task);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task
      .snapshotChanges()
      .pipe(finalize(() => (this.downloadURL = fileRef.getDownloadURL())))
      .subscribe(res => console.log(res));

      // if(task.includes("jpg")){
      //   let first = task.split(".jpg",1);
      //   let second = task.split(".jpg", 2).splice(1);
        // this.plant.imageUrl = first.toString() +"_400x400.jpg" + second.toString();
        // this.plantService.update(this.plantId, this.plant);
        // this.ngOnInit();
      // }
      // if(url.includes("png")){
      //   let first = url.split(".png",1);
      //   let second = url.split(".png", 2).splice(1);
        // this.plant.imageUrl = first.toString() +"_400x400.png" + second.toString();
        // this.plantService.update(this.plantId, this.plant);
        // this.ngOnInit();
      // }
  }

  // async  onUpload(){
  //   // upload image to firebase storage
  //    const file = this.selectedFile;
  //    const filePath = this.selectedFile.name;
  //    const url = await this.storage.upload(filePath, file).then(async res => await res.ref.getDownloadURL());
  //    if(url.includes("jpg")){
  //      let first = url.split(".jpg",1);
  //      let second = url.split(".jpg", 2).splice(1);
  //      this.plant.imageUrl = first.toString() +"_400x400.jpg" + second.toString();
  //      this.plantService.update(this.plantId, this.plant);
  //      this.ngOnInit();
  //    }
  //    if(url.includes("png")){
  //      let first = url.split(".png",1);
  //      let second = url.split(".png", 2).splice(1);
  //      this.plant.imageUrl = first.toString() +"_400x400.png" + second.toString();
  //      this.plantService.update(this.plantId, this.plant);
  //      this.ngOnInit();
  //    }
  //    // refresh page to load in images
  //  }
}
