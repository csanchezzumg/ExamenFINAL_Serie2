package com.umg.logistica.componentea.repository;

import com.umg.logistica.componentea.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    Optional<Pedido> findByCodigo(String codigo);

    List<Pedido> findByClienteId(Long clienteId);

    List<Pedido> findByEstado(Pedido.EstadoPedido estado);

    List<Pedido> findByFechaPedidoBetween(LocalDateTime inicio, LocalDateTime fin);

    @Query("SELECT p FROM Pedido p WHERE p.cliente.codigo = :codigoCliente")
    List<Pedido> findByCodigoCliente(String codigoCliente);

    boolean existsByCodigo(String codigo);
}
