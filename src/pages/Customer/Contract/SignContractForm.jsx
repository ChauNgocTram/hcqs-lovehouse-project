import React, { useEffect, useState, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import { Input, Button } from "antd";

import Modal from "../../../components/Modal/Modal";
import { alert } from "../../../components/Alert/Alert";

import { getProjectByIdForCustomer } from "../../../constants/apiQuotationOfCustomer";



export default function SignContractForm() {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [projectDetail, setProjectDetail] = useState({});

  const fetchProjectDetail = async () => {
    try {
      const data = await getProjectByIdForCustomer(id);

      if (data && data.result) {
        setProjectDetail(data.result.data);
        // setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching project detail:", error);
    }
  };

  useEffect(() => {
    fetchProjectDetail();
  }, [id]);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (projectDetail.quotations && projectDetail.quotations.length > 0) {
      setInitialValues({
        contractId: projectDetail.quotations[0].id,
        name: "",
        price: 0,
        content: "",
      });
    }
  }, [projectDetail]);

  const [initialValues, setInitialValues] = useState({
    contractId: "",
    name: "", // Initial value is an empty string, it will be updated in useEffect
    price: 0,
    content: "",
    
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formattedData = {
        contractId: values.contractId,
        name: values.name,
        price: values.price,
        content: values.content,
      };

      console.log("Form data submitted:", formattedData);

      await createDealByStaff(formattedData);
      resetForm();
      alert.alertSuccessWithTime(
        "Create Quotation Deal Successfully",
        "",
        2000,
        "30",
        () => {}
      );

      setShowModal(false);
      onModalClose();
    } catch (error) {
      alert.alertFailedWithTime(
        "Failed To Create",
        "Please try again",
        2500,
        "25",
        () => {}
      );
    } finally {
      setSubmitting(false);
    }
  };
  return <div>SignContractForm</div>;
}
