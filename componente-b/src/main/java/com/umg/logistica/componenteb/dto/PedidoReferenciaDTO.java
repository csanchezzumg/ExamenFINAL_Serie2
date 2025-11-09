package com.umg.logistica.componenteb.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * DTO para representar referencias a pedidos del Componente A
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PedidoReferenciaDTO implements Serializable {
    private Long pedidoId;
    private String numero;
    private Double total;
    private String estado;
}
