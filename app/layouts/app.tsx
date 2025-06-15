import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <>
      <header className="relative h-64 md:h-80 bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative container mx-auto px-4 py-6 flex flex-col items-center justify-center h-full">
          <div className="absolute top-4 right-4">
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 text-sm">
              <span className="material-icons text-base">add</span>
              <span>Subir vídeo</span>
            </button>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
            clipdex
          </h1>
          <div className="w-full max-w-xl">
            <div className="relative">
              <input
                className="w-full py-3 px-4 text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500 shadow"
                placeholder="Busca memes, momentazos, reacciones..."
                type="text"
              />
              <button className="absolute right-0 top-0 h-full px-4 py-3 text-gray-500 hover:text-red-500">
                <span className="material-icons">search</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-4 border-b border-gray-300">
            <button className="py-3 px-1 text-red-600 border-b-2 border-red-600 font-semibold flex items-center space-x-1">
              <span className="material-icons text-lg">trending_up</span>
              <span>Tendencia ahora</span>
            </button>
            <button className="py-3 px-1 text-gray-500 hover:text-gray-900 font-semibold flex items-center space-x-1">
              <span className="material-icons text-lg">star_border</span>
              <span>Más populares</span>
            </button>
            <button className="py-3 px-1 text-gray-500 hover:text-gray-900 font-semibold flex items-center space-x-1">
              <span className="material-icons text-lg">history</span>
              <span>Recientes</span>
            </button>
          </div>
          <div className="flex space-x-2 text-gray-500">
            <button className="hover:text-gray-900">
              <span className="material-icons">grid_view</span>
            </button>
            <button className="hover:text-gray-900">
              <span className="material-icons">view_list</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
              <img
                alt="Video thumbnail of a woman talking"
                className="w-full h-56 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtBYO6hyple-bn_Px0Ne0HzngjMxDpBeQObuytyciRyURe6VnA2zTzUDVxtbfKp6qlXMnaQUs-TBobQreFhWmvr4_YBqidhEk0AsRZu-OT-YiBjr-fUgmkDKkIYxGL0NVRFfTmvzi9pSBeBvuMjnG3ws4hU8D5z14JFQs_mKuOYcpCQbJZOCUYmYyS-dqrYEd-on0qbrkQnuCUbGs6qJ1S9fad7Gh1EfAOj4IZtm3Oiw4ktmkIImhfSel_fpKQcs4v62xyGEKE9Z-s"
              />
              <div className="absolute top-2 right-2 bg-black bg-opacity-40 p-1 rounded-full">
                <span className="material-icons text-white text-lg">
                  favorite_border
                </span>
              </div>
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 px-2 py-1 rounded text-xs text-white">
                <span className="material-icons text-sm align-middle">
                  volume_up
                </span>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
              <img
                alt="Video thumbnail of a TV game show"
                className="w-full h-56 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBViUXpTmCxF7Eu1x4z9IH4jcGXxjjgQihWwRy__7Y9Q64F6ANE_95Yk3EI4NviYDJBvGvGSX1aq2ROUc9EpZpuOaiQHBLo1cIqxDZjwrJegqrpi0DFbmekTKUoiD-BkKv-rg2Sr932jLysn08DYb91f19v6ak7JoznQaD625CpE36UEAx3swMEh1sLxi7I0mEs9WfSKrAhwXbDSEbWeBq5eZNp9XUn71WgxYukEnflXO1qZbQfbN-4goZmYstncGY1eYWEzwdRg4gY"
              />
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
              <img
                alt="Video thumbnail of a slightly open door"
                className="w-full h-56 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGxEPyTIA0JegRZgw6xsNAMQL3UUSlWO2UVsH_mcdNIYQJe3CkRenJMggIBYY5WMslc0vQvUl493VD209Mc3VrWu53leupB0xU2AIvPbV94yqwNCh5ACIub5gqzrQm1Ao-7kyqtz_E-cR59SEbFMW2q8CfcrcsBtS7XlA4mdYv8y8s0CfwSxYKCb9ZLg8RWwD1AEG_WdUHG2ZFKzU5EEwF8kfBxsl11miUPiaroQy6HligMKxwiTmtCAoYmueoOsJrnHM2negwEcwA"
              />
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
              <img
                alt="Video thumbnail of a person being interviewed"
                className="w-full h-56 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFtL6dNWfkrYnkOh8VE1wjM0KWToHbtuer2DIRp-NFBrNXnoDKYomBTK8YW6junl-YzmIsbZNEoJnLq6n_py2-xTlm_dy7ZYJOKq4XtFqcSI8gLDgYBmFAR8NhUHKUT34l5R17pvvvgkpLejKU3Cu2Yg00L9LG4Z1CEgSKVguR686jrPPVPVxHZkETu-hya_ukmB_R2rzaf2F32noviqYyarByRwVYlGdERVWc2WFwkQifM2iJlmY5bxLQoeXz62_NSqDvdqD1D0rc"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
