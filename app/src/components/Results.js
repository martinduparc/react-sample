import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import './css/results.css';

const Results = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [raceData, setRaceData] = useState({Circuit: {circuitName: ''}, Results: []});
  const [error, setError] = useState(null);
  const { season, round } = useParams();

  useEffect(() => {
    fetch(`//localhost:3003/api/f1/${season}/${round}/results.json`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setRaceData(result.MRData.RaceTable.Races[0]);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [round, season]);

  if (error) {
    return <h3 className="errMsg">Error: {error.message}</h3>;
  }
  else if (!isLoaded) {
    return (
      <LoadingSpinner />
    );
  }
  else {
    return (<>
      <h1 className="mb-6 text-3xl font-extrabold text-gray-900">
        <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" className="align-sub h-8 w-8 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
          </svg>
        </Link>
        Results for {raceData.Circuit.circuitName}
      </h1>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {raceData.Results.map(item => (
                    <tr key={item.position}>
                      <td className="px-6 py-4 whitespace-nowrap">{item.position === '1' ? '🏆' : item.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.Driver.givenName} {item.Driver.familyName}</td>
                    </tr>
                  ))}                      
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
    </>);
  }
}

export default Results;