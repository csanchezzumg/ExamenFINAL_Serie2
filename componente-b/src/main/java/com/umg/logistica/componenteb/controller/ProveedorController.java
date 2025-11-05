package com.umg.logistica.componenteb.controller;
import com.umg.logistica.componenteb.dto.ProveedorDTO;
import com.umg.logistica.componenteb.service.ProveedorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/proveedores")
@Tag(name = "Proveedores", description = "API para gestión de proveedores")
public class ProveedorController {
    @Autowired
    private ProveedorService proveedorService;

    @GetMapping
    @Operation(summary = "Listar todos los proveedores")
    @ApiResponse(responseCode = "200", description = "Lista de proveedores")
    public ResponseEntity<List<ProveedorDTO>> listarTodos() {
        return ResponseEntity.ok(proveedorService.listarTodos());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener proveedor por ID")
    public ResponseEntity<ProveedorDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(proveedorService.obtenerPorId(id));
    }

    @PostMapping
    @Operation(summary = "Crear nuevo proveedor")
    @ApiResponse(responseCode = "201", description = "Proveedor creado")
    public ResponseEntity<ProveedorDTO> crear(@Valid @RequestBody ProveedorDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(proveedorService.crear(dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar proveedor")
    @ApiResponse(responseCode = "204", description = "Proveedor eliminado")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        proveedorService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
