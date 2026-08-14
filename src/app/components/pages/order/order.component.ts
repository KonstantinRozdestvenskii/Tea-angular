import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription, tap} from "rxjs";
import {OrderType} from "../../../types/order.type";
import {OrderService} from "../../../services/order.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  public orderForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern('^[А-Яа-яЁё]+')]],
    lastName: ['', [Validators.required, Validators.pattern('^[А-Яа-яЁё]+')]],
    phoneNumber: ['', [Validators.required, Validators.pattern('^\\+?\\d{11}$')]],
    country: ['', [Validators.required, Validators.pattern('^[А-Яа-яЁё]+')]],
    index: ['', [Validators.required, Validators.pattern('^[0-9]+')]],
    address: ['', [Validators.required, Validators.pattern('^[А-Яа-яЁё0-9\\s/-]+$')]],
    product: [{value: '', disabled: true}],
    comment: [''],
  });

  private paramsSubscription: Subscription | null = null;
  private createOrderSubscription: Subscription | null = null;
  public isBtnDisabled: boolean = false;
  public isOrderError: boolean = false;
  public showForm: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private http: HttpClient, private fb: FormBuilder, private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['product']) {
        this.orderForm.get('product')?.setValue(params['product']);
      } else {
        alert('Выберите чай')
        this.router.navigate(['/products']);
      }
    })
  }


  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.createOrderSubscription?.unsubscribe();
  }

  public createOrder(): void {
    const data: OrderType = {
      name: this.orderForm.get('firstName')?.value,
      last_name: this.orderForm.get('lastName')?.value,
      phone: this.orderForm.get('phoneNumber')?.value,
      country: this.orderForm.get('country')?.value,
      zip: this.orderForm.get('index')?.value,
      product: this.orderForm.get('product')?.value,
      address: this.orderForm.get('address')?.value,
      comment: this.orderForm.get('comment')?.value,
    }

    this.isBtnDisabled = true;
    this.isOrderError = false;
    this.showForm = true;
    this.createOrderSubscription = this.orderService.createOrder(data)
      .pipe(
        tap(() => {
          this.isBtnDisabled = false;
        })
      )
      .subscribe(response => {
        if (response.success && !response.message) {
          this.showForm = false;
        } else {
          this.isOrderError = true;
          setTimeout(() => {
            this.isOrderError = false;
          }, 3000)
        }
      })
  }


}
