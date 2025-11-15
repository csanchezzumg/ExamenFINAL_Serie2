package com.umg.logistica.componentea.service;

import com.umg.logistica.componentea.dto.ClienteDTO;
import com.umg.logistica.componentea.model.Cliente;
import com.umg.logistica.componentea.repository.ClienteRepository;
import com.umg.logistica.shared.util.LogisticaUtils; // Aquí se importa la utilidad compartida
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ClienteService {

    private static final Logger logger = LoggerFactory.getLogger(ClienteService.class);

    @Autowired
    private ClienteRepository clienteRepository;

    public List<ClienteDTO> listarTodos() {
        logger.info("Listando todos los clientes");
        return clienteRepository.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    public ClienteDTO obtenerPorId(Long id) {
        logger.info("Obteniendo cliente con ID: {}", id);
        return clienteRepository.findById(id)
                .map(this::convertirADTO)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado con ID: " + id));
    }

    public ClienteDTO obtenerPorCodigo(String codigo) {
        logger.info("Obteniendo cliente con código: {}", codigo);
        return clienteRepository.findByCodigo(codigo)
                .map(this::convertirADTO)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado con código: " + codigo));
    }

    public ClienteDTO crear(ClienteDTO dto) {
        logger.info("Creando nuevo cliente: {}", dto.getNombre());

        Cliente cliente = new Cliente();
        // Aquí se utiliza el método del componente C
        cliente.setCodigo(LogisticaUtils.generarCodigoUnico("CLIENTE"));
        cliente.setNombre(dto.getNombre());
        cliente.setEmail(dto.getEmail());
        cliente.setTelefono(dto.getTelefono());
        cliente.setDireccion(dto.getDireccion());
        cliente.setNit(dto.getNit());
        cliente.setActivo(true);

        Cliente guardado = clienteRepository.save(cliente);
        logger.info("Cliente creado con código: {}", guardado.getCodigo());

        return convertirADTO(guardado);
    }

    public ClienteDTO actualizar(Long id, ClienteDTO dto) {
        logger.info("Actualizando cliente con ID: {}", id);

        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado con ID: " + id));

        cliente.setNombre(dto.getNombre());
        cliente.setEmail(dto.getEmail());
        cliente.setTelefono(dto.getTelefono());
        cliente.setDireccion(dto.getDireccion());
        cliente.setNit(dto.getNit());

        if (dto.getActivo() != null) {
            cliente.setActivo(dto.getActivo());
        }

        Cliente actualizado = clienteRepository.save(cliente);
        return convertirADTO(actualizado);
    }

    public void eliminar(Long id) {
        logger.info("Eliminando cliente con ID: {}", id);
        clienteRepository.deleteById(id);
    }

    private ClienteDTO convertirADTO(Cliente cliente) {
        ClienteDTO dto = new ClienteDTO();
        dto.setId(cliente.getId());
        dto.setCodigo(cliente.getCodigo());
        dto.setNombre(cliente.getNombre());
        dto.setEmail(cliente.getEmail());
        dto.setTelefono(cliente.getTelefono());
        dto.setDireccion(cliente.getDireccion());
        dto.setNit(cliente.getNit());
        dto.setActivo(cliente.getActivo());
        return dto;
    }
}
