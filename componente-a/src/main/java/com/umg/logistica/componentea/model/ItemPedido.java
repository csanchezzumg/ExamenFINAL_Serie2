package com.umg.logistica.componentea.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "items_pedido")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pedido_id", nullable = false)
    private Pedido pedido;

    @NotBlank(message = "El código del producto es obligatorio")
    @Column(name = "producto_codigo", nullable = false, length = 50)
    private String productoCodigo;

    @NotBlank(message = "El nombre del producto es obligatorio")
    @Column(name = "producto_nombre", nullable = false, length = 200)
    private String productoNombre;

    @NotNull(message = "El precio unitario es obligatorio")
    @Column(name = "precio_unitario", nullable = false, precision = 12, scale = 2)
    private BigDecimal precioUnitario;

    @NotNull(message = "La cantidad es obligatoria")
    @Min(value = 1, message = "La cantidad debe ser mayor a 0")
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
        if (subtotal == null) {
            calcularSubtotal();
        }
        return subtotal;
    }
}
