import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllProjects } from "../../../constants/apiHouseProject";

export default function HouseRoof() {
    const [houseRoofData, setHouseRoofData] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchHouseRoof = async () => {
            const data = await getAllProjects();
            if (data && data.result) {
                setHouseRoofData(data.result.data);
            }
          };
          fetchHouseRoof();
      }, []);

      const filteredProjects = houseRoofData.filter(
        (project) => project.sampleProject.projectType === 1
      );
  return (
    <>
    {/* <LoadingOverlay loading={loading} />
      <Navbar />
      <Breadcrumb /> */}
      <section className="md:h-full flex items-center text-gray-600">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl text-gray-700 font-semibold">
              Our Blogs
            </h1>
          </div>
          <div className="flex flex-wrap -m-4">
            {filteredProjects.map((houseroof) => (
              <div key={houseroof.id} className="p-4 sm:w-1/2 lg:w-1/3">
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <img
                    className="lg:h-72 md:h-48 w-full object-cover object-center"
                    //src={houseroof.s.imageUrl}
                    alt="blog"
                  />
                  <div className="p-6 h-[315px] hover:bg-baseOrange hover:text-white transition duration-300 ease-in">
                    
                    <h1 className="text-2xl font-semibold mb-3">
                      <NavLink to={`/blogDetail/${houseroof.id}`}>
                        {houseroof.sampleProject.header.length >= 70
                          ? houseroof.sampleProject.header.substring(0, 50).trim() + "..."
                          : houseroof.sampleProject.header}
                      </NavLink>
                    </h1>


                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </>
  )
}

