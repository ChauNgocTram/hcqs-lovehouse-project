import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

import { MdInventory } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";

import { buttonClick } from "../../../assets/animations";
import {
  getImportMaterialTemplate,
  getImportMaterialWithExcelError,
  importMaterialWithExcel,
} from "../../../api";
import { DataTable } from "../../../components";
import JSZip from "jszip";

const ImportInventory = () => {
  const user = useSelector((state) => state?.user?.user);
  const [isOpen, setIsOpen] = useState(false);

  const downloadExample = async () => {
    try {
      const response = await getImportMaterialTemplate();
      if (response === "Success") {
        toast.success("Download successful");
      } else {
        toast.error("Download failed");
      }
    } catch (error) {
      toast.error("Error:", error);
    }
  };

  const handleSubmit = async (data, file) => {
    const validData = data.validData;
    const sheetData = [
      Object.keys(validData[0]),
      ...validData.map((item) => Object.values(item)),
    ];
    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const formData = new FormData();
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Note: Months are zero-based
    const year = currentDate.getFullYear().toString();

    const formattedDate = `${day}${month}${year}`;
    formData.append("file", blob, `${formattedDate}.xlsx`);

    console.log("formattedDate: ", formattedDate);
    try {
      const uploadResponse = await importMaterialWithExcel(formData);
      if (uploadResponse[0].date) {
        toast.success("Upload successful: " + uploadResponse[0].date);
      } else {
        toast.error("Upload Fail: Please check file error ");
        getImportMaterialWithExcelError(formData);
      }
    } catch (error) {
      console.error("Error during upload:", error);
    }
  };

  return (
    <div className="flex flex-col p-8">
      {/* title */}
      <div>
        <div className="flex items-center space-x-2 text-xl">
          <MdInventory />
          <div>Import Export</div>
          <FaChevronRight />
          <div>Inventory</div>
          <FaChevronRight />
        </div>
        <div className="text-2xl text-orange-400 font-semibold py-4">
          Import Inventory
        </div>
      </div>

      <div className="flex flex-wrap justify-start">
        <motion.div
          {...buttonClick}
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 border rounded-md text-white bg-gray-500 hover:bg-gray-600 font-semibold shadow-md cursor-pointer"
        >
          Open Flow
        </motion.div>

        <motion.div
          {...buttonClick}
          onClick={downloadExample}
          className="px-4 py-2 border rounded-md text-white bg-blue-500 hover:bg-blue-600 font-semibold shadow-md cursor-pointer"
        >
          Dowload Example
        </motion.div>
      </div>

      <DataTable
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        fields={fields}
      />
    </div>
  );
};

export default ImportInventory;

const fields = [
  {
    label: "No",
    key: "No",
    fieldType: {
      type: "input",
    },
    example: "1",
    validations: [
      {
        rule: "required",
        errorMessage: "No is required",
        level: "error",
      },
    ],
  },
  {
    label: "MaterialName",
    key: "MaterialName",
    fieldType: {
      type: "input",
    },
    example: "Brick",
    validations: [
      {
        rule: "required",
        errorMessage: "Material Name is required",
        level: "error",
      },
    ],
  },
  {
    label: "SupplierName",
    key: "SupplierName",
    fieldType: {
      type: "input",
    },
    example: "Sau Chien",
    validations: [
      {
        rule: "required",
        errorMessage: "SupplierName is required",
        level: "error",
      },
    ],
  },
  {
    label: "Quantity",
    key: "Quantity",
    fieldType: {
      type: "input",
    },
    example: "1000",
    validations: [
      {
        rule: "required",
        errorMessage: "Quantity is required",
        level: "error",
      },
    ],
  },
];
