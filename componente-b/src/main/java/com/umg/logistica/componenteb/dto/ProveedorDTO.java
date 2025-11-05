package com.umg.logistica.componenteb.dto;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProveedorDTO {
    private Long id;
    @NotBlank
    private String nombre;
    @Email
    private String email;
    private String telefono;
    private String direccion;
    private String nit;
    private Boolean activo;
    private String codigo;
}
