
import React, { useState } from 'react';
import { OracleFormData, Prediction } from './types';
import { fetchPrediction } from './services/geminiService';
import OracleForm from './components/OracleForm';
import LoadingIndicator from './components/LoadingIndicator';
import PredictionDisplay from './components/PredictionDisplay';
import { StarsIcon } from './components/icons/StarsIcon';

const App: React.FC = () => {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (formData: OracleFormData) => {
    setIsLoading(true);
    setPrediction(null);
    setError(null);
    try {
      const result = await fetchPrediction(formData);
      setPrediction(result);
    } catch (err) {
      setError('The celestial energies are clouded at the moment. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetOracle = () => {
    setPrediction(null);
    setError(null);
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white font-sans p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <header className="text-center mb-8 w-full max-w-4xl">
        <div className="flex items-center justify-center gap-4 mb-2">
          <StarsIcon className="h-10 w-10 text-yellow-300" />
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-amber-400">
            Astrology Oracle
          </h1>
          <StarsIcon className="h-10 w-10 text-yellow-300 transform -scale-x-100" />
        </div>
        <p className="text-lg text-purple-200">
          Unveil your destiny by combining ancient Vedic wisdom with modern astrology.
        </p>
      </header>
      
      <main className="w-full max-w-4xl flex-grow">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">
          {!prediction && !isLoading && !error && (
            <OracleForm onSubmit={handleFormSubmit} />
          )}
          
          {isLoading && <LoadingIndicator />}

          {error && (
             <div className="text-center">
              <p className="text-red-400 text-lg mb-6">{error}</p>
              <button
                onClick={resetOracle}
                className="bg-purple-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          )}

          {prediction && (
            <div>
              <PredictionDisplay prediction={prediction} />
              <div className="text-center mt-8">
                <button
                  onClick={resetOracle}
                  className="bg-purple-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-colors duration-300"
                >
                  Consult Again
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <footer className="w-full max-w-4xl text-center mt-8 text-sm text-purple-300">
        <p>&copy; {new Date().getFullYear()} Astrology Oracle. Predictions are for entertainment purposes only.</p>
      </footer>
    </div>
  );
};

export default App;
