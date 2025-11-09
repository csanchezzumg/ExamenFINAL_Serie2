package com.umg.logistica.componenteb.service;

import com.umg.logistica.componenteb.dto.PedidoReferenciaDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Servicio para integración con Componente A (Clientes y Pedidos)
 */
@Service
@Slf4j
public class IntegracionComponenteAService {

    private final RestTemplate restTemplate;
    
    @Value("${componente-a.base-url:http://localhost:8081}")
    private String componenteABaseUrl;

    public IntegracionComponenteAService() {
        this.restTemplate = new RestTemplate();
    }

    /**
     * Obtiene información de un pedido desde el Componente A
     */
    public PedidoReferenciaDTO obtenerPedido(Long pedidoId) {
        try {
            String url = componenteABaseUrl + "/api/pedidos/" + pedidoId;
            log.info("Obteniendo pedido {} desde Componente A: {}", pedidoId, url);
            
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                Map<String, Object> pedidoData = response.getBody();
                
                PedidoReferenciaDTO pedido = new PedidoReferenciaDTO();
                pedido.setPedidoId(((Number) pedidoData.get("id")).longValue());
                pedido.setNumero((String) pedidoData.get("numero"));
                
                // Manejar el campo total que puede venir como Number
                Object totalObj = pedidoData.get("total");
                if (totalObj instanceof Number) {
                    pedido.setTotal(((Number) totalObj).doubleValue());
                }
                
                pedido.setEstado((String) pedidoData.get("estado"));
                
                log.info("Pedido {} obtenido correctamente: {}", pedidoId, pedido.getNumero());
                return pedido;
            }
            
            log.warn("No se pudo obtener el pedido {} - Status: {}", pedidoId, response.getStatusCode());
            return null;
            
        } catch (Exception e) {
            log.error("Error al obtener pedido {} desde Componente A: {}", pedidoId, e.getMessage());
            return null;
        }
    }

    /**
     * Obtiene información de múltiples pedidos
     */
    public List<PedidoReferenciaDTO> obtenerPedidos(List<Long> pedidoIds) {
        List<PedidoReferenciaDTO> pedidos = new ArrayList<>();
        
        if (pedidoIds == null || pedidoIds.isEmpty()) {
            return pedidos;
        }
        
        for (Long pedidoId : pedidoIds) {
            PedidoReferenciaDTO pedido = obtenerPedido(pedidoId);
            if (pedido != null) {
                pedidos.add(pedido);
            }
        }
        
        return pedidos;
    }

    /**
     * Verifica si un pedido existe en el Componente A
     */
    public boolean existePedido(Long pedidoId) {
        try {
            String url = componenteABaseUrl + "/api/pedidos/" + pedidoId;
            ResponseEntity<Void> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                Void.class
            );
            return response.getStatusCode().is2xxSuccessful();
        } catch (Exception e) {
            log.warn("Pedido {} no existe en Componente A", pedidoId);
            return false;
        }
    }
}
