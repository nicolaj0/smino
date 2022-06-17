import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssueRoutingModule } from './issue-routing.module';
import { IssueTableComponent } from './components/issue-table/issue-table.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import {SminoIssuesService} from "./service/smino-issues.service";


@NgModule({
  declarations: [
    IssueTableComponent,
    UserCardComponent
  ],
  imports: [
    CommonModule,
    IssueRoutingModule
  ],
  providers:[SminoIssuesService]
})
export class IssueModule { }
