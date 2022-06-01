const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold">
        Ooooops ! 😬
      </h1>
      <p className="text-sm sm:text-md md:text-lg">No route match</p>
    </div>
  );
};

export default NotFound;
