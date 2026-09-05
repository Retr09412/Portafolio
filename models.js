/**
 * CONFIGURACIÓN DE MODELOS 3D
 * ===========================
 * 
 * Para agregar tus modelos, edita este archivo y añade un objeto al array 'models'.
 * 
 * FORMATOS SOPORTADOS:
 * - STL: Geometría (peso alto) - https://en.wikipedia.org/wiki/STL_(file_format)
 * - GLB/GLTF: Recomendado (peso menor, calidad alta)
 * - OBJ: Clásico (peso medio)
 * 
 * CÓMO AGREGAR UN MODELO:
 * 1. Pon tu archivo .stl, .glb, .gltf o .obj en la carpeta "models/"
 * 2. Añade una entrada al array 'models' con la siguiente estructura:
 * 
 * {
 *   id: 'nombre-unico',          // Identificador único (sin espacios)
 *   name: 'Nombre del Modelo',    // Nombre que se muestra
 *   file: 'archivo.stl',         // Nombre del archivo en la carpeta models/
 *   format: 'STL',               // Formato: 'STL', 'GLB', 'GLTF', 'OBJ'
 *   size: '2.5 MB',              // Tamaño del archivo (para mostrar)
 *   description: 'Descripción',  // Descripción del modelo
 *   category: 'producto',        // Categoría: 'producto', 'arquitectura', 'organico', 'abstracto'
 *   color: 0x6366f1              // Color hexadecimal del material (opcional)
 * }
 */

const models = [
    // ============================================
    // TUS MODELOS STL AQUÍ
    // ============================================
    
    {
        id: 'batimovil',
        name: 'Batimóvil',
        file: 'batimovil.stl',
        format: 'STL',
        size: '3.4 MB',
        description: 'Modelo 3D del Batimóvil de Batman. Diseñado en Blender con geometría detallada.',
        category: 'vehiculo',
        color: 0x000000,
        rotation: { x: -1.5708, y: 0, z: 0 }
    },
    
    // ============================================
    // AGREGA MÁS MODELOS STL/AQUÍ
    // ============================================
    // Ejemplo:
    // {
    //     id: 'mi-producto',
    //     name: 'Mi Producto',
    //     file: 'mi-producto.stl',
    //     format: 'STL',
    //     size: '1.5 MB',
    //     description: 'Descripción de mi producto 3D.',
    //     category: 'producto',
    //     color: 0x6366f1
    // },
];

// Categorías disponibles
const categories = {
    all: { name: 'Todos', icon: 'fa-th' },
    producto: { name: 'Productos', icon: 'fa-box' },
    arquitectura: { name: 'Arquitectura', icon: 'fa-building' },
    organico: { name: 'Orgánico', icon: 'fa-leaf' },
    abstracto: { name: 'Abstracto', icon: 'fa-shapes' },
    vehiculo: { name: 'Vehículos', icon: 'fa-car' }
};
