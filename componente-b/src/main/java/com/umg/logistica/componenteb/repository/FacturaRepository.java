package com.umg.logistica.componenteb.repository;
import com.umg.logistica.componenteb.model.Factura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface FacturaRepository extends JpaRepository<Factura, Long> {
    Optional<Factura> findByCodigo(String codigo);
}
