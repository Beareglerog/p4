package com.api.P4.api.P4.controller;

import com.api.P4.api.P4.model.CarritoItem;
import com.api.P4.api.P4.service.CarritoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carrito")
@CrossOrigin(origins = "*")
public class CarritoController {

    private final CarritoService service;

    public CarritoController(CarritoService service) {
        this.service = service;
    }

    // Leer: obtener todos los productos del carrito
    @GetMapping
    public List<CarritoItem> obtenerCarrito() {
        return service.obtenerTodos();
    }

    // Crear: agregar un producto al carrito
    @PostMapping
    public ResponseEntity<CarritoItem> agregarItem(@RequestBody CarritoItem item) {
        return ResponseEntity.ok(service.agregar(item));
    }

    // Actualizar: modificar un producto existente
    @PutMapping("/{id}")
    public ResponseEntity<CarritoItem> actualizarItem(@PathVariable Long id, @RequestBody CarritoItem item) {
        return service.actualizar(id, item)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Borrar: eliminar un producto por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarItem(@PathVariable Long id) {
        return service.eliminar(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
