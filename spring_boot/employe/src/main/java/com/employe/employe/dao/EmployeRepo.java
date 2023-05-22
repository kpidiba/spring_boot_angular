package com.employe.employe.dao;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.employe.employe.models.Employe;

public interface EmployeRepo  extends JpaRepository<Employe,Long>{

    void deleteEmployeById(Long id);

    Optional<Employe> findEmployeById (Long id);
    

}
