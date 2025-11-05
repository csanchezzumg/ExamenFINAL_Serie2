package com.umg.logistica.componenteb.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "items_factura")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemFactura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "factura_id", nullable = false)
    private Factura factura;

    @NotBlank
    @Column(name = "producto_codigo", nullable = false, length = 50)
    private String productoCodigo;

    @NotBlank
    @Column(name = "producto_nombre", nullable = false, length = 200)
    private String productoNombre;

    @NotNull
    @Column(name = "precio_unitario", nullable = false, precision = 12, scale = 2)
    private BigDecimal precioUnitario;

    @NotNull
    @Min(1)
    @Column(nullable = false)
    private Integer cantidad;

    @Column(precision = 12, scale = 2)
    private BigDecimal subtotal;

    @PrePersist
    @PreUpdate
    public void calcularSubtotal() {
        if (precioUnitario != null && cantidad != null) {
            this.subtotal = precioUnitario.multiply(BigDecimal.valueOf(cantidad));
        }
    }

    public BigDecimal getSubtotal() {
        if (subtotal == null) calcularSubtotal();
        return subtotal;
    }
}
