import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Input, Button, Select } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getProjectById,
} from "../../../constants/apiQuotationOfStaff";
import { getAllWorker } from "../../../constants/apiWorker";
const { Option } = Select;
export default function ConfigProject() {

  const { id } = useParams();
  const [configData, setConfigData] = useState({});

  const [projectDetail, setProjectDetail] = useState({});
 

  const formItemLayout = {
    labelCol: { xs: { span: 10 }, sm: { span: 9 } },
    wrapperCol: { xs: { span: 10 }, sm: { span: 8 } },
  };

  const validationSchema = Yup.object().shape({
    id: Yup.string().required("ID is required"),
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

  const [workerData, setWorkerData] = useState([]);

  useEffect(() => {
    const fetchWorkerData = async () => {
      try {
        const data = await getAllWorker();
        if (data && data.result) {
          setWorkerData(data.result.data);
        }
      } catch (error) {
        console.error("Error fetching worker data:", error);
      }
    };

    fetchWorkerData();

    
  }, []);

  const formik = useFormik({
    initialValues: {
      
      sandMixingRatio: 0,
      cementMixingRatio: 0,
      stoneMixingRatio: 0,
      furnitureDiscount: 0,
      laborPrice: 0,
      laborDiscount: 0,
      tiledArea: 0,
      wallLength: 0,
      wallHeight: 0,
      estimatedTimeOfCompletion: 0,
      laborRequests: [
        {
          exportLaborCost: 0,
          quantity: 0,
          workerPriceId: "",
        },
      ],
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
       values.id = formik.values.id;
        const response = await configProject(values);

        console.log("Form submitted:", values);
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        if (id) {
          const data = await getProjectById(id);
          if (data && data.result) {
            setProjectDetail(data.result.data);
            const projectId = data.result.data?.project?.id;
            formik.setFieldValue('id', projectId || '');
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
  

  // const handleWorkerPriceChange = async (value, index) => {
  //   // Find the selected worker based on the workerPriceId
  //   const selectedWorker = workerData.find((worker) => worker.id === value);

  //   // Update exportLaborCost in the formik values
  //   formik.setFieldValue(
  //     `laborRequests[${index}].exportLaborCost`,
  //     selectedWorker?.laborCost || 0
  //   );
  // };

  return (
    <>
      <div>
        <div className="text w-full pl-2">
          <strong>Area: </strong>
          {projectDetail?.project?.area} m&#178;
        </div>

        <div className="text w-full pl-2">
          <strong>Number of floor: </strong>
          {projectDetail?.project?.numOfFloor}
        </div>

        <div className="text w-full pl-2">
          <strong>Construction type: </strong>
          {projectDetail?.project?.constructionType === 0
            ? "Rough construction"
            : "Completed construction"}
        </div>

        <Form
          {...formItemLayout}
          form={formik.form}
          onFinish={formik.handleSubmit}
          size="large"
          autoComplete="off"
        >
          <div className="flex items-start justify-between">
            <div className="w-full">
              <Form.Item
                label="ID"
                name="id"
                initialValue={id}
              >
                <Input
                  name="id"
                  value={formik.values.id}
                 readOnly
                />
              </Form.Item>

              <Form.Item
                label="Sand Mixing Ratio"
                name="sandMixingRatio"
                rules={[
                  {
                    required: true,
                    message: "sandMixingRatio cannot be blank",
                  },
                  { whitespace: true },
                ]}
                hasFeedback
              >
                <Input
                  name="sandMixingRatio"
                  value={formik.values.sandMixingRatio}
                  onChange={formik.handleChange}
                />
              </Form.Item>

              <Form.Item
                label="Cement Mixing Ratio"
                name="cementMixingRatio"
                rules={[
                  {
                    required: true,
                    message: "cementMixingRatio cannot be blank",
                  },
                  { whitespace: true },
                ]}
                hasFeedback
              >
                <Input
                  name="cementMixingRatio"
                  value={formik.values.cementMixingRatio}
                  onChange={formik.handleChange}
                />
              </Form.Item>

              <Form.Item
                label="Stone Mixing Ratio"
                name="stoneMixingRatio"
                rules={[
                  {
                    required: true,
                    message: "stoneMixingRatio cannot be blank",
                  },
                  { whitespace: true },
                ]}
                hasFeedback
              >
                <Input
                  name="stoneMixingRatio"
                  value={formik.values.stoneMixingRatio}
                  onChange={formik.handleChange}
                />
              </Form.Item>

              <Form.Item
                label="furnitureDiscount"
                name="furnitureDiscount"
                onChange={formik.handleChange}
              >
                <Input
                  name="furnitureDiscount"
                  value={formik.values.furnitureDiscount}
                  onChange={formik.handleChange}
                />
              </Form.Item>

              <Form.Item
                label="laborPrice"
                name="laborPrice"
                onChange={formik.handleChange}
              >
                <Input
                  name="laborPrice"
                  value={formik.values.laborPrice}
                  onChange={formik.handleChange}
                />
              </Form.Item>

              <Form.Item
                label="laborDiscount"
                name="laborDiscount"
                onChange={formik.handleChange}
              >
                <Input
                  name="laborDiscount"
                  value={formik.values.laborDiscount}
                  onChange={formik.handleChange}
                />
              </Form.Item>

              <Form.Item
                label="TiledArea"
                name="tiledArea"
                rules={[
                  {
                    required: true,
                    message: "tiledArea cannot be blank",
                  },
                  { whitespace: true },
                ]}
                hasFeedback
              >
                <Input
                  name="tiledArea"
                  value={formik.values.tiledArea}
                  onChange={formik.handleChange}
                />
              </Form.Item>

              <Form.Item
                label="Wall Length"
                name="wallLength"
                rules={[
                  {
                    required: true,
                    message: "wallLength cannot be blank",
                  },
                  { whitespace: true },
                ]}
                hasFeedback
              >
                <Input
                  name="wallLength"
                  value={formik.values.wallLength}
                  onChange={formik.handleChange}
                />
              </Form.Item>

              <Form.Item
                label="Wall Height"
                name="wallHeight"
                rules={[
                  {
                    required: true,
                    message: "wallHeight cannot be blank",
                  },
                  { whitespace: true },
                ]}
                hasFeedback
              >
                <Input
                  name="wallHeight"
                  value={formik.values.wallHeight}
                  onChange={formik.handleChange}
                />
              </Form.Item>

              <Form.Item
                label="Estimated Time Of Completion"
                name="estimatedTimeOfCompletion"
                rules={[
                  {
                    required: true,
                    message: "estimatedTimeOfCompletion cannot be blank",
                  },
                  { whitespace: true },
                ]}
                hasFeedback
              >
                <Input
                  name="estimatedTimeOfCompletion"
                  value={formik.values.estimatedTimeOfCompletion}
                  onChange={formik.handleChange}
                />
              </Form.Item>

              <Form.Item
                label="exportLaborCost"
                //name="exportLaborCost"
                name={`laborRequests.exportLaborCost`}
                rules={[
                  {
                    required: true,
                    message: "exportLaborCost cannot be blank",
                  },
                  { whitespace: true },
                ]}
                hasFeedback
              >
                <Input
                  name="laborRequests.exportLaborCost"
                  value={formik.values.laborRequests.exportLaborCost}                  
                  onChange={formik.handleChange}  
                />
              </Form.Item>

              <Form.Item
                label="quantity"
                //name="quantity"
                name={`laborRequests.quantity`}
                rules={[
                  {
                    required: true,
                    message: "quantity cannot be blank",
                  },
                  { whitespace: true },
                ]}
                hasFeedback
              >
                <Input
                  name="laborRequests.quantity"
                  value={formik.values.laborRequests.quantity}                  
                  onChange={formik.handleChange}  
                />
              </Form.Item>

              <Form.Item
                label="workerPriceId"
                //name="workerPriceId"
                name={`laborRequests.workerPriceId`}
                rules={[
                  {
                    required: true,
                    message: "workerPriceId cannot be blank",
                  },
                  { whitespace: true },
                ]}
                hasFeedback
              >
                <Input
                  name="laborRequests.workerPriceId"
                  value={formik.values.laborRequests.workerPriceId}                  
                  onChange={formik.handleChange}  
                />
              </Form.Item>

              {/* Labor Requests Form.Item */}
              {/* <Form.Item
                label="Labor Requests"
                name="laborRequests"
                rules={[
                  {
                    required: true,
                    message: "Labor Requests cannot be blank",
                  },
                ]}
                hasFeedback
              >
                {formik.values.laborRequests.map((_, index) => (
                  <div key={index} style={{ marginBottom: "16px" }}>
                   
                    <Form.Item
                      label={`Worker Price ID ${index + 1}`}
                      name={`laborRequests[${index}].workerPriceId`}
                      rules={[
                        {
                          required: true,
                          message: "Worker Price ID is required",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        optionFilterProp="children"
                        value={formik.values.laborRequests[index].workerPriceId}
                        onChange={(value) => {
                          formik.setFieldValue(
                            `laborRequests[${index}].workerPriceId`,
                            value
                          );
                          const selectedWorker = workerData.find(
                            (worker) => worker.id === value
                          );
                          formik.setFieldValue(
                            `laborRequests[${index}].exportLaborCost`,
                            selectedWorker?.laborCost || 0
                          );
                          // handleWorkerPriceChange(value, index);
                        }}
                      >
                        {workerData.map((worker) => (
                          <Option key={worker.id} value={worker.id}>
                            {worker.id}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label={`Export Labor Cost ${index + 1}`}
                      name={`laborRequests[${index}].exportLaborCost`}
                      rules={[
                        {
                          required: true,
                          message: "Export Labor Cost is required",
                        },
                      ]}
                    >
                      <Input
                        value={formik.values.laborRequests.exportLaborCost}
                        onChange={formik.handleChange}
                      />
                    </Form.Item>
                    <Form.Item
                      label="quantity"
                      name="laborRequests.quantity"
                      rules={[
                        {
                          required: true,
                          message: "Export Labor Cost is required",
                        },
                      ]}
                    >
                      <Input
                        value={formik.values.laborRequests.quantity}
                        onChange={formik.handleChange}
                      />
                    </Form.Item>
                  </div>
                ))}
              </Form.Item> */}
              <Form.Item wrapperCol={{ offset: 9, span: 8 }}>
                <Button
                  className="bg-baseGreen text-white"
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}
