import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  cols: any[];
  subTableCols: any[];
  tableRows: any[] = [
  	{
  		source: 'PROJECT A',
  		date: '2018-10-4',
  		release: '5.21',
  		subTableRows: [
	  		{
	  			server: 'Server 10',
	  			timestamp: '2017-10-15',
	  			release: '2.21'
	  		},
	  		{
	  			server: 'Server 3',
	  			timestamp: '2017-10-16',
	  			release: '2.21'
	  		},
	  		{
	  			server: 'Server 4',
	  			timestamp: null,
	  			release: null
	  		},
  		]
  	},
  	{
  		source: 'PROJECT B',
  		date: '2018-10-4',
  		release: '5.21',
  		subTableRows: [
	  		{
	  			server: 'Server B10',
	  			timestamp: '2017-10-15',
	  			release: '2.21'
	  		},
	  		{
	  			server: 'Server B3',
	  			timestamp: '2017-10-16',
	  			release: '2.21'
	  		},
	  		{
	  			server: 'Server 4',
	  			timestamp: '',
	  			release: ''
	  		},
  		]
  	},
  	{
  		source: 'PROJECT C',
  		date: '2018-10-4',
  		release: '5.21',
  		subTableRows: [
	  		{
	  			server: 'Server C10',
	  			timestamp: '2017-10-15',
	  			release: '2.21'
	  		},
	  		{
	  			server: 'Server C3',
	  			timestamp: '2017-10-16',
	  			release: '2.21'
	  		},
	  		{
	  			server: 'Server 4',
	  			timestamp: '',
	  			release: ''
	  		},
  		]
  	},
  	{
  		source: 'PROJECT D',
  		date: '2018-10-4',
  		release: '5.21',
  		subTableRows: [
	  		{
	  			server: 'Server D10',
	  			timestamp: '2017-10-15',
	  			release: '2.21'
	  		},
	  		{
	  			server: 'Server D3',
	  			timestamp: '2017-10-16',
	  			release: '2.21'
	  		},
	  		{
	  			server: 'Server 4',
	  			timestamp: '',
	  			release: ''
	  		},
  		]
  	},
  	{
  		source: 'PROJECT E',
  		date: '2018-10-4',
  		release: '5.21',
  		subTableRows: [
	  		{
	  			server: 'Server E10',
	  			timestamp: '2017-10-15',
	  			release: '2.21'
	  		},
	  		{
	  			server: 'Server E3',
	  			timestamp: '2017-10-16',
	  			release: '2.21'
	  		},
	  		{
	  			server: 'Server 4',
	  			timestamp: '',
	  			release: ''
	  		},
  		]
  	}
  ]
   ngOnInit() {
        
        this.cols = [
            {field: 'server', header: 'Source'},
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
