import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/app/models/employe';
import { EmployeService } from 'src/app/services/employe.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css'],
})
export class EmployeComponent implements OnInit {
  public employees: Employe[] = [];
  public employe: Employe ={id: 0,email:"",jobTitle:"",name:"",phone:"",imageUrl:"",employeeCode:""};
  public editEmployee: Employe ={id: 0,email:"",jobTitle:"",name:"",phone:"",imageUrl:"",employeeCode:""} ;
  public deleteEmployee: Employe ={id: 0,email:"",jobTitle:"",name:"",phone:"",imageUrl:"",employeeCode:""} ;

  constructor(private employeService: EmployeService) {}
  ngOnInit(): void {
    this.getEmployes();
  }

  public getEmployes(): void {
    this.employeService.getEmployes().subscribe(
      //NOTE:deprecated
      (response: Employe[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      // {
      //   next: (response: Employe[]) => {
      //     this.employees = response;
      //   },
      //   error: (error: HttpErrorResponse) => {
      //     alert(error.message);
      //   },
      // }
    );
  }

  public onAddEmloyee(addForm: NgForm): void {
    document.getElementById('add-employee-form')!.click();
    this.employeService.addEmploye(addForm.value).subscribe(
      (response: Employe) => {
        console.log(response);
        this.getEmployes();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmloyee(employee: Employe): void {
    this.employeService.updateEmploye(employee).subscribe({
      next: (response: Employe) => {
        console.log(response);
        this.getEmployes();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onDeleteEmloyee(employeeId: number): void {
    this.employeService.deleteEmploye(employeeId).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getEmployes();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employe[] = [];
    for (const employee of this.employees) {
      if (
        employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployes();
    }
  }

  public onOpenModal(employee: Employe, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container!.appendChild(button);
    button.click();
  }
}
