import React, { useState, useEffect } from "react";
import { getAllPrograms } from "../api/services/ProgramService";
import { createApplication } from "../api/services/ApplicationService";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
    birthDate: "",
    university: "",
    field_of_study: "",
    internship_period: "",
    programIds: [],
  });

  const [cv, setCv] = useState(null);
  const [motivationLetter, setMotivationLetter] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await getAllPrograms();
        setPrograms(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des départements:", error);
      }
    };

    fetchPrograms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProgramChange = (programId) => {
    setFormData((prevState) => {
      const alreadySelected = prevState.programIds.includes(programId);
      let updatedPrograms = alreadySelected
        ? prevState.programIds.filter((id) => id !== programId)
        : [...prevState.programIds, programId];

      return { ...prevState, programIds: updatedPrograms };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      if (cv) data.append("cv", cv);
      if (motivationLetter) data.append("motivationLetter", motivationLetter);

      await createApplication(data);
      setMessage("Votre candidature a été soumise avec succès !");
      setIsError(false);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        gender: "",
        birthDate: "",
        university: "",
        field_of_study: "",
        internship_period: "",
        programIds: [],
      });
      setCv(null);
      setMotivationLetter(null);
    } catch (error) {
      const msg = error?.response?.data?.message || "Une erreur est survenue. Email déjà utilisé ?";
      setMessage(msg);
      setIsError(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-md border">
      <h2 className="text-2xl font-bold text-[#002D62] mb-6 text-center">Formulaire de candidature</h2>

      {message && (
        <div className={`mb-4 text-center text-sm ${isError ? "text-red-600" : "text-green-600"}`}>{message}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Prénom *</label>
          <input name="first_name" value={formData.first_name} onChange={handleChange} required placeholder="Prénom" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Nom *</label>
          <input name="last_name" value={formData.last_name} onChange={handleChange} required placeholder="Nom" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email (Optionnel)</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="ex: ali@gmail.com" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Téléphone *</label>
          <input name="phone" value={formData.phone} onChange={handleChange} required placeholder="Téléphone" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Genre *</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full p-2 border rounded">
            <option value="">Sélectionner le genre</option>
            <option value="Male">Homme</option>
            <option value="Female">Femme</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date de naissance *</label>
          <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ecole / Université / Institut *</label>
          <input name="university" value={formData.university} onChange={handleChange} required placeholder="Etablissement" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Domaine d'étude *</label>
          <input name="field_of_study" value={formData.field_of_study} onChange={handleChange} required placeholder="Ex: Informatique" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Durée du stage *</label>
          <select name="internship_period" value={formData.internship_period} onChange={handleChange} required className="w-full p-2 border rounded">
            <option value="">Sélectionnez</option>
            <option value="1">1 mois</option>
            <option value="2">2 mois</option>
            <option value="3">3 mois</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sélectionnez jusqu'à 3 départements *</label>
          <div className="border p-2 rounded">
            {programs.map((program) => (
              <div key={program.id} className="flex items-center mb-1">
                <input type="checkbox" id={`program-${program.id}`} value={program.id} checked={formData.programIds.includes(program.id)} onChange={() => handleProgramChange(program.id)} className="mr-2" disabled={!formData.programIds.includes(program.id) && formData.programIds.length >= 3} />
                <label htmlFor={`program-${program.id}`}>{program.name}</label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Importer un CV *</label>
          <input type="file" onChange={(e) => setCv(e.target.files[0])} required className="w-full text-sm text-gray-500 file:bg-blue-50 file:text-blue-700 file:rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Importer une lettre de motivation *</label>
          <input type="file" onChange={(e) => setMotivationLetter(e.target.files[0])} required className="w-full text-sm text-gray-500 file:bg-blue-50 file:text-blue-700 file:rounded-md" />
        </div>
        <div className="mt-6 p-4 border border-red-500 bg-red-50 rounded text-sm">
          <p className="font-semibold text-red-600 mb-2">
            Après acceptation de votre demande, vous devez fournir les documents suivants :
          </p>
          <ul className="list-disc list-inside">
            <li>Casier judiciaire datant de moins de 3 mois</li>
            <li>Deux photos d'identité</li>
            <li>Copie légalisée de la carte d'identité</li>
            <li>Copie légalisée de l'acte de naissance</li>
            <li>Test de l'hépatite B (pour les candidats à la cuisine)</li>
            <li>Attestation d'assurance de l'établissement</li>
          </ul>
        </div>
                <button type="submit" className="w-full bg-[#002D62] text-white p-2 rounded hover:bg-blue-700">Soumettre la candidature</button>

      </form>
    </div>
  );
};

export default ApplicationForm;
