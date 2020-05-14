import { Component, Input, Output ,EventEmitter, OnChanges} from '@angular/core';
import { faStar, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnChanges {

  constructor() { }

  @Input() vote:number = 2
  @Output() voteChanged = new EventEmitter();

  icons:IconDefinition[]  = []
  faStar = faStar;
  faStarHalf = faStarHalfAlt;
  faStarEmpty = faStarEmpty;

  
  ngOnChanges(): void {
    this.icons = []
    for(var i =1; i<=5;i++){
      if(this.vote >=i){
        this.icons.push(this.faStar);
      }else if(this.vote >=(i-0.5)){
        this.icons.push(this.faStarHalf)
      }else{
        this.icons.push(this.faStarEmpty)
      }
    }
  }

}
