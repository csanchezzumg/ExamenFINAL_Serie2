package com.umg.logistica.componenteb.service;
import com.umg.logistica.componenteb.dto.*;
import com.umg.logistica.componenteb.model.*;
import com.umg.logistica.componenteb.repository.*;
import com.umg.logistica.shared.util.LogisticaUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class FacturaService {
    @Autowired
    private FacturaRepository facturaRepository;
    @Autowired
    private ProveedorRepository proveedorRepository;
    @Autowired
    private IntegracionComponenteAService integracionService;

    public List<FacturaDTO> listarTodos() {
        return facturaRepository.findAll().stream()
                .map(this::convertirADTO).collect(Collectors.toList());
    }

    public FacturaDTO obtenerPorId(Long id) {
        return facturaRepository.findById(id)
                .map(this::convertirADTO)
                .orElseThrow(() -> new RuntimeException("Factura no encontrada"));
    }

    public FacturaDTO crear(FacturaDTO dto) {
        Proveedor proveedor = proveedorRepository.findById(dto.getProveedorId())
                .orElseThrow(() -> new RuntimeException("Proveedor no encontrado"));
        
        // Validar referencias a pedidos si se proporcionaron
        if (dto.getPedidoIds() != null && !dto.getPedidoIds().isEmpty()) {
            for (Long pedidoId : dto.getPedidoIds()) {
                if (!integracionService.existePedido(pedidoId)) {
                    throw new RuntimeException("Pedido no encontrado: " + pedidoId);
                }
            }
        }
        
        Factura factura = new Factura();
        factura.setCodigo(LogisticaUtils.generarCodigoUnico("FACTURA"));
        factura.setProveedor(proveedor);
        factura.setFechaFactura(LocalDateTime.now());
        factura.setEstado(Factura.EstadoFactura.PENDIENTE);
        factura.setObservaciones(dto.getObservaciones());

        for (ItemFacturaDTO itemDTO : dto.getItems()) {
            ItemFactura item = new ItemFactura();
            item.setProductoCodigo(itemDTO.getProductoCodigo());
            item.setProductoNombre(itemDTO.getProductoNombre());
            item.setPrecioUnitario(itemDTO.getPrecioUnitario());
            item.setCantidad(itemDTO.getCantidad());
            factura.addItem(item);
        }
        factura.calcularTotales();
        
        FacturaDTO resultado = convertirADTO(facturaRepository.save(factura));
        
        // Cargar información de pedidos referenciados
        if (dto.getPedidoIds() != null && !dto.getPedidoIds().isEmpty()) {
            resultado.setPedidoIds(dto.getPedidoIds());
            resultado.setPedidosReferenciados(integracionService.obtenerPedidos(dto.getPedidoIds()));
        }
        
        return resultado;
    }

    public void eliminar(Long id) {
        facturaRepository.deleteById(id);
    }

    private FacturaDTO convertirADTO(Factura f) {
        FacturaDTO dto = new FacturaDTO();
        dto.setId(f.getId());
        dto.setCodigo(f.getCodigo());
        dto.setProveedorId(f.getProveedor().getId());
        dto.setProveedorNombre(f.getProveedor().getNombre());
        dto.setFechaFactura(f.getFechaFactura());
        dto.setEstado(f.getEstado().name());
        dto.setSubtotal(f.getSubtotal());
        dto.setImpuestos(f.getImpuestos());
        dto.setTotal(f.getTotal());
        dto.setObservaciones(f.getObservaciones());
        dto.setItems(f.getItems().stream().map(this::convertirItemADTO).collect(Collectors.toList()));
        return dto;
    }

    private ItemFacturaDTO convertirItemADTO(ItemFactura i) {
        return new ItemFacturaDTO(i.getId(), i.getProductoCodigo(), i.getProductoNombre(), 
                i.getPrecioUnitario(), i.getCantidad(), i.getSubtotal());
    }
}
