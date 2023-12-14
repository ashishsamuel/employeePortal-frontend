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
    this.toastr.error('Error',msg);
  }
  showWarning(msg:string) {
    this.toastr.warning('Warning', msg);
  }
}
