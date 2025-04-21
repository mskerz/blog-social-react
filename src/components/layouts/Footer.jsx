const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-8 mb-0">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-lg font-">Kanban Board</h3>
              <p className="text-sm">A simulation task management with kanban method.</p>
            </div>
            <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-6 mt-4 sm:mt-0">
              <a href="#about" className="text-sm hover:text-gray-400">About Us</a>
              <a href="#services" className="text-sm hover:text-gray-400">Services</a>
              <a href="#contact" className="text-sm hover:text-gray-400">Contact</a>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-xs">&copy; 2025 Your Company. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;