import { Component, OnInit,ElementRef,Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { CustomerService } from 'src/app/service/customer.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  customers=[];
  role: any
  public searchTerm: any;

  constructor(private customer:CustomerService,
              private el: ElementRef,
              private renderer:Renderer2,
              private authService:AuthService) {
               }

  ngOnInit(): void {

    this.customer.getAllRecords().subscribe(data=>{
      this.customers = data.record;
      
    });
  }


  Search(event) {
    this.searchTerm = event.target.value;
    if (this.searchTerm == "") {
      this.ngOnInit();
    } else {
      
      
      this.customers = this.customers.filter(res =>{
        return res.custId.toString().match(this.searchTerm)
          || res.vehicleNo.toString().toLowerCase().match(this.searchTerm.toLowerCase())
          || res.buyerCellNo.toString().match(this.searchTerm)
          || res.sellerCellNo.toString().match(this.searchTerm)
          || res.rtoName.toLowerCase().match(this.searchTerm.toLowerCase())
          || res.senderName.toLowerCase().match(this.searchTerm.toLowerCase());
      })
    }
  }


}
