import React, { useState, useEffect } from "react";
import { ArrayAgrupaciones } from "../../firebase";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>
      <input
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
      <button onClick={toggleFilter}>
        {selectedFilters.length > 0 &&
          `Categorías: ${selectedFilters.join(", ")}`}
        {selectedFilters.length === 0 && "Filtro"}
      </button>
      {isOpen && (
        <>
          <h1>Disponibilidad:</h1>
          <button onClick={() => setCategoryFilter("disponible")}>
            Disponible
          </button>
          <button onClick={() => setCategoryFilter("no disponible")}>
            No disponible
          </button>
          <h1>Categorías:</h1>
          <button onClick={() => setCategoryFilter("Artes")}>Artes</button>
          <button onClick={() => setCategoryFilter("Politica")}>
            Politica
          </button>
          <button onClick={() => setCategoryFilter("Lucha")}>Lucha</button>
          <button onClick={resetFilter}>Quitar filtros</button>
        </>
      )}
    </div>
  );
};

const Buscaragrup = () => {
  const [agrupaciones, setAgrupaciones] = useState([]);
  const [initialAgrupaciones, setInitialAgrupaciones] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const resetFilter = () => {
    setSearchTerm("");
    setSelectedFilters([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await ArrayAgrupaciones();
      setAgrupaciones(data);
      setInitialAgrupaciones(data); 
    };

    fetchData();
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
      <div>
        {filtraragrupa.map((agrupacion) => (
          <a key={agrupacion.nombre}href={`/agrupacion/` + agrupacion.nombre}>
            <img src={agrupacion.imageUrl} alt={agrupacion.nombre} />
            <h2>{agrupacion.nombre}</h2>
          </a>
        ))}
     </div>
    </div>
  );
};

export default Buscaragrup;