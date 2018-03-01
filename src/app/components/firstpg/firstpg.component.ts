import { Component, OnInit, AfterContentInit, OnChanges} from '@angular/core';

@Component({
  selector: 'app-firstpg',
  templateUrl: './firstpg.component.html',
  styleUrls: ['./firstpg.component.css'],

})
export class FirstpgComponent implements OnInit, AfterContentInit {




  constructor() { }

  ngOnInit() {
    console.log('ngRan...');

  }


  ngAfterContentInit() {
    console.log('Run After');

  }


}





