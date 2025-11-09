package com.umg.logistica.componenteb.controller;
import com.umg.logistica.componenteb.dto.FacturaDTO;
import com.umg.logistica.componenteb.service.FacturaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/facturas")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Facturas", description = "API para gestión de facturas")
public class FacturaController {
    @Autowired
    private FacturaService facturaService;

    @GetMapping
    @Operation(summary = "Listar todas las facturas")
    @ApiResponse(responseCode = "200", description = "Lista de facturas")
    public ResponseEntity<List<FacturaDTO>> listarTodos() {
        return ResponseEntity.ok(facturaService.listarTodos());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener factura por ID")
    public ResponseEntity<FacturaDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(facturaService.obtenerPorId(id));
    }

    @PostMapping
    @Operation(summary = "Crear nueva factura")
    @ApiResponse(responseCode = "201", description = "Factura creada")
    public ResponseEntity<FacturaDTO> crear(@Valid @RequestBody FacturaDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(facturaService.crear(dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar factura")
    @ApiResponse(responseCode = "204", description = "Factura eliminada")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        facturaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
