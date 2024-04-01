import React, { useState, useEffect } from "react";
import { ArrayAgrupaciones } from "../../firebase";
import './Buscador.css'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div id="Buscador">
      <input
        id="Text-buscador"
        type="text"
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        placeholder="Busca por nombre"
      />
    </div>
  );
};

const FilterButton = ({ selectedFilters, setSelectedFilters, setSearchTerm, showFilters }) => {
  const [background1, setBackground] = useState("");
  useEffect(() => {
    const storage = getStorage();
    const storageRef = ref(storage, "/fondos/filtros1.png");
    getDownloadURL(storageRef)
      .then((url) => {
        setBackground(url);
      })
      .catch((error) => {
        console.log("Error getting image URL:", error);
      });
  }, []);
  const [isOpen, setIsOpen] = useState(showFilters);
  const resetFilter = () => {
    setSearchTerm("");
    setSelectedFilters([]);
  };
  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(showFilters);
  }, [showFilters]);

  const setCategoryFilter = (category) => {
    if (selectedFilters.includes(category)) {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== category));
    } else {
      setSelectedFilters([...selectedFilters, category]);
    }
  };

  return (
    
    <div>
      
      <button id="FilterButton" onClick={toggleFilter} style={{ 
      backgroundImage: `url(${background1})`
    }}>
      </button>
      <div id="Zona-filtro" style={{display: isOpen ? 'block' : 'none'}}>
      
</div>
<div id="x" style={{display: isOpen ? 'block' : 'none'}}>
  <button className="boton-x"onClick={toggleFilter}>X</button>
  </div>
<div style={{display: isOpen ? 'block' : 'none'}}>
  
  <div id="mostrarcat">Filtros: {selectedFilters.join(', ')}</div>
<div id="filtrarpor">
      Filtrar por:
      </div>
<div id="Cuadro-categ">
        Categorías
        </div>
        <div id="Ciencias">
        <button className="buttonfilt" onClick={() => setCategoryFilter("Ciencias")}>
          Ciencias
        </button>
        </div>
        <div id="Humanidades">
        <button className="buttonfilt" onClick={() => setCategoryFilter("Humanidades")}>Humanidades</button>
        </div>
        <div id="Politica">
        <button className="buttonfilt" onClick={() => setCategoryFilter("Politica")}>
          Politica
        </button>
        </div>
        <div id ="Arte">
        <button className="buttonfilt" onClick={() => setCategoryFilter("Artes")}>Artes</button>
        </div>
        <div id ="cuadro-disponible">
        Disponibilidad
        </div>
        <div id="disponible">
        <button className="buttonfilt" onClick={() => setCategoryFilter("disponible")}>
          Disponible
        </button>
        </div>
        <div id="noDisponible">
        <button className="buttonfilt" onClick={() => setCategoryFilter("no disponible")}>
          No disponible
        </button>
        </div>
        <div id="quitar-filtros">
        <button className="buttonfilt" onClick={resetFilter}>Quitar filtros</button>
        </div>
       
        <div id ="linea1"></div>
        <div id ="linea2"></div>
        <div id ="linea3"></div>
        <div id ="linea4"></div>
    </div>
    </div>
  );
};

const Buscaragrup = () => {
  
  const [agrupaciones, setAgrupaciones] = useState([]);
  const [initialAgrupaciones, setInitialAgrupaciones] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [background, setBackground] = useState("");

  useEffect(() => {
    const storage = getStorage();
    const storageRef = ref(storage, "/fondos/metropolitana.jpg");
    getDownloadURL(storageRef)
      .then((url) => {
        setBackground(url);
      })
      .catch((error) => {
        console.log("Error getting image URL:", error);
      });
  }, []);

  const resetFilter = () => {
    setSearchTerm("");
    setSelectedFilters([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await ArrayAgrupaciones();
      setInitialAgrupaciones(data);
      setAgrupaciones(data);
    };

    fetchData();

    const timer = setTimeout(() => {
      setAgrupaciones(initialAgrupaciones);
    }, 3000);


    return () => clearTimeout(timer);
  }, []);


  const filtraragrupa = initialAgrupaciones.filter((agrupacion) => {
    const matchedCategory =
      selectedFilters.length > 0
        ? selectedFilters.some((filter) => agrupacion.categorias.includes(filter))
        : true;

    return (
      agrupacion.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
      matchedCategory
    );
  });

  
  useEffect(() => {
    setSearchTerm("");
    setSelectedFilters([]);
  }, []);
 
  
  return (
    <div>
    <div className="image-container"style={{ 
      backgroundImage: `url(${background})`
    }}>
      </div>
      <div>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        resetFilter={resetFilter}
      />
      <FilterButton
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        setSearchTerm={setSearchTerm}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />
      <div className="agrupacion-grid">
        {filtraragrupa.map((agrupacion, index) => (
          <div key={agrupacion.nombre} className="agrupacion-col">
            <div className="cuadrito">
            <a href={`/agrupacion/` + agrupacion.nombre}>
              <img src={agrupacion.imageUrl} alt={agrupacion.nombre} />
              <div id="nombreagrup">
              <h2>{agrupacion.nombre}</h2>
              </div>
            </a>
            </div>
            {index % 2 === 1 && <div className="agrupacion-separator"></div>}
            
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Buscaragrup;