import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import { getProjectById } from "../../../../constants/apiQuotationOfStaff";

import {
  CurrencyFormatter,
  ContractStatusBadge,
  LoadingOverlay,
  DateFormatter,
} from "../../../../components";
import ContractGrid from "./Grid/ContractGrid";

export default function ContractSection2() {
  const { id } = useParams();
  const [projectDetail, setProjectDetail] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchProjectDetail = async () => {
    try {
      const data = await getProjectById(id);

      if (data && data.result) {
        setProjectDetail(data.result.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching project detail:", error);
    }
  };

  useEffect(() => {
    fetchProjectDetail();
  }, [id]);

  return (
    <>
      {projectDetail?.contract !== null && (
        <>
          <LoadingOverlay loading={loading} />
          <h1 className="text-xl font-semibold pt-5 uppercase pl-5">
            Contract information
          </h1>

          <div className="p-5 h-225">
            <div className="overflow-auto rounded-lg shadow hidden md:block">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className=" p-3 text-sm font-semibold tracking-wide text-left">
                      Total
                    </th>
                    <th className=" p-3 text-sm font-semibold tracking-wide ">
                      Total Costs Incurred
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide">
                      Deposit
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide">
                      Start Date
                    </th>

                    <th className=" p-3 text-sm font-semibold tracking-wide">
                      End Date
                    </th>

                    <th className=" p-3 text-sm font-semibold tracking-wide">
                      Status
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
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <CurrencyFormatter
                        amount={projectDetail?.contract?.total}
                      />
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <CurrencyFormatter
                        amount={projectDetail?.contract?.totalCostsIncurred}
                      />
                    </td>
                    <td className="w-40 p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <CurrencyFormatter
                        amount={projectDetail?.contract?.deposit}
                      />
                    </td>
                    <td className=" w-40 p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <DateFormatter
                        dateString={projectDetail?.contract?.startDate}
                      />
                    </td>
                    <td className="w-40 p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <DateFormatter
                        dateString={projectDetail?.contract?.endDate}
                      />
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <ContractStatusBadge
                        contractStatus={projectDetail?.contract?.contractStatus}
                      />
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      {projectDetail?.contract?.contractUrl ? (
                        // <NavLink
                        //   to={projectDetail?.contract?.contractUrl}
                        //   className="text-blue-500 hover:underline"
                        // >
                        //   View contract
                        // </NavLink>
                        <NavLink
                          to={`/staff/contract-payment-progress/${projectDetail?.contract?.id}`}
                          className="text-blue-500 hover:underline"
                        >
                          View payment progress
                        </NavLink>
                      ) : (
                        <NavLink
                          to={`/staff/contract-payment-progress/${projectDetail?.contract?.id}`}
                          className="text-blue-500 hover:underline"
                        >
                          Create payment progress
                        </NavLink>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ContractGrid projectDetail={projectDetail} />
          </div>
        </>
      )}
    </>
  );
}
