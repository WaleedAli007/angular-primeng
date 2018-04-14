import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { DataService } from '../data.service';
import { PipeTransform, Pipe } from '@angular/core';


@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.css']
})
export class ReleaseComponent implements OnInit {
  private readonly pdfFonts: any;
  pdfMake: any;
constructor (private dataService: DataService, private cdRef:ChangeDetectorRef) {
  this.pdfMake = require('pdfmake/build/pdfmake.js');
  this.pdfFonts = require('pdfmake/build/vfs_fonts.js');
  this.pdfMake.vfs = this.pdfFonts.pdfMake.vfs;

  console.log(this.pdfMake)
}
uiTimestamp: Date = new Date();

  cols: any[];
  tabs: null;
  subTableCols: any[];

  ngOnInit() {
       this.dataService.getData().then((data:any) => {
        	this.tabs = data
        	this.cdRef.detectChanges()
        }).catch(error => {
        	console.log(error)
        })
        this.cols = [
            {field: 'environment', header: 'Environment'},
            {field: 'date', header: 'Date'},
            {field: 'release', header: 'Release Version'}
        ];

        this.subTableCols = [
            {field: 'server', header: 'Server'},
            {field: 'timestamp', header: 'Deployment Timestamp'},
            {field: 'release', header: 'Release Version'}
        ]
    }

  generatePDF(data) {
    let table = {
      content: [
        {
          // layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ '*', 'auto', 100, '*' ],

            body: []
          }
        }
      ]
    }
    console.log(data)
    let test = []
    for (var i = 0; i <= data.value.length - 1; i++) {
      let obj = data.value[i]
      test.push([[]])
      for (let key in obj) {
        if (Array.isArray(obj[key])) {
          let subObject = obj[key]
          // test[i].push({table: { body: []}})
          let subTable = { colSpan: 3, table: { body: [] } }
          for (let j = 0; j <= subObject.length - 1; j++) {
            subTable.table.body.push([])
            for (let subKey in subObject[j]) {
              // test[i][j].table.body.push(subObject[subKey])
              subTable.table.body[j].push(subObject[j][subKey])
            }
          }
          test[i][0].push(subTable)
        } else {
          test[i].push(obj[key]) 
        }
      }
    }
    table.content[0].table.body = test
    console.log(test)
    this.pdfMake.createPdf(table).open()
  }
}
