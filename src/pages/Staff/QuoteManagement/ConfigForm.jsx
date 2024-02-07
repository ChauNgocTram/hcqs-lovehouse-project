import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Input, Button, Form as AntdForm, Select } from "antd";
import * as Yup from "yup";
import { getAllWorker } from "../../../constants/apiWorker";
import { getProjectById } from "../../../constants/apiQuotationOfStaff";

import { v4 as uuidv4 } from "uuid";

const { Option } = Select;

const validationSchema = Yup.object().shape({
  sandMixingRatio: Yup.number().required(
    "'Sand Mixing Ratio' must not be empty."
  ),
  cementMixingRatio: Yup.number().required(
    "'Cement Mixing Ratio' must not be empty."
  ),
  stoneMixingRatio: Yup.number().required(
    "'Stone Mixing Ratio' must not be empty."
  ),
  tiledArea: Yup.number().required("The TiledArea must be required!"),
  wallLength: Yup.number().required("'Wall Length' must not be empty."),
  wallHeight: Yup.number().required("'Wall Height' must not be empty."),
  estimatedTimeOfCompletion: Yup.number().required(
    "The EstimatedTimeOfCompletion must be required!"
  ),
});

const ConfigForm = ({ initialValues, onSubmit }) => {
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  
  const [projectDetail, setProjectDetail] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllWorker();
        setWorkers(response.result.data);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };

    fetchData();
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (!values.laborRequests) {
          values.laborRequests = [];
        }
        values.laborRequests.forEach((request) => {
          const selectedWorker = workers.find(
            (worker) => worker.id === request.workerPriceId
          );
          if (selectedWorker) {
            request.workerPriceId = selectedWorker.id;
          }
        });
        await onSubmit(values);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  // useEffect(() => {
  //   if (formik.values.laborRequests.workerPriceId) {
  //     const selectedWorker = workers.find(
  //       (worker) => worker.id === formik.values.laborRequests.workerPriceId
  //     );
  //     setSelectedWorker(selectedWorker);
  //   }
  // }, [formik.values.laborRequests.workerPriceId, workers]);

  // useEffect(() => {
  //   // When the form is initially loaded, set workerPriceId to the first worker's id
  //   if (formik.values.laborRequests.length > 0 && !formik.values.laborRequests[0].workerPriceId && workers.length > 0) {
  //     formik.setFieldValue('laborRequests[0].workerPriceId', workers[0].id);
  //   }

  //   // Update selectedWorker based on the first laborRequest's workerPriceId
  //   if (formik.values.laborRequests[0].workerPriceId) {
  //     const selectedWorker = workers.find(
  //       (worker) => worker.id === formik.values.laborRequests[0].workerPriceId
  //     );
  //     setSelectedWorker(selectedWorker);
  //   }
  // }, [formik.values.laborRequests, workers]);

  useEffect(() => {
    if (formik.values.laborRequests[0].workerPriceId) {
      const selectedWorker = workers.find(
        (worker) => worker.id === formik.values.laborRequests[0].workerPriceId
      );

      if (selectedWorker) {
        setSelectedWorker(selectedWorker);
      } else {
        console.error(
          `Worker with ID ${formik.values.laborRequests[0].workerPriceId} not found`
        );
      }
    }
  }, [formik.values.laborRequests, workers]);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        if (id) {
          const data = await getProjectById(id);
          if (data && data.result) {
            setProjectDetail(data.result.data);
            const projectId = data.result.data?.project?.id;
            formik.setFieldValue("id", projectId || "");
          } else {
            console.error("Invalid data format:", data);
          }
        }
      } catch (error) {
        console.error("Error fetching house project data:", error);
      }
    };

    fetchProjectDetail();
  }, [id]);
  return (
    <AntdForm
      onFinish={formik.handleSubmit}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      autoComplete="off"
    >
      <AntdForm.Item label="ID" initialValue={id}>
        <Input
          type="text"
          name="id"
         // onChange={formik.handleChange}
         // onBlur={formik.handleBlur}
          value={formik.values.id}
        />
      </AntdForm.Item>

      <AntdForm.Item label="Sand Mixing Ratio">
        <Input
          type="number"
          name="sandMixingRatio"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.sandMixingRatio}
        />
        {formik.touched.sandMixingRatio && formik.errors.sandMixingRatio ? (
          <div>{formik.errors.sandMixingRatio}</div>
        ) : null}
      </AntdForm.Item>

      <AntdForm.Item label="Cement Mixing Ratio">
        <Input
          type="number"
          name="cementMixingRatio"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.cementMixingRatio}
        />
        {formik.touched.cementMixingRatio && formik.errors.cementMixingRatio ? (
          <div>{formik.errors.cementMixingRatio}</div>
        ) : null}
      </AntdForm.Item>

      <AntdForm.Item label="Stone Mixing Ratio">
        <Input
          type="number"
          name="stoneMixingRatio"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.stoneMixingRatio}
        />
        {formik.touched.stoneMixingRatio && formik.errors.stoneMixingRatio ? (
          <div>{formik.errors.stoneMixingRatio}</div>
        ) : null}
      </AntdForm.Item>

      <AntdForm.Item label="furnitureDiscount">
        <Input
          type="number"
          name="furnitureDiscount"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.furnitureDiscount}
        />
        {formik.touched.furnitureDiscount && formik.errors.furnitureDiscount ? (
          <div>{formik.errors.furnitureDiscount}</div>
        ) : null}
      </AntdForm.Item>

      <AntdForm.Item label="laborPrice">
        <Input
          type="number"
          name="laborPrice"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.laborPrice}
        />
        {formik.touched.laborPrice && formik.errors.laborPrice ? (
          <div>{formik.errors.laborPrice}</div>
        ) : null}
      </AntdForm.Item>

      <AntdForm.Item label="laborDiscount">
        <Input
          type="number"
          name="laborDiscount"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.laborDiscount}
        />
        {formik.touched.laborDiscount && formik.errors.laborDiscount ? (
          <div>{formik.errors.laborDiscount}</div>
        ) : null}
      </AntdForm.Item>

      <AntdForm.Item label="TiledArea">
        <Input
          type="number"
          name="tiledArea"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.tiledArea}
        />
        {formik.touched.tiledArea && formik.errors.tiledArea ? (
          <div>{formik.errors.tiledArea}</div>
        ) : null}
      </AntdForm.Item>

      <AntdForm.Item label="Wall Length">
        <Input
          type="number"
          name="wallLength"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.wallLength}
        />
        {formik.touched.wallLength && formik.errors.wallLength ? (
          <div>{formik.errors.wallLength}</div>
        ) : null}
      </AntdForm.Item>

      <AntdForm.Item label="Wall Height">
        <Input
          type="number"
          name="wallHeight"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.wallHeight}
        />
        {formik.touched.wallHeight && formik.errors.wallHeight ? (
          <div>{formik.errors.wallHeight}</div>
        ) : null}
      </AntdForm.Item>

      <AntdForm.Item label="Estimated Time Of Completion">
        <Input
          type="number"
          name="estimatedTimeOfCompletion"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.estimatedTimeOfCompletion}
        />
        {formik.touched.estimatedTimeOfCompletion &&
        formik.errors.estimatedTimeOfCompletion ? (
          <div>{formik.errors.estimatedTimeOfCompletion}</div>
        ) : null}
      </AntdForm.Item>

      <AntdForm.Item label="Worker">
        <Select
          name="laborRequests[0].workerPriceId"
          onChange={(value) =>
            formik.setFieldValue("laborRequests[0].workerPriceId", value)
          }
          onBlur={formik.handleBlur}
          value={formik.values.laborRequests[0].workerPriceId}
        >
          {workers.map((worker) => (
            <Option key={worker.id} value={worker.id}>
              {worker.id}
            </Option>
          ))}
        </Select>
        {/* {formik.touched.laborRequests.workerPriceId && formik.errors.laborRequests.workerPriceId ? (
          <div>{formik.errors.laborRequests.workerPriceId}</div>
        ) : null} */}
      </AntdForm.Item>

      <AntdForm.Item label="Labor Cost">
        <Input
          type="number"
          name="laborRequests[0].exportLaborCost"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={selectedWorker ? selectedWorker.laborCost : ""}
        />
        {/* {formik.touched.laborRequests.exportLaborCost && formik.errors.laborRequests.exportLaborCost ? (
          <div>{formik.errors.laborRequests.exportLaborCost}</div>
        ) : null} */}
      </AntdForm.Item>

      <AntdForm.Item label="Quantity">
        <Input
          type="number"
          name="laborRequests[0].quantity"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.laborRequests[0].quantity}
        />
      </AntdForm.Item>

      <AntdForm.Item>
        <Button type="primary" htmlType="submit" className="text-black">
          Submit
        </Button>
      </AntdForm.Item>
    </AntdForm>
  );
};

export default ConfigForm;
