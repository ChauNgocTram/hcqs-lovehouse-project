import { useEffect, useState } from "react";
import { DBHeader, LoadingOverlay, StaffSidebar } from "../../../components";
import { deleteConstructionConfig, getAllConstructionConfig } from "../../../constants/apiConstructionConfig";
import { Button, Input, Table } from "antd";
import ConstructionConfigForProject from "./ConstructionConfigForProject";
import ConstructionConfigUpdateForm from "./ConstructionConfigUpdateForm";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ConstructionConfigManagement = () => {
  const [constructionConfigList, setConstructionConfigList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [updateData, setUpdateData] = useState({});
  const [searchText, setSearchText] = useState("");

  const fetchData = async () => {
    const data = await getAllConstructionConfig();
    console.log(data);
    if (data.isSuccess) {
      setConstructionConfigList(data.result.data);
      setLoading(false);
      console.log(data.result.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleEdit = (record) => {
    // Xử lý logic cho nút edit
    console.log("Edit button clicked for record:", record);
    setShowUpdateModal(true);
    setUpdateData(record);
  };

  const handleDelete = async (record) => {
    // Xử lý logic cho nút delete
    console.log("Delete button clicked for record:", record);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "bg-green-500 hover:bg-green-600 text-white mx-3 px-4 py-2 rounded",
        cancelButton:
          "bg-red-500 hover:bg-red-600 text-white mx-3 px-4 py-2 rounded",
      },
      buttonsStyling: false,
    });

    const result = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "Do you want to delete this config?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, I agree",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
      focusConfirm: false,
    });
    if (result.isConfirmed) {
      const data = await deleteConstructionConfig(
        {
          "constructionType": record.constructionType,
          "numOfFloorMin": record.numOfFloorMin,
          "numOfFloorMax": record.numOfFloorMax,
          "areaMin": record.areaMin,
          "areaMax": record.areaMax,
          "tiledAreaMin": record.tiledAreaMin,
          "tiledAreaMax": record.tiledAreaMax
        }
      )
      if(data.isSuccess){
        toast.success("Delete successfully")
      }else{
        for (var i = 0; i < data.messages.length; i++) {
          toast.error(data.messages[i]);
        }
      }
    }
  };
  const columns = [
    {
      title: "Sand Mixing Ratio (%)",
      dataIndex: "sandMixingRatio",
      key: "sandMixingRatio",
    },
    {
      title: "Cement Mixing Ratio (%)",
      dataIndex: "cementMixingRatio",
      key: "cementMixingRatio",
    },
    {
      title: "Stone Mixing Ratio (%)",
      dataIndex: "stoneMixingRatio",
      key: "stoneMixingRatio",
    },
    {
      title: "Construction Type",
      dataIndex: "constructionType",
      key: "constructionType",
      render: (text) =>
        text === 0 ? "Rough Construction" : "Complete Construction",
    },
    {
      title: "Number of Floors (Min)",
      dataIndex: "numOfFloorMin",
      key: "numOfFloorMin",
    },
    {
      title: "Number of Floors (Max)",
      dataIndex: "numOfFloorMax",
      key: "numOfFloorMax",
    },
    {
      title: "Area (Min) (m2)",
      dataIndex: "areaMin",
      key: "areaMin",
    },
    {
      title: "Area (Max) (m2)",
      dataIndex: "areaMax",
      key: "areaMax",
    },
    {
      title: "Tiled Area (Min) (m2)",
      dataIndex: "tiledAreaMin",
      key: "tiledAreaMin",
    },
    {
      title: "Tiled Area (Max) (m2)",
      dataIndex: "tiledAreaMax",
      key: "tiledAreaMax",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  const handleSearch = (value) => {
    setSearchText(value);
  };

  return (
    <>
      <LoadingOverlay loading={loading} />
      <div className="flex overflow-hidden">
        <StaffSidebar />
        <div className="h-screen overflow-y-auto flex-1 bg-gray-100 ">
          <DBHeader />
          <h1 className="text-2xl font-semibold pb-2 mt-5 uppercase text-center">
            Construction Config
          </h1>
          <div className="flex justify-between items-center mx-16 my-2">
            <Input.Search
              placeholder="Search"
              onSearch={handleSearch}
              style={{ width: 200 }}
            />
            <Button
              className="bg-baseGreen text-white"
              onClick={() => setShowAddModal(true)}
            >
              + Add construction config
            </Button>
            <ConstructionConfigForProject
              setShowModal={setShowAddModal}
              showModal={showAddModal}
            />
            {showUpdateModal && (
              <ConstructionConfigUpdateForm
                setShowModal={setShowUpdateModal}
                showModal={showUpdateModal}
                data={updateData}
              />
            )}
          </div>
          <Table
            dataSource={constructionConfigList}
            columns={columns}
            key={`id`}
            className="mx-16 my-16"
          />
        </div>
      </div>
    </>
  );
};

export default ConstructionConfigManagement;
