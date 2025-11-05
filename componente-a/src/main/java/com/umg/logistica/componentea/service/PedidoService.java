package com.umg.logistica.componentea.service;

import com.umg.logistica.componentea.dto.ItemPedidoDTO;
import com.umg.logistica.componentea.dto.PedidoDTO;
import com.umg.logistica.componentea.model.Cliente;
import com.umg.logistica.componentea.model.ItemPedido;
import com.umg.logistica.componentea.model.Pedido;
import com.umg.logistica.componentea.repository.ClienteRepository;
import com.umg.logistica.componentea.repository.PedidoRepository;
import com.umg.logistica.shared.util.LogisticaUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PedidoService {

    private static final Logger logger = LoggerFactory.getLogger(PedidoService.class);

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    public List<PedidoDTO> listarTodos() {
        logger.info("Listando todos los pedidos");
        return pedidoRepository.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    public PedidoDTO obtenerPorId(Long id) {
        logger.info("Obteniendo pedido con ID: {}", id);
        return pedidoRepository.findById(id)
                .map(this::convertirADTO)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado con ID: " + id));
    }

    public PedidoDTO crear(PedidoDTO dto) {
        logger.info("Creando nuevo pedido para cliente ID: {}", dto.getClienteId());

        Cliente cliente = clienteRepository.findById(dto.getClienteId())
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado con ID: " + dto.getClienteId()));

        Pedido pedido = new Pedido();
        pedido.setCodigo(LogisticaUtils.generarCodigoUnico("PEDIDO"));
        pedido.setCliente(cliente);
        pedido.setFechaPedido(LocalDateTime.now());
        pedido.setEstado(Pedido.EstadoPedido.PENDIENTE);
        pedido.setObservaciones(dto.getObservaciones());

        // Agregar items
        for (ItemPedidoDTO itemDTO : dto.getItems()) {
            ItemPedido item = new ItemPedido();
            item.setProductoCodigo(itemDTO.getProductoCodigo());
            item.setProductoNombre(itemDTO.getProductoNombre());
            item.setPrecioUnitario(itemDTO.getPrecioUnitario());
            item.setCantidad(itemDTO.getCantidad());
            pedido.addItem(item);
        }

        // Calcular totales
        pedido.calcularTotales();

        Pedido guardado = pedidoRepository.save(pedido);
        logger.info("Pedido creado con código: {}", guardado.getCodigo());

        return convertirADTO(guardado);
    }

    public void eliminar(Long id) {
        logger.info("Eliminando pedido con ID: {}", id);
        pedidoRepository.deleteById(id);
    }

    private PedidoDTO convertirADTO(Pedido pedido) {
        PedidoDTO dto = new PedidoDTO();
        dto.setId(pedido.getId());
        dto.setCodigo(pedido.getCodigo());
        dto.setClienteId(pedido.getCliente().getId());
        dto.setClienteNombre(pedido.getCliente().getNombre());
        dto.setFechaPedido(pedido.getFechaPedido());
        dto.setEstado(pedido.getEstado().name());
        dto.setSubtotal(pedido.getSubtotal());
        dto.setImpuestos(pedido.getImpuestos());
        dto.setTotal(pedido.getTotal());
        dto.setObservaciones(pedido.getObservaciones());

        List<ItemPedidoDTO> itemsDTO = pedido.getItems().stream()
                .map(this::convertirItemADTO)
                .collect(Collectors.toList());
        dto.setItems(itemsDTO);

        return dto;
    }

    private ItemPedidoDTO convertirItemADTO(ItemPedido item) {
        ItemPedidoDTO dto = new ItemPedidoDTO();
        dto.setId(item.getId());
        dto.setProductoCodigo(item.getProductoCodigo());
        dto.setProductoNombre(item.getProductoNombre());
        dto.setPrecioUnitario(item.getPrecioUnitario());
        dto.setCantidad(item.getCantidad());
        dto.setSubtotal(item.getSubtotal());
        return dto;
    }
}
