const SettingsAdmin = () => {
    return (
      <div className="h-[370px]">
        <h2 className="text-2xl font-bold my-[10px] mx-[1.5rem]">Settings</h2>
        <div className="grid grid-cols-2 gap-4 m-[1.5rem]">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-bold mb-2">General Settings</h3>
            {/* Render general settings form */}
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-bold mb-2">Notification Settings</h3>
            {/* Render notification settings form */}
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-bold mb-2">Security Settings</h3>
            {/* Render security settings form */}
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-bold mb-2">Integration Settings</h3>
            {/* Render integration settings form */}
          </div>
        </div>
      </div>
    );
  };

  export default SettingsAdmin