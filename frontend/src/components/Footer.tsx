

const Footer = () => {
  return (
    <footer className='absolute bottom-0 w-full transition-all'>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          
          <div className="flex flex-1 items-stretch justify-start">
            {/* Add your content here */}
          </div>
                
          <div className=" inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Add your content here */}
          </div>
          
        </div>
      </div>
      <div className="relative h-4 w-full">
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-sm  mt-2  text-dark">© 2024 by @rudra</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
