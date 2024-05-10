import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, ReactiveFormsModule, MatSelectModule, MatOptionModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'AIRAMATRIX';
  output: any = {}
  tree: any = {}
  form: FormGroup;
  States: any[] = []
  districts: any[] = []
  places: any[] = []
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      country: [''],
      state: [''],
      district: [''],
      place: ['']
    });
  }
  ngOnInit(): void {
    this.tree = this.buildTreePattern(this.firstLevelArr, this.secondLevelArr, this.thirdLevelArr, this.fourthLevelArr);
    this.output = { countries: this.tree };
    console.log(1, JSON.stringify(this.tree)); // console for completed tree structure for given input
  }
  firstLevelArr = [
    { id: "1", name: "India" },
    { id: "2", name: "Germany" }
  ];

  secondLevelArr = [
    { id: "s1", parentId: "2", name: "Bavaria" },
    { id: "s2", parentId: "2", name: "Berlin" },
    { id: "s3", parentId: "1", name: "Maharashtra" },
    { id: "s4", parentId: "1", name: "Tamilnadu" }
  ];

  thirdLevelArr = [
    { id: "d1", parentId: "s1", name: "Upper Bavaria" },
    { id: "d2", parentId: "s1", name: "Lower Bavaria" },
    { id: "d3", parentId: "s2", name: "Berlin-Mitte" },
    { id: "d4", parentId: "s2", name: "Kreuzberg" },
    { id: "d5", parentId: "s3", name: "Nasik" },
    { id: "d6", parentId: "s3", name: "Jalgoan" },
    { id: "d7", parentId: "s4", name: "Ariyalur" },
    { id: "d8", parentId: "s4", name: "Chennai" }
  ];

  fourthLevelArr = [
    { id: "p1", parentId: "d1", name: "Munich" },
    { id: "p2", parentId: "d1", name: "Erding" },
    { id: "p3", parentId: "d2", name: "Leipzig" },
    { id: "p4", parentId: "d2", name: "Landshut" },
    { id: "p5", parentId: "d3", name: "Passau" },
    { id: "p6", parentId: "d3", name: "Gesundbrunnen" },
    { id: "p7", parentId: "d4", name: "Frieburg" },
    { id: "p8", parentId: "d4", name: "Hamburg" },
    { id: "p9", parentId: "d6", name: "Raver" },
    { id: "p10", parentId: "d6", name: "Savda" },
    { id: "p11", parentId: "d5", name: "Ozar" },
    { id: "p12", parentId: "d5", name: "Manmad" },
    { id: "p13", parentId: "d7", name: "Thirumanur" },
    { id: "p14", parentId: "d7", name: "Sendurai" },
    { id: "p15", parentId: "d8", name: "New Chennai" },
    { id: "p16", parentId: "d8", name: "Old Chennai" }
  ];

  // Function to build tree structure
  buildTreePattern(firstLevelArr: any, secondLevelArr: any, thirdLevelArr: any, fourthLevelArr: any) {

    firstLevelArr.forEach((country: any) => {
      this.output[country.id] = { countryName: country.name, states: {} }
    })

    secondLevelArr.forEach((state: any) => {
      this.output[state.parentId]['states'][state.id.toString()] = { stateName: state.name, districts: {} }



      thirdLevelArr.forEach((district: any) => {
        if (state.id == district.parentId) {
          this.output[state.parentId]['states'][state.id.toString()]['districts'][district.id.toString()] = { districtName: district.name, places: {} }


          fourthLevelArr.forEach((place: any) => {
            if (district.id == place.parentId) {
              this.output[state.parentId]['states'][state.id.toString()]['districts'][district.id.toString()]['places'][place.id.toString()] = { placeName: place.name }
            }
          })
        }
      })
    })
    return this.output;
  }

  onChangeCountry(value: any) {
    console.log(value)
    this.States = this.secondLevelArr.filter((ele)=>{
      return ele.parentId == value.id
    })
    this.districts =[]
    this.places = []
  }

  onChangeState(value: any) {
    console.log(value)
    this.districts = this.thirdLevelArr.filter((ele)=>{
      return ele.parentId == value.id
    })
    this.places = []
  }

  onChangeDistrict(value: any) {
    console.log(value)
    this.places = this.fourthLevelArr.filter((ele)=>{
      return ele.parentId == value.id
    })
  }

}