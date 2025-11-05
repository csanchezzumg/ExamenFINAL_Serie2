package com.umg.logistica.componentea.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemPedidoDTO {
    private Long id;

    @NotBlank(message = "El código del producto es obligatorio")
    private String productoCodigo;

    @NotBlank(message = "El nombre del producto es obligatorio")
    private String productoNombre;

    @NotNull(message = "El precio unitario es obligatorio")
    private BigDecimal precioUnitario;

    @NotNull(message = "La cantidad es obligatoria")
    @Min(value = 1, message = "La cantidad debe ser mayor a 0")
    private Integer cantidad;

    private BigDecimal subtotal;
}
