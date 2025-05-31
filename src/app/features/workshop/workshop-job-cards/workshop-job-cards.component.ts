import { Location, formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/features/http-services/shared.service';
import { StockService } from 'src/app/features/stock-inventory/services/stock.service';
import { ManagementService } from 'src/app/features/management/services/management.service';
import { ScrollService } from 'src/app/features/http-services/scroll.service';
import { MaintenanceService } from '../../maintenance/services/maintenance.service';
import { WorkshopService } from '../services/workshop.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-workshop-job-cards',
  templateUrl: './workshop-job-cards.component.html',
  styleUrls: ['./workshop-job-cards.component.scss']
})
export class WorkshopJobCardsComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes: any = [25, 50, 100];
  tableData: any;
  jobData: any;
  jobId: any;
  jobForm!: FormGroup
  addJobForm!: FormGroup
  vehicleData: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  hstep = 1;
  mstep = 1;
  isMeridian = false;
  selectedValue: any;
  partdescription: any;
  selectedComplaintValue: any;
  selectedpartValue: any;
  selectedInspection: any
  selectedMechanic: any
  button: any = 'Add'
  ComplaintTypeList: any;
  selectedIncharge: any
  alertMesage: string = 'Added';
  mechanicList: any;
  itemType: any;
  inspectionList: any;
  itemData: any[] = [];
  childDetail: any
  mechanicId: any;
  InspectionImCode: any;
  SuccessMessage: any = 'Created';
  jobCardData: any;
  jobCardChildList: any;
  vechicleId: any;
  inspectionChildList: any;
  selectedInspectionCategory: any
  tableData2: any;
  isSelectedAll: boolean;
  isSelected: boolean = false
  checkedList: any[] = [];
  filteredArray: any;
  inspectionIdData: any;
  indexData: any;
  mechanicNameValue: any;
  mechanicIdvalue: any;
  indexValue: any;
  getPassInList: any;
  vehicleId: any;
  vehicleValue: any;
  serviceTypeId: any;

  constructor(
    private stockService: StockService,
    private fb: FormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private MaintenanceService: MaintenanceService,
    private workshopService: WorkshopService,
    private managementService: ManagementService,
    private scrollService: ScrollService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.jobId = this.activatedRoute.snapshot.paramMap.get("id")
    if (this.jobId) {
      this.jobCardData = this.location?.getState()
      console.log("this.jobCardData", this.jobCardData);
      setTimeout(() => {
        this.updateJobCard()
        // this.getJobChildList()
      }, 1000);
    }
    this.setInitialValue()
    this.initialTable();
    // this.getJobcardList();
    this.getVehicleZoneData();
    // this.getComplaintType()
    this.getPartDescription();
    this.getMechanicList()
    this.getInspectionData()
    let data = JSON.parse(localStorage.getItem('jobCard'));
    // let jobChild = JSON.parse(localStorage.getItem('jobchild'));
    if (data) {
      this.checkedList = data;
      console.log(this.checkedList);

      // this.childDetail = jobChild;
    }

  }

  setInitialValue() {
    this.jobForm = this.fb.group({
      serialNo: ['', [Validators.required, Validators.pattern('')]],
      vehicleNo: ['', [Validators.required, Validators.pattern('')]],
      employee: ['', [Validators.required, Validators.pattern('')]],
      odometer: ['', [Validators.required, Validators.pattern('')]],
      // date: [new Date(), [Validators.required, Validators.pattern('')]],
      // shift: ['', [Validators.required, Validators.pattern('')]],
      scheduledTime: [new Date(), [Validators.required, Validators.pattern('')]],
      deliveryTime: [new Date(), [Validators.required, Validators.pattern('')]],
      remarks: ['', [Validators.required, Validators.pattern('')]],
      serviceType: ['', [Validators.required, Validators.pattern('')]],
      // complaintType: ['', [Validators.required, Validators.pattern('')]],
      // natureOFCompanit: ['', [Validators.required, Validators.pattern('')]],
      // actionTaken: ['', [Validators.required, Validators.pattern('')]],
      // StoreIncharege: ['', [Validators.required, Validators.pattern('')]],
      // mechinicalName: ['', [Validators.required, Validators.pattern('')]],
      // inchargeName: ['', [Validators.required, Validators.pattern('')]],
      // partDes: ['', [Validators.required, Validators.pattern('')]],
      // partNo: ['', [Validators.required, Validators.pattern('')]],
      // unit: ['', [Validators.required, Validators.pattern('')]],
      // noOfQuality: ['', [Validators.required, Validators.pattern('')]],
      // amount: ['', [Validators.required, Validators.pattern('')]],
      // status: ['1', [Validators.required, Validators.pattern('')]],

    })

    this.addJobForm = this.fb.group({
      inspection: ['', [Validators.required, Validators.pattern('')]],
      inspection_category: ['', [Validators.required, Validators.pattern('')]],
      mechanic: ['', [Validators.required, Validators.pattern('')]],
      // customer_notes: ['', [Validators.required, Validators.pattern('')]],
    })
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Inspection ' },
      { key: 'keyValue', val: 'Inspection Category Name' },
      { key: 'keyValue', val: 'Mechanic Name' },
      { key: 'keyValue', val: 'Action' },
    ]
    this.tableData2 = [
      { key: 'keyValue', val: 'Select' },
      { key: 'keyValue', val: 'Inspection ' },
      { key: 'keyValue', val: 'Inspection Category Name' },
      { key: 'keyValue', val: 'Mechanic Name' },
      // { key: 'keyValue', val: 'Action' },

    ]

  }


  /**
  * vehicle list here
  */
  getVehicleZoneData() {
    this.sharedService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }

  isAllSelected(i: any, item: any) {
    let indexValue = this.checkedList.findIndex((val: any) => item?.jobCatCode == val?.inspectionCategoryId);
    console.log("check selected data",indexValue);
    if(indexValue !== -1) {
      this.checkedList.splice(i,1);
      localStorage.setItem('jobCard', JSON.stringify(this.checkedList));
    } else {
        this.inspectionChildList.every((item: any) => {
        return item.isSelected == true;
      })
      this.getCheckedItemList(i)
    }

  }

  SelectMechanich(event: any, index: any) {
    this.inspectionChildList.forEach((val: any, i: any) => {
      if (i === index) {

        this.mechanicNameValue = event.assets_no;
        this.mechanicIdvalue = event.id;
        this.indexValue = index
      } else {
        // val['isSelected'] = false
      }
    })
  }


  getCheckedItemList(index: any) {
    let data: any;

    for (let i = 0; i < this.inspectionChildList.length; i++) {
      if (this.inspectionChildList[i].isSelected) {
        data = {
          indexValue: this.indexValue,
          inspectionId: this.inspectionChildList[i]?.id,
          inspectionName: this.inspectionChildList[i]?.description,
          inspectionCategoryId: this.inspectionChildList[i]?.jobCatCode,
          inspectionCategory: this.inspectionChildList[i]?.jobCategory,
          mechanicId: this.mechanicIdvalue,
          mechanicName: this.mechanicNameValue,
          remark: "",
          Status: 1,
        }

      }
    }
    this.checkedList.push(data);

    localStorage.setItem('jobCard', JSON.stringify(this.checkedList));


    this.filteredArray = this.checkedList.map(item => ({
      ID: null,
      InspID: parseInt(item?.inspectionId),
      MechanicId: item?.mechanicId,
      Remark: null,
      Status: 1,
      JobCatCode: item?.inspectionCategoryId,
    }));

    return this.filteredArray;
  }

  getPassIn() {
    let payload = {

        "ID":null,
        "VehicleID":this.vehicleId,
        "Date":null
    }
    this.workshopService.getPassIndata(payload).subscribe((res: any) => {
      this.getPassInList = res?.body;

      let newVehicleValue = this.getPassInList?.filter((ele: any) => ele?.vehicleID == this.vehicleId);
      newVehicleValue?.forEach((data: any) => {
        this.vehicleValue = data.serviceType
        this.serviceTypeId = data.serviceTypeID        
      });
      
    });
  }

  getPartDescription() {
    let newData = {
      value: '',
      text: ''
    }

    let payload = {
      "UserID": parseInt(localStorage.getItem('user_Id') || ''),
      "RESULT": ""
    }

    this.managementService.partName(payload).subscribe((res: any) => {
      let data = res?.body?.data
      this.partdescription = data.map((val: any) =>
        newData = {
          value: val?.pr_id,
          text: val?.pr_name
        }
      )
    })
  }


  getMechanicList() {
    let newData = {
      value: '',
      text: ''
    };
    this.workshopService.getMechanicData().subscribe((res: any) => {
      let data = res?.body;
      this.mechanicList = data?.map((val: any) =>
        newData = {
          value: val?.Key,
          text: val?.Value
        }
      )
    })
  }

  getInspectionData() {
    let newData = {
      value: '',
      text: ''
    };
    let payload = {
      "ID": null
    }
    this.workshopService.getInspection(payload).subscribe((res: any) => {
      let data = res?.body;
      this.inspectionList = data.map((val: any) =>
        newData = {
          value: val?.imCode,
          text: val?.description
        })
    });
  }

  InspectionChild() {
    let mechanicId: any;
    let inspectionId: any;
    let selectedData: any = []
    let payload = {
      "ID": this.InspectionImCode
    }
    this.workshopService.getInspectionchild(payload).subscribe((res: any) => {
      this.inspectionChildList = res?.body;
      let selectedMechanics: { [mechanicId: string]: any } = {};

      for (var i = 0; i < this.checkedList.length; i++) {
        mechanicId = this.checkedList[i].mechanicId
        inspectionId = this.checkedList[i].inspectionCategoryId;
        this.inspectionIdData = inspectionId;
        this.indexData = this.checkedList[i].indexValue
        this.inspectionChildList.forEach((ele: any, i: any) => {

          if (ele?.jobCatCode === inspectionId) {
            ele.isSelected = true;
            ele.selectedIndex = i;

            if (selectedMechanics[mechanicId] === undefined) {
              selectedMechanics[mechanicId] = this.mechanicList?.find((val: any) => val?.value === mechanicId);
            }
            ele.selectedMechanic = selectedMechanics[mechanicId];

          }
        })
      }

    });
  }



  submit() {
    let payload = {
      "ID": null,
      "SerialNo": this.jobForm.value.serialNo,
      "VehicleID": this.jobForm.value.vehicleNo ? parseInt(this.jobForm.value.vehicleNo) : 0,
      "OdoReading": this.jobForm.value.odometer ? parseFloat(this.jobForm.value.odometer) : 0,
      "CreatedBy": parseInt(localStorage.getItem('user_Id') || ''),
      "ScheduledTime": formatDate(this.jobForm.value.scheduledTime, 'yyyy-MM-ddThh:mm:ss', 'en-US'),
      "DeliveryTime": formatDate(this.jobForm.value.deliveryTime, 'yyyy-MM-ddThh:mm:ss', 'en-US'),
      "Remarks": this.jobForm.value.remarks,
      "ServiceTypeID" : parseInt(this.serviceTypeId),
      "cardJobDetails": this.filteredArray
    }
    
    if (this.jobId) {
      payload['ID'] = parseInt(this.jobId)
      payload['VehicleID'] = parseInt(this.vechicleId)
    }
    console.log("payload", payload);

    this.workshopService.createJobCard(payload).subscribe((res: any) => {

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (res?.status == 201) {
        this.alertData = {
          message: `${this.SuccessMessage} Job card Successfully `
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.button = 'Add';
        this.jobId = ''
        setTimeout(() => {
          this.router.navigateByUrl('/WorkShop/workshop_job_card')
        }, 2000);
        this.stopAlert();
      } else {
        this.alertData = {
          message: `Job Card Not ${this.alertMesage}`,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
        this.alertMesage = 'Added'
      }
    })
    this.jobForm.reset()
    this.selectedValue = {
      value: '',
      text: ''
    }
    this.selectedIncharge = {
      value: '',
      text: ''
    }
    localStorage.removeItem("jobCard");
  }

  updateJobCard() {
    this.button = 'Update'
    this.SuccessMessage = 'Updated'
    this.alertMesage = 'Updated'

    let newVehicleValue = this.vehicleData?.filter((ele: any) => ele?.text == this.jobCardData?.busNumber);
    newVehicleValue?.forEach((data: any) => {
      this.selectedValue = data
      this.vechicleId = data.value
    });




    let formatSceduledDate = this.jobCardData?.scheduledTime.slice(0, 10).split('-').reverse().join('-');
    let formatSceduledTime = this.jobCardData?.scheduledTime.slice(11, 16);
    let formatDeliveryDate = this.jobCardData?.deliveryTime.slice(0, 10).split('-').reverse().join('-');
    let formatDeliveryTime = this.jobCardData?.deliveryTime.slice(11, 16);

    this.jobForm = this.fb.group({
      serialNo: [this.jobCardData?.serialNumber, [Validators.required, Validators.pattern('')]],
      vehicleNo: ['', [Validators.required, Validators.pattern('')]],
      employee: ['', [Validators.required, Validators.pattern('')]],
      odometer: [this.jobCardData?.odoReading, [Validators.required, Validators.pattern('')]],
      scheduledTime: [new Date(`${formatSceduledDate} ${formatSceduledTime}`), [Validators.required, Validators.pattern('')]],
      deliveryTime: [new Date(`${formatDeliveryDate} ${formatDeliveryTime}`), [Validators.required, Validators.pattern('')]],
      remarks: ['', [Validators.required, Validators.pattern('')]],
    })
  }



  confirm(event: any) {
    if (event.selectType == 'Vehicle') {
      this.vehicleId = event.id
      this.jobForm.controls['vehicleNo'].setValue(event.id)
      this.getPassIn()
    } else if (event.selectType == 'mechanic') {
      this.mechanicId = event.id
      this.addJobForm.controls['mechanic'].setValue(event.assets_no)
    } else if (event.selectType == 'inspection') {
      this.InspectionImCode = event.id
      this.addJobForm.controls['inspection'].setValue(event.assets_no)
      this.InspectionChild()
    } else if (event.selectType == 'employee') {
      this.jobForm.controls['employee'].setValue(event.id)
    } else if (event.selectType == 'ins_category') {
      this.jobForm.controls['inspection_category'].setValue(event.id)
    }
  }

  delete(job: any, i: any) {
    
    this.checkedList.splice(i, 1);
    this.inspectionChildList?.forEach((ele: any) => {
      if (ele?.jobCatCode === job?.inspectionCategoryId) {
        delete ele.isSelected;
        delete ele.selectedIndex
        delete ele.selectedMechanic;
      }
    })
    localStorage.setItem('jobCard', JSON.stringify(this.checkedList));

  }

  addItem(type: any) {
    this.itemType = type
  }


  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }


  /**
* tabel size chage method
* @param event 
*/
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  /**
   * table data change
   * @param event 
   */
  onTableDataChange(event: any) {
    this.page = event;
  };
}
