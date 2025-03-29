package com.api.P4.api.P4.service;

import com.api.P4.api.P4.model.CarritoItem;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CarritoService {
    private Map<Long, CarritoItem> carrito = new HashMap<>();
    private Long nextId = 1L;

    public List<CarritoItem> obtenerTodos() {
        return new ArrayList<>(carrito.values());
    }

    public CarritoItem agregar(CarritoItem item) {
        item.setId(nextId++);
        carrito.put(item.getId(), item);
        return item;
    }

    public Optional<CarritoItem> actualizar(Long id, CarritoItem itemActualizado) {
        CarritoItem existente = carrito.get(id);
        if (existente != null) {
            existente.setNombre(itemActualizado.getNombre());
            existente.setPrecio(itemActualizado.getPrecio());
            existente.setCantidad(itemActualizado.getCantidad());
            return Optional.of(existente);
        }
        return Optional.empty();
    }

    public boolean eliminar(Long id) {
        return carrito.remove(id) != null;
    }
}
