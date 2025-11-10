package com.umg.logistica.componentea.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductoDTO {
    
    private Long id;
    
    private String codigo;
    
    @NotBlank(message = "El nombre del producto es obligatorio")
    private String nombre;
    
    private String descripcion;
    
    @NotNull(message = "El precio unitario es obligatorio")
    private BigDecimal precioUnitario;
    
    private Integer stockDisponible;
}
