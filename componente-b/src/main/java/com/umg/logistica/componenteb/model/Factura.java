package com.umg.logistica.componenteb.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "facturas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Factura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 100)
    private String codigo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proveedor_id", nullable = false)
    @NotNull
    private Proveedor proveedor;

    @Column(name = "fecha_factura", nullable = false)
    private LocalDateTime fechaFactura;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EstadoFactura estado = EstadoFactura.PENDIENTE;

    @OneToMany(mappedBy = "factura", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemFactura> items = new ArrayList<>();

    @Column(precision = 12, scale = 2)
    private BigDecimal subtotal = BigDecimal.ZERO;

    @Column(precision = 12, scale = 2)
    private BigDecimal impuestos = BigDecimal.ZERO;

    @Column(precision = 12, scale = 2)
    private BigDecimal total = BigDecimal.ZERO;

    @Column(length = 500)
    private String observaciones;

    @CreationTimestamp
    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;

    @UpdateTimestamp
    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;

    public void addItem(ItemFactura item) {
        items.add(item);
        item.setFactura(this);
    }

    public void calcularTotales() {
        this.subtotal = items.stream()
                .map(ItemFactura::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        this.impuestos = subtotal.multiply(new BigDecimal("0.12"));
        this.total = subtotal.add(impuestos);
    }

    public enum EstadoFactura {
        PENDIENTE, PAGADA, VENCIDA, CANCELADA
    }
}
