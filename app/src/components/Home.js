import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const Home = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [races, setRaces] = useState({RaceTable: {season: '', Races: []}});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('//localhost:3003/api/f1/current.json')
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setRaces(result.MRData);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <h3 className="errMsg">Error: {error.message}</h3>;
  }
  else if (!isLoaded) {
    return (
      <LoadingSpinner />
    );
  }
  else {
    return (
      <>
        <h1 className="mb-6 text-3xl font-extrabold text-gray-900">
          {races.RaceTable.season} Races
        </h1>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Round</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {races.RaceTable.Races.map(item => (
                      <tr key={item.round}>
                        <td className="px-6 py-4 whitespace-nowrap">{item.round}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.raceName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link className="text-indigo-600 hover:text-indigo-900" to={`/results/${races.RaceTable.season}/${item.round}`}>See results 🏁</Link>
                        </td>
                      </tr>
                    ))}                    
                  </tbody>
                </table>
                </div>
              </div>
            </div>
          </div>
      </>
    );
  }
}

export default Home;