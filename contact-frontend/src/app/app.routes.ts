import { Routes } from '@angular/router';
import { ContactsComponent } from './contacts.component';  // Import your Contacts component
import { LoginComponent } from './login.component';  // Import your Login component

export const routes: Routes = [
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },  // Default route redirects to contacts
  { path: 'contacts', component: ContactsComponent },  // Route for the Contacts page
  { path: 'login', component: LoginComponent },  // Route for the Login page
  { path: '**', redirectTo: 'login' }  // Wildcard route for handling unknown paths
];
