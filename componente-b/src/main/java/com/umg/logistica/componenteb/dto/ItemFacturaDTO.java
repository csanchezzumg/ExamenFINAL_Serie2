package com.umg.logistica.componenteb.dto;
import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemFacturaDTO {
    private Long id;
    @NotBlank
    private String productoCodigo;
    @NotBlank
    private String productoNombre;
    @NotNull
    private BigDecimal precioUnitario;
    @NotNull
    @Min(1)
    private Integer cantidad;
    private BigDecimal subtotal;
}
