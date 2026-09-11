# Especificación de Mejora: Ocultar Datos Sensibles (Seguridad)

## 1. Información General
- **ID de la Mejora:** 04
- **Referencia del Relevamiento:** A-002 (H-007)
- **Fecha:** 2026-09-11
- **Rama de trabajo:** `feature/seguridad-datos-sensibles`

## 2. Descripción del Problema
Según el hallazgo H-007, el formulario de alta crea una contraseña fija predecible (`"1234"`) para los nuevos clientes y la ficha del cliente expone la contraseña en texto plano en la interfaz de usuario. Esto representa un riesgo alto de exposición de información sensible.

## 3. Alcance de la Mejora
- Eliminar la asignación de contraseña predeterminada y predecible al dar de alta un cliente en el componente `FormCliente.jsx`.
- Eliminar el renderizado de la etiqueta de contraseña y el valor correspondiente en el componente `DetalleCliente.jsx`.

## 4. Archivos a Modificar
- `src/components/FormCliente.jsx`
- `src/pages/DetalleCliente.jsx`

## 5. Criterios de Aceptación
- Al crear un cliente desde el formulario, el objeto `nuevoCliente` enviado a la API no contiene la propiedad `password: "1234"`.
- Al visitar el detalle de un cliente en la URL `/clientes/:id`, la sección "Credenciales" ya no muestra la contraseña en texto plano.
