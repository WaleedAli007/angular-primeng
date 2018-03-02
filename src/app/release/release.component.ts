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
constructor (private dataService: DataService, private cdRef:ChangeDetectorRef) {

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
}
