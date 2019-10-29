import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { take, map, first } from "rxjs/operators";
import { Observable } from "rxjs";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: "root"
})
export class StorageService {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  test: any;
  url3: any;
  uploadedImage: File;
  fileName: any;
  selectedFile: any;
  profileUrl: Observable<string | null>;
  constructor(private storage: AngularFireStorage, private authService: AuthService) { }

  async fetchFile(name: string) {
    const fileRef = this.storage.ref(name);
    let test = fileRef.getDownloadURL();

    test.subscribe(url => {
      if (url) {
        this.test = url;
        this.url3 = url;
        console.log('FETCHRESULT THIS.TEST', this.test);
        console.log('FETCHRESULT THIS.URL3', this.url3);
        this.foobar(name, this.url3);
      } else {
        console.log('Could not find downloadURL');
      }
    })
    return this.url3;
  }
  async foobar(fileName: string, input: any) {
    console.log('foobar input', fileName, input);
    const user = await this.authService.findMe();
    if (fileName.includes('64')) {
      await this.authService.foo(user, { thumb64URL: input });
    } else if (fileName.includes('128')) {
      await this.authService.foo(user, { thumb128URL: input });
    } else if (fileName.includes('256')) {
      await this.authService.foo(user, { thumb256URL: input });
    } else {
      console.log('fileName does not contain supported sizes (64, 128, 256)');
    }
  }
  async uploadImage(event) {
    const file = event.target.files[0];
    const filePath = file.name
    await this.storage.upload(filePath, file);
    await this.setUserThumbNails(filePath);
  }

  async setUserThumbNails(path: string) {
    console.log('PATH', path);
    await this.fetchFile(path);
    const user = await this.authService.findMe();
    const res = await this.authService.foo(user, { photoURL: path, thumb64Path: `thumb@64_${path}`, thumb128Path: `thumb@128_${path}`, thumb256Path: `thumb@256_${path}` });
    console.log(res);
    // console.log('URLS: ', url64, url128, url256);
    const user2 = await this.authService.findMe();
    console.log('SET THUMBS', user2, this.url3);
    await this.fetchFile('thumb@128_Capture.PNG');
  }
}

// const data = {
//   uid: user.uid,
//   email: user.email,
//   displayName: user.displayName,
//   photoURL: user.photoURL,
//   name: {
//     first: user.name.first,
//     last: user.name.last
//   },
//   bio: user.bio,
// };