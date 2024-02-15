import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getQuoteDetailByQuoteId } from "../../../../constants/apiQuotationOfStaff";

import StaffSidebar from "../../../../components/Sidebar/StaffSidebar";
import FormCreateMaterialDetail from "./Manage/FormCreateMaterialDetail";
import FormUpdateMaterialDetail from "./Manage/FormUpdateMaterialDetail";
import DeleteMaterialDetail from "./Manage/DeleteMaterialDetail";

export default function QuotationDetails() {
  const { id } = useParams();
  const [quoteDetail, setQuoteDetail] = useState([]);
  //const [loading, setLoading] = useState(true);
  const [reloadContent, setReloadContent] = useState(false);

  const fetchQuoteDetail = async () => {
    try {
      const data = await getQuoteDetailByQuoteId(id);

      if (data && data.result) {
        setQuoteDetail(data.result.data);
        //setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching quote detail:", error);
    }
  };

  useEffect(() => {
    fetchQuoteDetail();
  }, [id, reloadContent]);

  const handleReloadContent = () => {
    setReloadContent((prev) => !prev);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <>
      <div className="flex">
        <StaffSidebar />

        <div className="h-screen flex-1 p-7">
          <h1 className="text-2xl font-semibold pb-5">Quote Detail</h1>
          <div className="ml-4">
            <FormCreateMaterialDetail onModalClose={handleReloadContent} />
          </div>

          <div className="p-5 h-screen bg-gray-100 ">
            <div className="overflow-auto rounded-lg shadow hidden md:block">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className=" p-3 text-sm font-semibold tracking-wide text-left">
                      No.
                    </th>
                    <th className=" p-3 text-sm font-semibold tracking-wide text-left">
                      Material name
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      Unit
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      Material type
                    </th>
                    <th className="w-24 p-3 text-sm font-semibold tracking-wide text-right">
                      Quantity
                    </th>
                    <th className=" p-3 text-sm font-semibold tracking-wide text-right">
                      Total
                    </th>
                    <th className=" p-3 text-sm font-semibold tracking-wide">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
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
                            <span>{formatCurrency(item.total)}</span>
                          </td>
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
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
