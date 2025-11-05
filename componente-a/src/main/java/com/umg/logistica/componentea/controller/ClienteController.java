package com.umg.logistica.componentea.controller;

import com.umg.logistica.componentea.dto.ClienteDTO;
import com.umg.logistica.componentea.service.ClienteService;
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
@RequestMapping("/api/clientes")
@Tag(name = "Clientes", description = "API para gestión de clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping
    @Operation(summary = "Listar todos los clientes", description = "Obtiene la lista completa de clientes registrados")
    @ApiResponse(responseCode = "200", description = "Lista de clientes obtenida exitosamente")
    public ResponseEntity<List<ClienteDTO>> listarTodos() {
        return ResponseEntity.ok(clienteService.listarTodos());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener cliente por ID", description = "Obtiene los detalles de un cliente específico")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Cliente encontrado"),
            @ApiResponse(responseCode = "404", description = "Cliente no encontrado")
    })
    public ResponseEntity<ClienteDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(clienteService.obtenerPorId(id));
    }

    @GetMapping("/codigo/{codigo}")
    @Operation(summary = "Obtener cliente por código", description = "Busca un cliente por su código único")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Cliente encontrado"),
            @ApiResponse(responseCode = "404", description = "Cliente no encontrado")
    })
    public ResponseEntity<ClienteDTO> obtenerPorCodigo(@PathVariable String codigo) {
        return ResponseEntity.ok(clienteService.obtenerPorCodigo(codigo));
    }

    @PostMapping
    @Operation(summary = "Crear nuevo cliente", description = "Registra un nuevo cliente en el sistema")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Cliente creado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos")
    })
    public ResponseEntity<ClienteDTO> crear(@Valid @RequestBody ClienteDTO clienteDTO) {
        ClienteDTO creado = clienteService.crear(clienteDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar cliente", description = "Actualiza la información de un cliente existente")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Cliente actualizado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Cliente no encontrado"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos")
    })
    public ResponseEntity<ClienteDTO> actualizar(@PathVariable Long id, @Valid @RequestBody ClienteDTO clienteDTO) {
        return ResponseEntity.ok(clienteService.actualizar(id, clienteDTO));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar cliente", description = "Elimina un cliente del sistema")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Cliente eliminado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Cliente no encontrado")
    })
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        clienteService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
