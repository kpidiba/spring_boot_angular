package com.employe.employe.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employe.employe.models.Employe;
import com.employe.employe.service.EmployeService;

@RestController
@RequestMapping("/employee")
public class EmployeController {
    @Autowired
    private EmployeService employeService;


    

    @GetMapping
    public ResponseEntity<List<Employe>> getAllEmployees(){
        List<Employe> employes = employeService.findAllEmployes();
        return new ResponseEntity<List<Employe>>(employes, HttpStatus.OK);
    };

    @GetMapping("/find/{id}")
    public ResponseEntity<Employe> getEmployee(@PathVariable("id") Long id){
        Employe employe = employeService.findEmployebyId(id);
        return new ResponseEntity<>(employe, HttpStatus.OK);
    };

    @PostMapping("/add")
    public ResponseEntity<Employe> addEmployee(@RequestBody Employe employe){
        Employe addEmploye = employeService.addEmploye(employe);
        return new ResponseEntity<Employe>(addEmploye, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Employe> updateEmployee(@RequestBody Employe employe){
        Employe updateEmploye = employeService.updateEmploye(employe);
        return new ResponseEntity<Employe>(updateEmploye, HttpStatus.OK);
    }


    @PostMapping("/update")
    public ResponseEntity<Employe> delete (Long id){
        employeService.deleteEmploye(id);
        return new ResponseEntity<Employe>(HttpStatus.OK);
    }

}
