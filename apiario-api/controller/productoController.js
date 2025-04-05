import Producto from '../models/producto.js'; // Incluye la extensión .js

// Obtener todos los productos
export const getProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un producto por ID
export const getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo producto
export const createProducto = async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body);
    const { id_inventario, Nombre, Precio, Stock, id_apiario, Fecha } = req.body;
    if (!Fecha) {
      return res.status(400).json({ message: "La fecha no fue ingresada" });
    }

    const nuevoProducto = await Producto.create({ id_inventario, Nombre, Precio, Stock, id_apiario, Fecha });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un producto existente
export const updateProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (producto) {
      const { id_inventario, Nombre, Precio, Stock, id_apiario, Fecha } = req.body;
      await producto.update({ id_inventario, Nombre, Precio, Stock, id_apiario, Fecha });
      res.json(producto);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un producto
export const deleteProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (producto) {
      await producto.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
