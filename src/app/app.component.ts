import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Contacts } from 'src/models/Contact.model';
import { Observable, tap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  http=inject(HttpClient);

  ContactForms=new FormGroup({
   name :new FormControl<string>(''),
   email:new FormControl<string | null>(null),
   phoneNumber:new FormControl<string>(''),
   favorite:new FormControl<boolean>(false)
  })

 contacts$=this.getContacts();
 onFormSubmit()
 {
  debugger
  const addcontatRequest={
name:this.ContactForms.value.name,
phonenumber:this.ContactForms.value.phoneNumber,
email:this.ContactForms.value.email,
favorite:this.ContactForms.value.favorite,
  }

  this.http.post('https://localhost:7289/api/Contact',addcontatRequest)
  .subscribe({
    next:(value)=>{
      console.log(value);
      this.contacts$=this.getContacts();
      this.ContactForms.reset();
    }
  })
 }
 onDelete(id:string){
this.http.delete(`https://localhost:7289/api/Contact/${id}`)
.subscribe({
  next:(value)=>{
alert('Item deleted');
  this.contacts$=this.getContacts();
  }
})
 }
  private getContacts(): Observable<Contacts[]>
  {
    return this.http.get<Contacts[]>('https://localhost:7289/api/Contact').pipe(
      tap((response: any) => console.log('Contacts API Response:', response))
    ); 
  }
}
