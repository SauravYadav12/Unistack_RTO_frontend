import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute  } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerForm : FormGroup;
  id : string;
  isAddMode: boolean;
  custId: string;
  recordNum: Number;
  recordData: any;

  constructor(private formBuilder:FormBuilder,
              private toastr:ToastrService,
              private route: ActivatedRoute,
              private router: Router,
              private customerService:CustomerService) {

                this.id = this.route.snapshot.params.id;
                this.isAddMode = !this.id;
               }

  ngOnInit(): void {

    this.customerForm = this.formBuilder.group({
      custId:[''],
      vehicleNo:['',Validators.required],
      buyerCellNo:['', Validators.required],
      sellerCellNo:['', Validators.required],
      rtoName:[''],
      senderName:[''],
      senderCellNo:[''],
      branchDistrict:[''],
      totalTax:[''],
      totalFee:[''],
      HPA:[''],
      HPT:[''],
      DRC:[''],
      FC:[''],
      permit:[''],
      FAR36No:['']
    });

    if(this.isAddMode){
      this.customerService.getAllRecords().subscribe(data=>{
        this.recordNum = data.recordnum;
      })
    }
    if (!this.isAddMode) {
      this.customerService.view(this.id)
          .pipe(first())
          .subscribe((data) => {
            this.recordData = data.record
            this.customerForm.patchValue(this.recordData)
            console.log(this.recordData);
          });
    }
  }

  onSubmit() {

    if (this.isAddMode) {
      this.create();
    } else {
        this.update();
    }

    console.log(this.customerForm);
    
  }

  private create(){

    this.customerForm.get('custId').setValue(this.recordNum);

    if(this.customerForm.invalid){
      console.log(this.customerForm)
      this.toastr.error('Something went wrong, Please check the form & fill all Required Details.')
    }
    if(this.customerForm.valid){
      this.customerService.create(this.customerForm.value).subscribe({
        next: data =>{
          this.toastr.success(data.message);
          this.router.navigateByUrl('/dashboard/home');
        }
      })
    }

  }

  private update(){

    if(this.customerForm.invalid){
      console.log(this.customerForm)
      this.toastr.error('Something went wrong, Please check the form & fill all Required Details.')
    }

    if(this.customerForm.valid){
      this.customerService.update(this.id,this.customerForm.value).subscribe({
        next: data =>{
          this.toastr.success(data.message);
          this.router.navigateByUrl(`/dashboard/customer/view/${this.id}`);
        },
        error: err=>{
          this.toastr.error("Cannot update form, Please try again")
        }
      })
    }
  }

}
