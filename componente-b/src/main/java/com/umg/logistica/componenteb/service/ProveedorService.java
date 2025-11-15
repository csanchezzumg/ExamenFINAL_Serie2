package com.umg.logistica.componenteb.service;
import com.umg.logistica.componenteb.dto.ProveedorDTO;
import com.umg.logistica.componenteb.model.Proveedor;
import com.umg.logistica.componenteb.repository.ProveedorRepository;
import com.umg.logistica.shared.util.LogisticaUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProveedorService {
    @Autowired
    private ProveedorRepository proveedorRepository;

    public List<ProveedorDTO> listarTodos() {
        return proveedorRepository.findAll().stream()
                .map(this::convertirADTO).collect(Collectors.toList());
    }

    public ProveedorDTO obtenerPorId(Long id) {
        return proveedorRepository.findById(id)
                .map(this::convertirADTO)
                .orElseThrow(() -> new RuntimeException("Proveedor no encontrado"));
    }

    public ProveedorDTO crear(ProveedorDTO dto) {
        Proveedor proveedor = new Proveedor();
        // Aquí se utiliza el método del componente C
        proveedor.setCodigo(LogisticaUtils.generarCodigoUnico("PROVEEDOR"));
        proveedor.setNombre(dto.getNombre());
        proveedor.setEmail(dto.getEmail());
        proveedor.setTelefono(dto.getTelefono());
        proveedor.setDireccion(dto.getDireccion());
        proveedor.setNit(dto.getNit());
        proveedor.setActivo(true);
        return convertirADTO(proveedorRepository.save(proveedor));
    }

    public void eliminar(Long id) {
        proveedorRepository.deleteById(id);
    }

    private ProveedorDTO convertirADTO(Proveedor p) {
        ProveedorDTO dto = new ProveedorDTO();
        dto.setId(p.getId());
        dto.setCodigo(p.getCodigo());
        dto.setNombre(p.getNombre());
        dto.setEmail(p.getEmail());
        dto.setTelefono(p.getTelefono());
        dto.setDireccion(p.getDireccion());
        dto.setNit(p.getNit());
        dto.setActivo(p.getActivo());
        return dto;
    }
}
