package com.employe.employe.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employe.employe.dao.EmployeRepo;
import com.employe.employe.models.Employe;

import jakarta.transaction.Transactional;

import com.employe.employe.exceptions.UserNotFoundException;

@Service
@Transactional
public class EmployeService {
    @Autowired
    private EmployeRepo employeRepo;

    public Employe addEmploye(Employe employe) {
        employe.setEmployeeCode(UUID.randomUUID().toString());
        return employeRepo.save(employe);
    }

    public List<Employe> findAllEmployes() {
        return this.employeRepo.findAll();
    }

    public Employe updateEmploye(Employe employe) {
        return employeRepo.save(employe);
    }

    public Employe findEmployebyId(Long id) {
        return employeRepo.findEmployeById(id)
                .orElseThrow(() -> new UserNotFoundException("User by id" + id + "was not found"));
    }

    public void deleteEmploye(Long id) {
        employeRepo.deleteEmployeById(id);
    }

}
