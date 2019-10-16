import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { Ng2ImgMaxService } from "ng2-img-max";
import { Ng2ImgToolsService } from "ng2-img-tools";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  uploadedImage: File;
  fileName: any;
  constructor(
    private storage: AngularFireStorage,
    private ng2ImgMax: Ng2ImgMaxService,
    private ng2ImgToolsService: Ng2ImgToolsService
  ) {}
  uploadFile(event) {
    let file = event.target.files[0];
    console.log(file);
    this.fileName = file.name;
    this.ng2ImgToolsService.resize([file], 50, 50).subscribe(
      result => {
        this.uploadedImage = new File([result], result.name);
      },
      error => {
        console.log("😢 Oh no!", error);
      }
    );
    const filePath = `tempFile${this.fileName}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task
      .snapshotChanges()
      .pipe(finalize(() => (this.downloadURL = fileRef.getDownloadURL())))
      .subscribe();
  }
}
