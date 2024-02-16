import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";

import { getProjectByIdForCustomer } from "../../../constants/apiQuotationOfCustomer";

export default function QuotationOverviewSection() {
  const { id } = useParams();
  const [projectDetail, setProjectDetail] = useState({});
  const navigate = useNavigate();

  const fetchProjectDetail = async () => {
    try {
      const data = await getProjectByIdForCustomer(id);
      console.log("API Data:", data);
      if (data && data.result) {
        setProjectDetail(data.result.data);
        //setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching project detail:", error);
    }
  };

  useEffect(() => {
    fetchProjectDetail();
  }, [id]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const renderStatus = (quotationStatus) => {
    switch (quotationStatus) {
      case 0:
        return (
          <span className="p-1.5 text-xs font-medium uppercase tracking-wider bg-yellow-300 rounded-lg bg-opacity-50">
            Pending
          </span>
        );
      case 1:
        return (
          <span className="p-1.5 text-xs font-medium uppercase tracking-wider bg-blue-400 rounded-lg bg-opacity-50">
            Waiting response
          </span>
        );
      case 2:
        return (
          <span className="p-1.5 text-xs font-medium uppercase tracking-wider bg-gray-400 rounded-lg bg-opacity-50">
            Cancel
          </span>
        );
      case 3:
        return (
          <span className="p-1.5 text-xs font-medium uppercase tracking-wider bg-green-400 rounded-lg bg-opacity-50">
            Approved
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold pb-5">Quotation Overview</h1>

      <div className="p-5 h-screen bg-gray-100 ">
        <div className="overflow-auto rounded-lg shadow hidden md:block">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide ">
                  Raw Material Price
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide ">
                  Furniture Price
                </th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide ">
                  Labor Price
                </th>
                <th className=" p-3 text-sm font-semibold tracking-wide ">
                  Total
                </th>
                <th className=" p-3 text-sm font-semibold tracking-wide ">
                  Quotation Status
                </th>
                <th className=" p-3 text-sm font-semibold tracking-wide">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr
                key={projectDetail.id}
                className="bg-white text-black text-left"
              >
                <td className="w-40 p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  {projectDetail?.quotations?.[0]?.rawMaterialPrice
                    ? formatCurrency(
                        projectDetail.quotations[0].rawMaterialPrice
                      )
                    : "N/A"}
                </td>
                <td className=" w-40 p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  {projectDetail?.quotations?.[0]?.furniturePrice
                    ? formatCurrency(projectDetail.quotations[0].furniturePrice)
                    : "N/A"}
                </td>
                <td className="w-40 p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  {projectDetail?.quotations?.[0]?.laborPrice
                    ? formatCurrency(projectDetail.quotations[0].laborPrice)
                    : "N/A"}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  {projectDetail?.quotations?.[0]?.total
                    ? formatCurrency(projectDetail.quotations[0].total)
                    : "N/A"}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  <span>
                    {renderStatus(
                      projectDetail?.quotations?.[0]?.quotationStatus
                    )}
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-700 text-center">
                  <NavLink
                    to={`/customer/quotation-detail/${projectDetail?.quotations?.[0]?.id}`}
                  >
                    View Quotation Detail
                  </NavLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
