package com.umg.logistica.componenteb.dto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FacturaDTO {
    private Long id;
    private String codigo;
    @NotNull
    private Long proveedorId;
    private String proveedorNombre;
    private LocalDateTime fechaFactura;
    private String estado;
    @NotEmpty
    @Valid
    private List<ItemFacturaDTO> items;
    private BigDecimal subtotal;
    private BigDecimal impuestos;
    private BigDecimal total;
    private String observaciones;
    
    // Integración con Componente A - Referencias a pedidos
    private List<Long> pedidoIds;
    private List<PedidoReferenciaDTO> pedidosReferenciados;
}
