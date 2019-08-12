import {Component, OnInit, ViewChild} from '@angular/core';
import {RestAPIService} from '../services/rest-api.service';
import {Note} from '../model/note.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})

export class ControlsComponent implements OnInit {
  @ViewChild('f', { static: false }) signupForm: NgForm;

  viewClicked = false;
  addClicked = false;
  listOfTodos: Note[] = [];
  submitted = false;
  secondaryAddClicked = false;

  note: Note;

  constructor(private restAPIService: RestAPIService) { }

  ngOnInit() {
    this.fetchExistingTodos();
  }

  onViewTodos() {
    this.viewClicked = !this.viewClicked;
  }

  onAddNote() {
    this.addClicked = true;
    this.secondaryAddClicked = true;
  }

  hideSecondaryAddButton() {
    this.secondaryAddClicked = !this.secondaryAddClicked;
  }

  onHideNote() {
    this.addClicked = false;
    this.secondaryAddClicked = false;
  }

  fetchExistingTodos() {
    this.restAPIService.fetchData('Pete').subscribe( data => {
      this.listOfTodos = data;
      console.log(data);
      });
  }

  addTodoNote(note: Note) {
    this.restAPIService.addData(note).subscribe( responseData => {
      console.log('The response is: ', responseData );
      this.fetchExistingTodos();
      this.signupForm.reset();
    });
  }

  deleteTodoNote(index: bigint) {
    this.restAPIService.deleteData(index).subscribe( responseData => {
      console.log('The response is: ', responseData );
      this.fetchExistingTodos();
      // or maybe more efficient is to update the local variable rather than fetching from the server again - I'm lazy
    });
  }

  updateTodoNote(index: number) {
    // console.log('On Update of the following record: ', this.listOfTodos[index]);
    // console.log('##################################');
    // for (const listOfTodo of this.listOfTodos) {
    //   console.log (listOfTodo);
    // }
    // console.log('##################################');
    //bla bla bla
    console.log('b4 update: ' + this.listOfTodos[index].done);
    this.listOfTodos[index].done = !this.listOfTodos[index].done;
    console.log('after update: ' + this.listOfTodos[index].done);
    this.restAPIService.updateData(this.listOfTodos[index]).subscribe( responseData => {
      console.log('The response is: ', responseData );
      // this.fetchExistingTodos();
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.signupForm.value.Note);
    this.addTodoNote(this.signupForm.value.Note);
  }
}
