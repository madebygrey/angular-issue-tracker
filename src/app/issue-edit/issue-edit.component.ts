import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IssuesService } from '../issues.service';
import { Issue } from '../issue';

interface IssueEditForm {
  title: FormControl<string>;
  description: FormControl<string>;
  priority: FormControl<string>;
}

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.css']
})
export class IssueEditComponent implements OnInit {
  @Input() issue: Issue | null = null;
  @Output() formEditClose = new EventEmitter<boolean>();

  issueEditForm = new FormGroup<IssueEditForm>({
    title: new FormControl('', {nonNullable: true, validators: Validators.required}),
    description: new FormControl('', {nonNullable: true, validators: Validators.required}),
    priority: new FormControl('', {nonNullable: true}),
  });

  constructor(private issuesService: IssuesService) {}

  ngOnInit(): void {
    this.issueEditForm.controls.title.setValue(this.issue!.title);
    this.issueEditForm.controls.description.setValue(this.issue!.description);
    this.issueEditForm.controls.priority.setValue(this.issue!.priority);
  }

  editIssue() {
    if(this.issueEditForm && this.issueEditForm.invalid) {
      this.issueEditForm.markAllAsTouched();
      return;
    }

    this.issuesService.editIssue({...this.issue, ...this.issueEditForm.getRawValue()} as Issue);
    this.formEditClose.emit(true);
  }
}
