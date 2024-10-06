import { Component, OnInit } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 
import { MatDialog } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import axios from 'axios';
import { Socket } from 'ngx-socket-io';  // For WebSocket connection

import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-root',
  templateUrl: './contacts.component.html',standalone: true,
  styleUrl:  'contacts.component.css',
  imports: [MatButtonModule,ReactiveFormsModule,MatTableModule,MatCardModule,
    MatFormFieldModule,FormsModule,MatInputModule,MatPaginatorModule,MatPaginator],

})
export class ContactsComponent implements OnInit {

  contacts = [];
  name: string = '';
  phone:string ='';
  address:string = '';
  notes:string ='';
  constructor(
   
   
   
    public dialog: MatDialog

  ) {
  
  }
  //socket = new Socket({ url: 'http://localhost:4000' });
  displayedColumns: string[] = ['name', 'phone', 'address', 'notes', 'actions'];
  dataSource = new MatTableDataSource([]);
  pageSize = 5;
  totalContacts = 0;
 
  lockedContactId: string | null = null;



  ngOnInit() {
   this.fetchContacts();
    // Establish WebSocket connection after rendering
    setTimeout(() => {
      this.setupWebSocketConnection();
    }, 0);
  }
  
 // Add the correct event typing to the onPageChange method
 onPageChange(event: PageEvent) {
    this.fetchContacts(event.pageIndex);  // Use the pageIndex from PageEvent
  }
   // Handle form submission to add a new contact
   submit() {
   this.addContact();
  }


  setupWebSocketConnection() {
    //this.socket.fromEvent('contact-updated').subscribe((updatedContact: any) => {
      this.fetchContacts(); // Refresh contacts when updated via WebSocket
    //});
  }
  async fetchContacts(page: number = 0) {
    const response = await axios.get('http://localhost:4000/contacts', {
      params: { page: page + 1, limit: this.pageSize }
    });
    this.dataSource.data = response.data;
  }

  async addContact() {
    const response = await axios.post('http://localhost:4000/contacts', {
      name:this.name,
      phone:this.phone,
      address:this.address,
      notes:this.notes
    });
   alert("contact is added!")

  }
  lockContact(id: string) {
    //this.socket.emit('lockContact', id);
  }

  deleteContact(id: string) {
    if (confirm('Are you sure you want to delete this contact?')) {
      axios.delete(`http://localhost:4000/contacts/${id}`).then(() => this.fetchContacts());
    }
  }
}
