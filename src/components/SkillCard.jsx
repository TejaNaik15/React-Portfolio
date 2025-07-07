import React from 'react';

const SkillCard = ({ name, icon: IconComponent }) => {
  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
      {IconComponent && <IconComponent className="text-5xl text-accent-pink mb-4" />}
      <h3 className="text-xl font-semibold text-white">{name}</h3>
    </div>
  );
};

export default SkillCard;