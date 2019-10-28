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
  test: any;
  uploadedImage: File;
  fileName: any;
  selectedFile: any;
  profileUrl: Observable<string | null>;
  constructor(private storage: AngularFireStorage) {}
  async fetchFile(name: string) {
    const fileRef = this.storage.ref("bobthemagichorseman.jpg");
    // let test = fileRef.getDownloadURL().subscribe(doc => console.log(doc));
    let test = fileRef.getDownloadURL().subscribe(doc => this.test = doc);
    console.log('FETCHRESULT', test);
    console.log('FETCHRESULT THIS.TEST', this.test);
  }
  async uploadFile(event) {
    console.log("EVENT", event, event.target.files);
    const file = event.target.files[0];
    const filePath = file.name;
    // const fileRef = this.storage.ref(filePath);
    const fileRef = this.storage.ref("bobthemagichorseman.jpg");
    // const test = fileRef.child('bobthemagichorseman.jpg').getDownloadURL();
    const test = fileRef.getDownloadURL().subscribe();
    // const task = await this.storage.upload(filePath, file);
    const ref = this.storage.ref("bobthemagichorseman.jpg");
    this.profileUrl = ref.getDownloadURL();

    // this.uploadPercent = task.percentageChanges();
    // console.log(this.uploadPercent);
    // // get notified when the download URL is available
    // task
    //   .snapshotChanges()
    //   .pipe(finalize(() => (this.downloadURL = fileRef.getDownloadURL())))
    //   .subscribe();

    // .then(async res => await res.ref.getDownloadURL());
    // const downloadURL = await task.ref.getDownloadURL();

    console.log(this.downloadURL);
    console.log("TEST", this.profileUrl);

    //   const images = this.storage.child('companyImages');
    //   const image = images.child('image1');
    //   image.getDownloadURL().then((url) => { this.setState({ img: url }));

    // const url = await this.storage
    //   .upload(filePath, file)
    //   .then(async res => await res.ref.getDownloadURL());
    // if (url.includes("jpg")) {
    //   let first = url.split(".jpg", 1);
    //   let second = url.split(".jpg", 2).splice(1);
    //   this.plant.imageUrl =
    //     first.toString() + "_400x400.jpg" + second.toString();
    //   this.plantService.update(this.plantId, this.plant);
    //   this.ngOnInit();
    // }
    // if (url.includes("png")) {
    //   let first = url.split(".png", 1);
    //   let second = url.split(".png", 2).splice(1);
    //   this.plant.imageUrl =
    //     first.toString() + "_400x400.png" + second.toString();
    //   this.plantService.update(this.plantId, this.plant);
    //   this.ngOnInit();
    // }

    // console.log('TASK', task);
    // console.log('DOWNLOAD', downloadURL)
    // this.uploadPercent = task.percentageChanges();
  }
}
