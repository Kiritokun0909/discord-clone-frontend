import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../hooks/reduxHooks';
import { useNavigate, useParams } from 'react-router-dom';

interface Server {
  id: number;
  name: string;
  icon: string;
}

const servers: Server[] = [
  { id: 0, name: 'Me', icon: 'D' }, // Discord logo representation
  { id: 1, name: 'Server 1', icon: '🌟' },
  { id: 2, name: 'Server 2', icon: '🚀' },
  { id: 3, name: 'Server 3', icon: '🌈' },
];

const ServerPage: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const navigate = useNavigate();
  const { serverId } = useParams<{ serverId: string }>();

  useEffect(() => {
    if (serverId) {
      const server = servers.find(s => s.id === parseInt(serverId));
      if (server) {
        setSelectedServer(server);
      } else {
        // If invalid serverId, default to the first server
        setSelectedServer(servers[0]);
        navigate(`/channels/${servers[0].id}`);
      }
    } else {
      // If no serverId in URL, default to the first server
      setSelectedServer(servers[0]);
      navigate(`/channels/${servers[0].id}`);
    }
  }, [serverId, navigate]);

  const handleServerClick = (server: Server) => {
    setSelectedServer(server);
    navigate(`/channels/${server.id}`);
  };

  return (
    <div className="flex h-screen bg-gray-800 text-white">
      {/* Sidebar */}
      <div className="w-20 bg-gray-900 p-3 flex flex-col items-center">
        {servers.map((server, index) => (
          <React.Fragment key={server.id}>
            <div className="relative group">
              <button
                className={`w-12 h-12 rounded-full mb-2 flex items-center justify-center text-2xl ${
                  selectedServer?.id === server.id ? 'bg-indigo-500' : 'bg-gray-700 hover:bg-gray-600'
                } ${server.id === 0 ? 'bg-blue-600 hover:bg-blue-500' : ''}`}
                onClick={() => handleServerClick(server)}
              >
                {server.id === 0 ? (
                  <span className="font-bold text-white">D</span>
                ) : (
                  server.icon
                )}
              </button>
              <div className="absolute top-0 left-full ml-2 bg-black text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-0 group-hover:w-[100px] overflow-hidden">
                <p className="p-2">{server.name}</p>
              </div>
            </div>
            {server.id === 0 && (
              <div className="w-8 h-0.5 bg-gray-700 mb-2"></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {selectedServer ? (
          <h2 className="text-2xl mb-4">
            {selectedServer.id === 0
              ? `Welcome, ${user.username}!`
              : `Welcome to ${selectedServer.name}!`}
          </h2>
        ) : (
          <h2 className="text-2xl mb-4">Select a server to get started</h2>
        )}
        <p>Here you can manage your servers, channels, and messages.</p>
      </div>
    </div>
  );
};

export default ServerPage;
