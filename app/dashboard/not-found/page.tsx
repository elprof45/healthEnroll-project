const NotFoundPage = () => {
  return (
    <>
      <main className="w-full h-screen flex flex-col items-center">
        <div className="max-w-md w-full text-gray-600 space-y-2 shadow-sm rounded px-12 py-0 bg-gray-100">
          <div className="text-center">
            <div className="my-2">
              <h3 className="text-gray-800 text-xl font-bold sm:text-xl">
                Not found
              </h3>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFoundPage;
