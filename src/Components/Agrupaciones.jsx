import React from 'react'

const agrupacion = ({  nombre, foto= [] }) => {
    return (
      <div id={`agrupacion-${nombre}`} className="agrupacion">
        <div className="contenido-agrup">
          <h2>{nombre}</h2>

        </div>
      </div>
    )
  }
export default agrupacion