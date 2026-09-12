import "../css/listaclientes.css"
import { useState } from "react";
import { Link } from "react-router-dom";
import FormCliente from "../components/FormCliente";
import useClientes from "../hooks/useClientes";

const ListaClientes = () => {
  const { clientes, loading, error } = useClientes();
  const [busqueda, setBusqueda] = useState("");

  const clientesFiltrados = clientes.filter((cliente) => {
    const termino = busqueda.toLowerCase().trim();
    if (!termino) return true;

    const nombre = (cliente.name?.firstname || "").toLowerCase();
    const apellido = (cliente.name?.lastname || "").toLowerCase();
    const nombreCompleto = `${nombre} ${apellido}`.trim();
    const email = (cliente.email || "").toLowerCase();
    const ciudad = (cliente.address?.city || "").toLowerCase();

    return (
      nombre.includes(termino) ||
      apellido.includes(termino) ||
      nombreCompleto.includes(termino) ||
      email.includes(termino) ||
      ciudad.includes(termino)
    );
  });

  if (loading) {
    return <h2>Cargando clientes...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="clientes-container">

      <h1>Clientes</h1>
      <FormCliente />

      <hr />

      <div className="contenedor-buscador">

        <h2 className="titulo-buscador">
          Buscar Clientes
        </h2>

        <input
          className="buscador"
          type="text"
          placeholder="Buscar por nombre, apellido, email o ciudad"
          aria-label="Buscar clientes por nombre, apellido, email o ciudad"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <p className="cantidad-clientes">
          Clientes encontrados: {clientesFiltrados.length}
        </p>

      </div>
      <table className="tabla-clientes">

        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Ciudad</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>

          {clientesFiltrados.map((cliente) => (
            <tr key={cliente.id}>

              <td>{cliente.id}</td>

              <td>
                {cliente.name?.firstname || "-"} {cliente.name?.lastname || ""}
              </td>

              <td>{cliente.email || "-"}</td>

              <td>{cliente.phone || "-"}</td>

              <td>{cliente.address?.city || "-"}</td>

              <td>
                <Link
                  className="btn-ficha"
                  to={`/clientes/${cliente.id}`}
                >
                  Ver Ficha Completa
                </Link>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default ListaClientes;