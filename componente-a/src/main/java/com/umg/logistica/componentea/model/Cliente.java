package com.umg.logistica.componentea.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "clientes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El código de cliente es obligatorio")
    @Column(unique = true, nullable = false, length = 50)
    private String codigo;

    @NotBlank(message = "El nombre es obligatorio")
    @Column(nullable = false, length = 200)
    private String nombre;

    @Email(message = "Email inválido")
    @Column(length = 150)
    private String email;

    @Pattern(regexp = "^[0-9]{8,15}$", message = "Teléfono inválido")
    @Column(length = 15)
    private String telefono;

    @Column(length = 300)
    private String direccion;

    @Column(length = 20)
    private String nit;

    @Column(nullable = false)
    private Boolean activo = true;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Pedido> pedidos = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;

    @UpdateTimestamp
    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;

    // Helper method
    public void addPedido(Pedido pedido) {
        pedidos.add(pedido);
        pedido.setCliente(this);
    }

    public void removePedido(Pedido pedido) {
        pedidos.remove(pedido);
        pedido.setCliente(null);
    }
}
