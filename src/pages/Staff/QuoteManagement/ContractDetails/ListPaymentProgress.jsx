import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";

import {getContractProgressById} from "../../../../constants/apiContract"

import { StaffSidebar, LoadingOverlay } from "../../../../components";
export default function ListPaymentProgress() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [reloadContent, setReloadContent] = useState(false);
  const [progressDetail, setProgressDetail] = useState([]);

  const fetchProgressDetail = async () => {
    try {
      const data = await getContractProgressById(id);

      if (data && data.result) {
        setProgressDetail(data.result.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching progress detail:", error);
    }
  };

  const handleReloadContent = () => {
    setReloadContent((prev) => !prev);
  };

  useEffect(() => {
    fetchProgressDetail();
   
  }, [id, reloadContent]);
  return (
    <>
      <LoadingOverlay loading={loading} />
      <div className="flex">
        <StaffSidebar />

        <div className="h-screen flex-1 p-7">
          <h1 className="text-3xl font-semibold pb-4 pl-4">Payment Progress Detail</h1>

          {/* {quote?.quotation?.quotationStatus === 0 && ( */}
            <div className="flex items-center">
              <div className="ml-4">
              <NavLink
                          to={`/staff/create-list-progress/${id}`}
                          className="text-blue-500 hover:underline"
                        >
                          Create List Progress
                        </NavLink>
                {/* <FormCreateMaterialDetail onModalClose={handleReloadContent} /> */}
              </div>
             
            </div>
          {/* )} */}

          {/* <button className="flex items-center" onClick={handleBack}>
          Back
        </button>
       */}

          <div className="p-5 h-screen bg-gray-100 ">
            <div className="overflow-auto rounded-lg shadow hidden md:block">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className=" p-3 text-sm font-semibold tracking-wide text-left">
                      No.
                    </th>
                    <th className=" p-3 text-sm font-semibold tracking-wide text-left">
                      Name
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      Description
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      Price
                    </th>
                    
                    {/* {quote?.quotation?.quotationStatus === 0 && ( */}
                      <th className=" p-3 text-sm font-semibold tracking-wide">
                        Action
                      </th>
                    {/* )} */}
                  </tr>
                </thead>
                {/* <tbody className="divide-y divide-gray-100">
                  {quoteDetail &&
                    quoteDetail.map((item, index) => {
                      return (
                        <tr
                          key={item.id}
                          className="bg-white text-black text-left"
                        >
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            {item.material.name}
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            {(() => {
                              switch (item.material.unitMaterial) {
                                case 0:
                                  return "Kg";
                                case 1:
                                  return "m³";
                                case 2:
                                  return "Bar";
                                case 3:
                                  return "Item";
                                default:
                                  return "";
                              }
                            })()}
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            {item.material.materialType === 0
                              ? "Raw Material"
                              : "Funiture"}
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-right">
                            {item.quantity}
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-right">
                            <CurrencyFormatter amount={item.total} />
                          </td>

                          {quote?.quotation?.quotationStatus === 0 && (
                            <td className="p-3 text-sm text-gray-700 text-center">
                              <div className="flex justify-center">
                                <div>
                                  <FormUpdateMaterialDetail
                                    quoteDetail={item}
                                    onModalClose={handleReloadContent}
                                  />
                                </div>

                                <div>
                                  <DeleteMaterialDetail
                                    quoteDetail={item}
                                    onDelete={handleReloadContent}
                                  />
                                </div>
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                </tbody> */}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

