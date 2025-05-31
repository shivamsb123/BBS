import { Component, OnInit } from '@angular/core';
import { StockService } from '../../../services/stock.service';

@Component({
  selector: 'add-apo-entry',
  templateUrl: './add-apo-entry.component.html',
  styleUrls: ['./add-apo-entry.component.scss']
})
export class AddApoEntryComponent implements OnInit{
  barcodeData: any;

  constructor(
    private stockService: StockService
  ) {}
  ngOnInit(): void {
    
  }



}
