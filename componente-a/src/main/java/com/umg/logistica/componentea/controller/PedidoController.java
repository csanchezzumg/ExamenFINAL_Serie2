package com.umg.logistica.componentea.controller;

import com.umg.logistica.componentea.dto.PedidoDTO;
import com.umg.logistica.componentea.service.PedidoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@Tag(name = "Pedidos", description = "API para gestión de pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @GetMapping
    @Operation(summary = "Listar todos los pedidos", description = "Obtiene la lista completa de pedidos")
    @ApiResponse(responseCode = "200", description = "Lista de pedidos obtenida exitosamente")
    public ResponseEntity<List<PedidoDTO>> listarTodos() {
        return ResponseEntity.ok(pedidoService.listarTodos());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener pedido por ID", description = "Obtiene los detalles de un pedido específico")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Pedido encontrado"),
            @ApiResponse(responseCode = "404", description = "Pedido no encontrado")
    })
    public ResponseEntity<PedidoDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(pedidoService.obtenerPorId(id));
    }

    @PostMapping
    @Operation(summary = "Crear nuevo pedido", description = "Registra un nuevo pedido en el sistema")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Pedido creado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos")
    })
    public ResponseEntity<PedidoDTO> crear(@Valid @RequestBody PedidoDTO pedidoDTO) {
        PedidoDTO creado = pedidoService.crear(pedidoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar pedido", description = "Elimina un pedido del sistema")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Pedido eliminado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Pedido no encontrado")
    })
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        pedidoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
