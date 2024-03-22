import {useEffect, useRef, useState} from "react";
import axios from "axios";
import TomSelect from "../../base-components/TomSelect";



export default function Filieres({ onChange }){
  const [select, setSelect] = useState("0");

  const [filieres, setFilieres] = useState(null);
  const [loading, setLoading] = useState(false);
  const errorRef = useRef(null);

  const optionsRef = useRef([]);

  const handleChange = (nouvelleValeur) => {
    setSelect(nouvelleValeur);
    onChange(nouvelleValeur); // Envoyer la nouvelle valeur au composant parent
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://ynsmtkl.tech/api/filieres/all');
      setFilieres(response.data);
      optionsRef.current = response.data.map((filiere) => (
        <option key={filiere.id} value={filiere.id}>({filiere.abbreviation}) {filiere.nom}</option>
      ));
    } catch (error) {
      errorRef.current = error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (<>
          <div className="mt-3">
            <label>Filières</label>
            <div className="mt-2">
              {loading && <p>Chargement des filières...</p>}
              {errorRef.current && <p color="red">Problème de chargement des filières</p>}
              {filieres &&
                <TomSelect value={select} onChange={handleChange} options={{
                  placeholder: "Filière de l'étudiant",
                }} className="w-full">
                  {optionsRef.current}
                </TomSelect>
              }
            </div>
          </div>
        </>);
}

