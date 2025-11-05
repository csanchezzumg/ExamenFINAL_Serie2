package com.umg.logistica.componentea.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PedidoDTO {
    private Long id;
    private String codigo;

    @NotNull(message = "El ID del cliente es obligatorio")
    private Long clienteId;

    private String clienteNombre;
    private LocalDateTime fechaPedido;
    private String estado;

    @NotEmpty(message = "El pedido debe tener al menos un item")
    @Valid
    private List<ItemPedidoDTO> items;

    private BigDecimal subtotal;
    private BigDecimal impuestos;
    private BigDecimal total;
    private String observaciones;
}
