import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from '../user-api.service';
import { UserModel } from '../users.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{
  user:UserModel = {}

  constructor(private route:ActivatedRoute,private api:UserApiService,private router:Router){}

  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      console.log(res);
      const {id} = res

      // api call to get details of id 
      this.getExistingUser(id)
      
    })
  }

  getExistingUser(id:any){
    this.api.viewUserApi(id).subscribe((res:any)=>{
      // console.log(res);
      this.user = res;
      
    })
  }

  // edituser 
  editUser(id:any){
    this.api.updateUserApi(id,this.user).subscribe({
      next:(res:any)=>{
        console.log(res);
        alert("User updated successfully")
        this.router.navigateByUrl('/users')
        
      },
      error:(err:any)=>{
        alert(err.console.error()
        )
      }
    })
  }

  cancel(id:any){
    this.getExistingUser(id)
  }

  logOut(){
    localStorage.removeItem("admin_name")
    localStorage.removeItem("admin_pswd")
    this.router.navigateByUrl("")
  }

}
