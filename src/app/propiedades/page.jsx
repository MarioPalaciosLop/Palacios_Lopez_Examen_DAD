"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

async function cargarPropiedadesAPI() {
  try {
    const response = await axios.get('/api/propiedades');
    return response.data;
  } catch (error) {
    console.error('Error loading propiedades:', error);
    return [];
  }
}

function PropiedadList() {

  const [propiedades, setPropiedades] = useState([]);
  
  useEffect(() => {
    const fetchPropiedades = async () => {
      const propiedadesData = await cargarPropiedadesAPI();
      setPropiedades(propiedadesData);
    };
    fetchPropiedades();
  }, []);

  const deletepropierity = async (propierityId) => {
    try {
      if (confirm('Estas seguro de eliminar la propiedad?')) {
        const res = await axios.delete(`/api/propiedades/${propierityId}`);
        if (res.status === 204) {
          setPropiedades((prevpropiedades) =>
            prevpropiedades.filter((propierity) => propierity.id !== propierityId)
          );
        }
      }
    } catch (error) {
      console.error('Error deleting propierity:', error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-extrabold dark:text-white m-8">
        propiedades {' '}
        <a href="/propiedades/new" className="bg-blue-500
         hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 
         rounded mt-5">
          Nuevo
        </a>
      </h2>
      <div className='shadow-md rounded-md px-8 pt-6 pb-8 mb-4'>
        <table className='min-w-full text-left text-sm font-light'>
          <thead>
            <tr className='border-b font-medium bg-gray-300'>
              <th>Options</th>
              <th>ID</th>
              <th>Nombre</th>
              <th>Direccion</th>
              <th>Caracteristicas</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {propiedades.map((iterador, index) => {
              return (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="whitespace-nowrap px-6 py-4"> <button
                    className="text-white bg-red-500 hover:bg-red-700 py-2 px-3 rounded"
                    onClick={() => deletepropierity(iterador.id)}
                  >
                    Delete
                  </button>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{iterador.id}</td>
                  <td className="whitespace-nowrap px-6 py-4">{iterador.nombre}</td>
                  <td className="whitespace-nowrap px-6 py-4">{iterador.direccion}</td>
                  <td className="whitespace-nowrap px-6 py-4">{iterador.caracteristicas}</td>
                  <td className="whitespace-nowrap px-6 py-4">{iterador.estado}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default PropiedadList