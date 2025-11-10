package com.umg.logistica.componentea.service;

import com.umg.logistica.componentea.dto.ProductoDTO;
import com.umg.logistica.componentea.model.Producto;
import com.umg.logistica.componentea.repository.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductoService {

    private final ProductoRepository productoRepository;

    @Transactional(readOnly = true)
    public List<ProductoDTO> listarProductos() {
        return productoRepository.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProductoDTO obtenerProductoPorId(Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));
        return convertirADTO(producto);
    }

    @Transactional
    public ProductoDTO crearProducto(ProductoDTO productoDTO) {
        if (productoDTO.getCodigo() != null && productoRepository.existsByCodigo(productoDTO.getCodigo())) {
            throw new RuntimeException("Ya existe un producto con el código: " + productoDTO.getCodigo());
        }
        
        Producto producto = convertirAEntidad(productoDTO);
        Producto productoGuardado = productoRepository.save(producto);
        return convertirADTO(productoGuardado);
    }

    @Transactional
    public ProductoDTO actualizarProducto(Long id, ProductoDTO productoDTO) {
        Producto productoExistente = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));

        if (productoDTO.getCodigo() != null && 
            !productoDTO.getCodigo().equals(productoExistente.getCodigo()) &&
            productoRepository.existsByCodigo(productoDTO.getCodigo())) {
            throw new RuntimeException("Ya existe un producto con el código: " + productoDTO.getCodigo());
        }

        productoExistente.setNombre(productoDTO.getNombre());
        productoExistente.setDescripcion(productoDTO.getDescripcion());
        productoExistente.setPrecioUnitario(productoDTO.getPrecioUnitario());
        productoExistente.setStockDisponible(productoDTO.getStockDisponible());
        
        if (productoDTO.getCodigo() != null && !productoDTO.getCodigo().isEmpty()) {
            productoExistente.setCodigo(productoDTO.getCodigo());
        }

        Producto productoActualizado = productoRepository.save(productoExistente);
        return convertirADTO(productoActualizado);
    }

    @Transactional
    public void eliminarProducto(Long id) {
        if (!productoRepository.existsById(id)) {
            throw new RuntimeException("Producto no encontrado con id: " + id);
        }
        productoRepository.deleteById(id);
    }

    private ProductoDTO convertirADTO(Producto producto) {
        ProductoDTO dto = new ProductoDTO();
        dto.setId(producto.getId());
        dto.setCodigo(producto.getCodigo());
        dto.setNombre(producto.getNombre());
        dto.setDescripcion(producto.getDescripcion());
        dto.setPrecioUnitario(producto.getPrecioUnitario());
        dto.setStockDisponible(producto.getStockDisponible());
        return dto;
    }

    private Producto convertirAEntidad(ProductoDTO dto) {
        Producto producto = new Producto();
        producto.setCodigo(dto.getCodigo());
        producto.setNombre(dto.getNombre());
        producto.setDescripcion(dto.getDescripcion());
        producto.setPrecioUnitario(dto.getPrecioUnitario());
        producto.setStockDisponible(dto.getStockDisponible());
        return producto;
    }
}
