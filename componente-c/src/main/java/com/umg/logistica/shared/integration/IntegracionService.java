package com.umg.logistica.shared.integration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Servicio de integración que invoca endpoints de los componentes A y B
 * Implementa el flujo circular de comunicación
 */
public class IntegracionService {
    
    private static final Logger logger = LoggerFactory.getLogger(IntegracionService.class);
    private final ApiClient apiClient;
    
    // URLs base de los componentes (pueden configurarse externamente)
    private String componenteABaseUrl = "http://localhost:8081/api";
    private String componenteBBaseUrl = "http://localhost:8082/api";
    
    public IntegracionService() {
        this.apiClient = new ApiClient();
    }
    
    public IntegracionService(String componenteAUrl, String componenteBUrl) {
        this.apiClient = new ApiClient();
        this.componenteABaseUrl = componenteAUrl;
        this.componenteBBaseUrl = componenteBUrl;
    }
    
    /**
     * Obtiene estadísticas del Componente A (Clientes/Pedidos)
     * Ejemplo de flujo circular: Componente C invoca Componente A
     * @return Mapa con estadísticas
     */
    public Map<String, Object> obtenerEstadisticasComponenteA() {
        logger.info("Obteniendo estadísticas del Componente A...");
        
        Map<String, Object> estadisticas = new HashMap<>();
        
        try {
            // Llamar endpoint de clientes
            String clientesResponse = apiClient.get(componenteABaseUrl + "/clientes");
            estadisticas.put("clientes", clientesResponse);
            estadisticas.put("componente", "A");
            estadisticas.put("status", "success");
            
            logger.info("Estadísticas obtenidas exitosamente del Componente A");
            
        } catch (IOException e) {
            logger.error("Error al obtener estadísticas del Componente A: {}", e.getMessage());
            estadisticas.put("status", "error");
            estadisticas.put("message", e.getMessage());
        }
        
        return estadisticas;
    }
    
    /**
     * Obtiene estadísticas del Componente B (Proveedores/Facturas)
     * Ejemplo de flujo circular: Componente C invoca Componente B
     * @return Mapa con estadísticas
     */
    public Map<String, Object> obtenerEstadisticasComponenteB() {
        logger.info("Obteniendo estadísticas del Componente B...");
        
        Map<String, Object> estadisticas = new HashMap<>();
        
        try {
            // Llamar endpoint de proveedores
            String proveedoresResponse = apiClient.get(componenteBBaseUrl + "/proveedores");
            estadisticas.put("proveedores", proveedoresResponse);
            estadisticas.put("componente", "B");
            estadisticas.put("status", "success");
            
            logger.info("Estadísticas obtenidas exitosamente del Componente B");
            
        } catch (IOException e) {
            logger.error("Error al obtener estadísticas del Componente B: {}", e.getMessage());
            estadisticas.put("status", "error");
            estadisticas.put("message", e.getMessage());
        }
        
        return estadisticas;
    }
    
    /**
     * Verifica la disponibilidad de un componente
     * @param componenteUrl URL base del componente
     * @return true si está disponible
     */
    public boolean verificarDisponibilidad(String componenteUrl) {
        try {
            apiClient.get(componenteUrl + "/actuator/health");
            logger.info("Componente {} disponible", componenteUrl);
            return true;
        } catch (IOException e) {
            logger.warn("Componente {} no disponible: {}", componenteUrl, e.getMessage());
            return false;
        }
    }
    
    // Getters y setters para configuración
    
    public void setComponenteABaseUrl(String componenteABaseUrl) {
        this.componenteABaseUrl = componenteABaseUrl;
    }
    
    public void setComponenteBBaseUrl(String componenteBBaseUrl) {
        this.componenteBBaseUrl = componenteBBaseUrl;
    }
    
    public String getComponenteABaseUrl() {
        return componenteABaseUrl;
    }
    
    public String getComponenteBBaseUrl() {
        return componenteBBaseUrl;
    }
}
