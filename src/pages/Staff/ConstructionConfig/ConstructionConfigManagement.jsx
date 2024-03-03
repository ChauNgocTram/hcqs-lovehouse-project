import { useEffect, useState, useRef } from "react";
import { DBHeader, LoadingOverlay, StaffSidebar } from "../../../components";
import {
  deleteConstructionConfig,
  getAllConstructionConfig,
} from "../../../constants/apiConstructionConfig";
import { Button, Input, Select, Space, Table } from "antd";
import ConstructionConfigForProject from "./ConstructionConfigForProject";
import ConstructionConfigUpdateForm from "./ConstructionConfigUpdateForm";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import BaseButton from "../../../components/Button/BaseButton";

const ConstructionConfigManagement = () => {
  const [constructionConfigList, setConstructionConfigList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const getColumnSearchProps = (
    dataIndex,
    setSearchText,
    searchedColumn,
    searchInput,
    handleSearch,
    handleReset
  ) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) => record[dataIndex].toString().includes(value),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const fetchData = async () => {
    const data = await getAllConstructionConfig();
    if (data.isSuccess) {
      setConstructionConfigList(data.result.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleEdit = (record) => {
    setShowUpdateModal(true);
    setUpdateData(record);
  };

  const handleDelete = async (record) => {
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
      const data = await deleteConstructionConfig({
        constructionType: record.constructionType,
        numOfFloorMin: record.numOfFloorMin,
        numOfFloorMax: record.numOfFloorMax,
        areaMin: record.areaMin,
        areaMax: record.areaMax,
        tiledAreaMin: record.tiledAreaMin,
        tiledAreaMax: record.tiledAreaMax,
      });

      if (data.isSuccess) {
        toast.success("Delete successfully");
        fetchData();
      } else {
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
      ...getColumnSearchProps(
        "sandMixingRatio",
        setSearchText,
        searchedColumn,
        searchInput,
        handleSearch,
        handleReset
      ),
      width: 150,
    },
    {
      title: "Cement Mixing Ratio (%)",
      dataIndex: "cementMixingRatio",
      key: "cementMixingRatio",
      width: 150,

      ...getColumnSearchProps(
        "cementMixingRatio",
        setSearchText,
        searchedColumn,
        searchInput,
        handleSearch,
        handleReset
      ),
    },
    {
      title: "Stone Mixing Ratio (%)",
      dataIndex: "stoneMixingRatio",
      key: "stoneMixingRatio",
      width: 150,

      ...getColumnSearchProps(
        "stoneMixingRatio",
        setSearchText,
        searchedColumn,
        searchInput,
        handleSearch,
        handleReset
      ),
    },
    {
      title: "Construction Type",
      dataIndex: "constructionType",
      key: "constructionType",
      width: 150,

      ...getColumnSearchProps(
        "constructionType",
        setSearchText,
        searchedColumn,
        searchInput,
        handleSearch,
        handleReset
      ),
      render: (text) =>
        text === 0 ? "Rough Construction" : "Complete Construction",
    },
    {
      title: "Number of Floors (Min)",
      dataIndex: "numOfFloorMin",
      key: "numOfFloorMin",
      width: 150,

      ...getColumnSearchProps(
        "numOfFloorMin",
        setSearchText,
        searchedColumn,
        searchInput,
        handleSearch,
        handleReset
      ),
    },
    {
      title: "Number of Floors (Max)",
      dataIndex: "numOfFloorMax",
      key: "numOfFloorMax",
      width: 150,

      ...getColumnSearchProps(
        "numOfFloorMax",
        setSearchText,
        searchedColumn,
        searchInput,
        handleSearch,
        handleReset
      ),
    },
    {
      title: "Area (Min) (m2)",
      dataIndex: "areaMin",
      key: "areaMin",
      width: 150,

      ...getColumnSearchProps(
        "areaMin",
        setSearchText,
        searchedColumn,
        searchInput,
        handleSearch,
        handleReset
      ),
    },
    {
      title: "Area (Max) (m2)",
      dataIndex: "areaMax",
      key: "areaMax",
      width: 150,

      ...getColumnSearchProps(
        "areaMax",
        setSearchText,
        searchedColumn,
        searchInput,
        handleSearch,
        handleReset
      ),
    },
    {
      title: "Tiled Area (Min) (m2)",
      dataIndex: "tiledAreaMin",
      key: "tiledAreaMin",
      width: 150,

      ...getColumnSearchProps(
        "tiledAreaMin",
        setSearchText,
        searchedColumn,
        searchInput,
        handleSearch,
        handleReset
      ),
    },
    {
      title: "Tiled Area (Max) (m2)",
      dataIndex: "tiledAreaMax",
      key: "tiledAreaMax",
      width: 150,

      ...getColumnSearchProps(
        "tiledAreaMax",
        setSearchText,
        searchedColumn,
        searchInput,
        handleSearch,
        handleReset
      ),
    },
    {
      title: "Action",
      key: "action",
      responsive: ["md"],

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
          <div className="flex justify-end items-center mx-16 my-2">
            <Button
              className="bg-baseGreen text-white"
              onClick={() => setShowAddModal(true)}
            >
              + Add construction config
            </Button>
            <ConstructionConfigForProject
              setShowModal={setShowAddModal}
              showModal={showAddModal}
              fetchData={fetchData}
            />
            {showUpdateModal && (
              <ConstructionConfigUpdateForm
                setShowModal={setShowUpdateModal}
                showModal={showUpdateModal}
                data={updateData}
                fetchData={fetchData}
              />
            )}
          </div>
          <Table
            dataSource={constructionConfigList}
            columns={columns}
            key={`id`}
            className="mx-16 my-16"
            scroll={{ x: true }}
          />
        </div>
      </div>
    </>
  );
};

export default ConstructionConfigManagement;
