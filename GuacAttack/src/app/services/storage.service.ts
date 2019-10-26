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
    console.log(event, event.target.files);
    const file = event.target.files[0];
    const filePath = file.name;
    const fileRef = this.storage.ref(filePath);
    const task = await this.storage.upload(filePath, file)
    .then(async res => await res.ref.getDownloadURL());
    console.log('TASK', task);
    // this.uploadPercent = task.percentageChanges();
  }
}
