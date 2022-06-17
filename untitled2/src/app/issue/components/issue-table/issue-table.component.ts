import {Component, OnInit} from '@angular/core';
import {Issue} from "../../model/issue";
import {SminoIssuesService} from "../../service/smino-issues.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-issue-table',
  templateUrl: './issue-table.component.html',
  styleUrls: ['./issue-table.component.css']
})
export class IssueTableComponent implements OnInit {
  public dataSource: Issue[] | undefined;
  public issues$: Observable<any> | undefined;


  constructor(private sminoIssuesService: SminoIssuesService,
  ) {
  }

  ngOnInit(): void {
    // handle pagination by subscribing to event and using rxjs
    this.issues$ = this.sminoIssuesService.getIssues(1,'id')
  }


/*  onPageChange(event: any): void {
    //this.issues$ = this.sminoIssuesService.getIssues(event,'id')
  }


  onSort(event: any): void {
    this.issues$ = this.sminoIssuesService.getIssues(1,event)
  }*/
}
