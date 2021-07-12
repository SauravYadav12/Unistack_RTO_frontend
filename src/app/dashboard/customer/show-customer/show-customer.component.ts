import { Component, OnInit} from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-show-customer',
  templateUrl: './show-customer.component.html',
  styleUrls: ['./show-customer.component.css']
})
export class ShowCustomerComponent implements OnInit {

  showModal: boolean;
  role : String;
  recordData: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private customerService: CustomerService,
              private toastr: ToastrService,
              private authService:AuthService) {
               
              }

  ngOnInit(): void {
    this.customerService.view(this.route.snapshot.params.id).subscribe({
      next: data =>{
        this.recordData = data.record;
      },
      error: err =>{
        this.toastr.error("Cannot fetch record details");
      }
    })

    
  }

  openModal(event){
    this.showModal = true;
  }

  closeModal(event){
    this.showModal = false;
  }

  onDelete(){
    console.log(this.recordData);
    this.customerService.delete(this.route.snapshot.params.id,this.recordData).subscribe({
      next:()=>{
        this.toastr.success('Record Deleted Successfully');
        this.router.navigateByUrl('/dashboard/home')
      },
      error: ()=>{
        this.toastr.error('Unable to Delete Record');
      }
    })
    
  }

}
