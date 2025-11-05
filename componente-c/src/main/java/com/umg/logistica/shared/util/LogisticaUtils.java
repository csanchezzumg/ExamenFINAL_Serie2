package com.umg.logistica.shared.util;

import com.umg.logistica.shared.model.Producto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

/**
 * Clase de utilidades compartidas para cálculos y validaciones
 */
public class LogisticaUtils {
    
    private static final Logger logger = LoggerFactory.getLogger(LogisticaUtils.class);
    
    /**
     * Calcula el total de una lista de productos
     * @param productos Lista de productos
     * @return Total calculado sumando los subtotales de cada producto
     */
    public static BigDecimal calcularTotal(List<Producto> productos) {
        if (productos == null || productos.isEmpty()) {
            logger.warn("Lista de productos vacía o nula");
            return BigDecimal.ZERO;
        }
        
        BigDecimal total = productos.stream()
                .map(Producto::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        logger.info("Total calculado: {} para {} productos", total, productos.size());
        return total;
    }
    
    /**
     * Genera un código único basado en el tipo de entidad
     * Formato: TIPO-YYYYMMDD-HHMMSS-UUID
     * @param tipoEntidad Tipo de entidad (PEDIDO, FACTURA, CLIENTE, PROVEEDOR)
     * @return Código único generado
     */
    public static String generarCodigoUnico(String tipoEntidad) {
        if (tipoEntidad == null || tipoEntidad.trim().isEmpty()) {
            tipoEntidad = "GENERICO";
        }
        
        String timestamp = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyyMMdd-HHmmss"));
        String uuid = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        
        String codigo = String.format("%s-%s-%s", 
                tipoEntidad.toUpperCase(), 
                timestamp, 
                uuid);
        
        logger.info("Código generado: {}", codigo);
        return codigo;
    }
    
    /**
     * Valida que un código sea válido
     * @param codigo Código a validar
     * @return true si es válido
     */
    public static boolean validarCodigo(String codigo) {
        if (codigo == null || codigo.trim().isEmpty()) {
            return false;
        }
        
        // Debe tener al menos 3 partes separadas por guión
        String[] partes = codigo.split("-");
        return partes.length >= 3;
    }
    
    /**
     * Calcula el total con impuestos (IVA 12%)
     * @param subtotal Subtotal sin impuestos
     * @return Total con impuestos incluidos
     */
    public static BigDecimal calcularTotalConImpuestos(BigDecimal subtotal) {
        if (subtotal == null) {
            return BigDecimal.ZERO;
        }
        
        BigDecimal IVA = new BigDecimal("0.12");
        BigDecimal impuesto = subtotal.multiply(IVA);
        BigDecimal total = subtotal.add(impuesto);
        
        logger.info("Subtotal: {}, Impuesto (12%): {}, Total: {}", subtotal, impuesto, total);
        return total;
    }
    
    /**
     * Formatea un monto a string con formato monetario
     * @param monto Monto a formatear
     * @return String formateado (ej: "Q 1,234.56")
     */
    public static String formatearMonto(BigDecimal monto) {
        if (monto == null) {
            return "Q 0.00";
        }
        return String.format("Q %.2f", monto);
    }
}
