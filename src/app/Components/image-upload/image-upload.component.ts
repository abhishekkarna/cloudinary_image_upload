import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UploadService } from 'src/app/Services/upload.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  public imageForm: FormGroup = new FormGroup({
    image: new FormControl("", Validators.required)
  })
  constructor(private uploadService: UploadService) { }
  fileToUpload: File = null;
  imageUrl: string = null
  result: Object = {}

  public imageUpload() {
    event.preventDefault()
    if (this.imageForm.invalid) return
    const formData = new FormData();

    formData.append("file", this.fileToUpload);
    formData.append("upload_preset", "w50qqfhf");

    this.uploadService.uploadToCloudinary(formData)
      .pipe(
        map(r => this.imageUrl = r['secure_url'])
      )
      .subscribe(res => this.result = res)
  }

  public handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  ngOnInit() {
  }

}
