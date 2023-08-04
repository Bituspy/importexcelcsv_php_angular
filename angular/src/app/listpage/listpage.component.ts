import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { testserviceService } from '../testservice.service';



export interface Country {
  name: string;
  code: string;
}

const Countries_DATA: Country[] = [
  { name: 'Tunisia', code: 'TN' },
  { name: 'Tunisia', code: 'TN' },
  { name: 'Tunisia', code: 'TN' },
  { name: 'Tunisia', code: 'TN' },
];

@Component({
  selector: 'app-listpage',
  templateUrl: './listpage.component.html',
  styleUrls: ['./listpage.component.css'],
})
export class ListpageComponent implements OnInit {
  //UploadForm
  uploadform: any;
  //MAT Table DATA
  displayedColumns: string[] = ['name', 'code'];
  dataSource:any;

  ngOnInit(): void {
    this.getCountryData();
  }

  constructor(private fbuiler: FormBuilder,private ts:testserviceService) {
    this.uploadform = this.fbuiler.group({
      datafile: [null],
    });
  }


  getCountryData(){
    this.ts.getCountries().subscribe((data)=>{
      this.dataSource = data;
    },(error)=>{
      console.error("couldn't retreive data from DB.");
    })
  }
  uploadFile(event: any) {
    const file = event.target.files ? event.target.files[0] : '';
    this.uploadform.patchValue({
      datafile: file,
    });
    this.uploadform.get('datafile')?.updateValueAndValidity();
  }

  submitFile() {
    if (this.uploadform.value.datafile == null) {
      return;
    }
    this.ts.ImportDataFromExcel(this.uploadform.value.datafile).subscribe(
      (data) => {
    
        alert('uploaded');
      },
      (error) => {
        alert('failed');
      }
    );
  }
}
