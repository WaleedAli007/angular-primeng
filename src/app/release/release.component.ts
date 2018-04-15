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
  data: null;
  subTableCols: any[];

  ngOnInit() {
       this.dataService.getData().then((data:any) => {
            // this.tabs = data
            this.data = data.results
            console.log(this.data)
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
      pageOrientation: 'landscape',
      content: [
        {text: data.project, style: 'header'},
        {text: this.uiTimestamp, style: 'subheader'},
        {
          // layout: 'lightHorizontalLines', // optional
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 2 : 1;
            },
            vLineWidth: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 2 : 1;
            },
            hLineColor: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
            },
            vLineColor: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
            },
            // paddingLeft: function(i, node) { return 4; },
            // paddingRight: function(i, node) { return 4; },
            // paddingTop: function(i, node) { return 2; },
            // paddingBottom: function(i, node) { return 2; },
            // fillColor: function (i, node) { return null; }
          },
          style: 'tableExample',
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            // widths: [ '*', 'auto', 100, '*' ],

            body: []
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black',
          fillColor: '#ddd'
        },
        subTableHeader: {
          bold: true,
          fontSize: 11,
          fillColor: '#ddd'
        }
      }
    }
    let test = [[]]
    let arrayToBeParsed = ''
    for (let key in data) {               //for the purpose of dynamically picking key of datatype array in data object
      if (Array.isArray(data[key])) {
        arrayToBeParsed = key
        console.log(arrayToBeParsed)
      }
    }
    for (let key in data[arrayToBeParsed][0]) {         // appending column/headers of parent table
      test[0].push({text: key, style: 'tableHeader', alignment: 'center'},)
    }
    for (var i = 0; i <= data[arrayToBeParsed].length - 1; i++) {              // parsing parent table
      let obj = data[arrayToBeParsed][i]
      test.push([])
      for (let key in obj) {
        if (Array.isArray(obj[key])) {
          let subObject = obj[key]
          let subTable = { 
            table: { body: [[]] },
            layout: {
              hLineWidth: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 2 : 1;
              },
              hLineColor: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
              },
              vLineColor: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
              },
            },
            style: 'tableExample'
          }
          
          for (let subKey in subObject[0]) {         // appending column/headers of nested table
            subTable.table.body[0].push({text: subKey, style: 'subTableHeader', alignment: 'center'},)
          }
          for (let j = 0; j <= subObject.length - 1; j++) {              // parsing nested table
            subTable.table.body.push([])
            for (let subKey in subObject[j]) {
              subObject[j][subKey].length ? subTable.table.body[j+1].push(subObject[j][subKey]) : subTable.table.body[j+1].push('-')
            }
          }
          test[i+1].push(subTable)
        } else {
          obj[key].length ? test[i+1].push(obj[key]) : test[i+1].push('-')
        }
      }
    }
    for (let index = 0; index < table.content.length; index++) {
      const element = table.content[index];
      if (element.hasOwnProperty('table')) {
        table.content[index].table.body = test
      }
      
    }
    // table.content[0].table.body = test
    this.pdfMake.createPdf(table).download(data.project)
  }
}
