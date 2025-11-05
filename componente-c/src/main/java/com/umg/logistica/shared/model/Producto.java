package com.umg.logistica.shared.model;

import java.math.BigDecimal;

/**
 * Clase que representa un producto genérico utilizado en pedidos y facturas
 */
public class Producto {
    private String codigo;
    private String nombre;
    private BigDecimal precioUnitario;
    private Integer cantidad;

    public Producto() {
    }

    public Producto(String codigo, String nombre, BigDecimal precioUnitario, Integer cantidad) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.precioUnitario = precioUnitario;
        this.cantidad = cantidad;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public BigDecimal getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(BigDecimal precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    /**
     * Calcula el subtotal del producto (precio * cantidad)
     */
    public BigDecimal getSubtotal() {
        if (precioUnitario == null || cantidad == null) {
            return BigDecimal.ZERO;
        }
        return precioUnitario.multiply(BigDecimal.valueOf(cantidad));
    }

    @Override
    public String toString() {
        return "Producto{" +
                "codigo='" + codigo + '\'' +
                ", nombre='" + nombre + '\'' +
                ", precioUnitario=" + precioUnitario +
                ", cantidad=" + cantidad +
                '}';
    }
}
