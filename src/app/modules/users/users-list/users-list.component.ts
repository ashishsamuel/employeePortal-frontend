import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { UserModel } from '../users.model';
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit{

  p:number=1;
  allUsers:UserModel[]=[]
  searchKey:string = ""
  constructor(private api:UserApiService,private router:Router){}

  ngOnInit(): void {
    this.getallUsers()
  }

  getallUsers(){
    console.log("inside all users");

    this.api.getAllUsersApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allUsers = res
      },
      error:(err:any)=>{
        alert(err.message)
      }
    })
    
  }

  removeUser(id:any){
    this.api.deleteUserApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        alert("User removed successfully")
        this.getallUsers()
      },
      error:(err:any)=>{
        alert(err.message)
      }
    })
  }

  sortById(){
    this.allUsers.sort((a:any,b:any)=>a.id-b.id)
  }

  sortByName(){
    this.allUsers.sort((a:any,b:any)=>a.name.localeCompare(b.name))
  }

  generatePDF(){
    let pdf = new jspdf()
    let head = [['Id','Usename','Email','Status']]
    let body:any = [];

    this.allUsers.forEach((item:any)=>{
      body.push([item.id,item.name,item.email,item.active])
    })
    pdf.setFontSize(16)
    pdf.text("All Users List",10,10)
    autoTable(pdf,{head,body})
    pdf.output('dataurlnewwindow')
    pdf.save('alluserslist.pdf')
  }

  logOut(){
    localStorage.removeItem("admin_name")
    localStorage.removeItem("admin_pswd")
    this.router.navigateByUrl("")
  }
}
