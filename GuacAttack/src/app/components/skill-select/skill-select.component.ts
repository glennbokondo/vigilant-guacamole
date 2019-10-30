import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import * as skillList from '../mock-data/skills';

@Component({
  selector: 'app-skill-select',
  templateUrl: './skill-select.component.html',
  styleUrls: ['./skill-select.component.sass']
})
export class SkillSelectComponent implements OnInit {
  skills: any;
  localSelected: any;
  @Input() selected;
  @Input() item;
  @Output() onChange = new EventEmitter();
  ngOnInit() {
    this.skills = skillList.skills;
    
    if(!this.selected){
      return
    }
    this.localSelected = this.selected;
  }

}
