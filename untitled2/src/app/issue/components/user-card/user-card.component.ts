import {Component, Input, OnInit} from '@angular/core';
import {IUser} from "../../model/i.user";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() user: IUser | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
