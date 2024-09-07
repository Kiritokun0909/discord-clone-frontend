import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2f3136] text-[#8e9297] py-4 text-sm">
      <div className="container mx-auto flex justify-between items-center px-4">
        <span className="font-bold">Discord Clone</span>
        <div className="text-right">
          
          <ul className="list-none">
            <li><span className="font-bold">Created by:</span> n20dccn009@student.ptithcm.edu.vn</li>
            <li>n20dccn018@student.ptithcm.edu.vn</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
