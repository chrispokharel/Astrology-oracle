
import React, { useState } from 'react';
import { OracleFormData } from '../types';

interface OracleFormProps {
  onSubmit: (formData: OracleFormData) => void;
}

const OracleForm: React.FC<OracleFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<OracleFormData>({
    name: '',
    dob: '',
    tob: '',
    pob: '',
  });

  const [errors, setErrors] = useState<Partial<OracleFormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<OracleFormData> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.tob) newErrors.tob = 'Time of birth is required';
    if (!formData.pob) newErrors.pob = 'Place of birth is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-purple-200 mb-1">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-white/10 border-2 border-transparent focus:border-purple-400 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-0 transition-colors"
            placeholder="e.g., Jane Doe"
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="dob" className="block text-sm font-medium text-purple-200 mb-1">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full bg-white/10 border-2 border-transparent focus:border-purple-400 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-0 transition-colors"
          />
          {errors.dob && <p className="text-red-400 text-xs mt-1">{errors.dob}</p>}
        </div>
        <div>
          <label htmlFor="tob" className="block text-sm font-medium text-purple-200 mb-1">Time of Birth</label>
          <input
            type="time"
            id="tob"
            name="tob"
            value={formData.tob}
            onChange={handleChange}
            className="w-full bg-white/10 border-2 border-transparent focus:border-purple-400 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-0 transition-colors"
          />
          {errors.tob && <p className="text-red-400 text-xs mt-1">{errors.tob}</p>}
        </div>
        <div>
          <label htmlFor="pob" className="block text-sm font-medium text-purple-200 mb-1">Place of Birth</label>
          <input
            type="text"
            id="pob"
            name="pob"
            value={formData.pob}
            onChange={handleChange}
            className="w-full bg-white/10 border-2 border-transparent focus:border-purple-400 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-0 transition-colors"
            placeholder="e.g., London, UK"
          />
          {errors.pob && <p className="text-red-400 text-xs mt-1">{errors.pob}</p>}
        </div>
      </div>
      <div className="pt-4 text-center">
        <button
          type="submit"
          className="w-full md:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold py-3 px-12 rounded-full shadow-lg hover:shadow-yellow-400/50 transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-300"
        >
          Reveal My Destiny
        </button>
      </div>
    </form>
  );
};

export default OracleForm;
