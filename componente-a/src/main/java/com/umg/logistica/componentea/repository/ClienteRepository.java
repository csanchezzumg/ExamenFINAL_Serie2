package com.umg.logistica.componentea.repository;

import com.umg.logistica.componentea.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    Optional<Cliente> findByCodigo(String codigo);

    List<Cliente> findByActivoTrue();

    List<Cliente> findByNombreContainingIgnoreCase(String nombre);

    boolean existsByCodigo(String codigo);
}
