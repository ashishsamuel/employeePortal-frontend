import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr:ToastrService) { }

  showSuccess(msg:string) {
    this.toastr.success('Success',msg);
  }
  showError(msg:string) {
    this.toastr.success('Error',msg);
  }
  showWarning(msg:string) {
    this.toastr.success('Warning', msg);
  }
}
