import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  Flex,
  Form,
  Input,
  Layout,
  Menu,
  Modal,
  Select,
  Table,
} from "antd";
import {
  FolderOutlined,
  FileImageFilled,
  VideoCameraFilled,
  FileTextFilled,
  MenuOutlined,
} from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import {  editData, storeData } from "../redux/slice";
const { Sider, Content } = Layout;

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const Home = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [addFolderModal, setAddFolderModal] = useState(false);
  const [addFileModal, setAddFileModal] = useState(false);
  const [isRenamingKey, setIsRenamingKey] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [clickedFile, setClickedFile] = useState({});


  const [folders, setFolders] = useState([
    {
      icon: <FolderOutlined />,
      key: "1",
      label: "Folder 1",
      children: [
        {
          icon: <FolderOutlined />,
          key: "sub1",
          label: "Sub Folder",
        },
      ],
      onClick: (data) => {
        handleFolderClick(data);
      },
    },
    {
      key: "2",
      icon: <FolderOutlined />,
      label: "Folder 2",
      onClick: (data) => {
        handleFolderClick(data);
      },
    },
    {
      key: "3",
      icon: <FolderOutlined />,
      label: "Folder 3",
      onClick: (data) => {
        handleFolderClick(data);
      },
    },
    {
      key: "4",
      icon: <FolderOutlined />,
      label: "Folder 4",
      onClick: (data) => {
        handleFolderClick(data);
      },
    },
  ]);
  
  
  const [allFiles, setAllFiles] = useState([
    {
      name: "Image.jpg",
      key: "1",
      extension: "JPG",
      descriptions: "test file 1",
      folderName: "Folder 2",
      folderId: "2",
      fileType: "image",
    },
    {
      name: "Image2.png",
      key: "2",
      extension: "PNG",
      descriptions: "test file",
      folderName: "Folder 2",
      folderId: "2",
      fileType: "image",
    },
    {
      name: "video.mp4",
      key: "3",
      extension: "MP4",
      descriptions: "test file",
      folderName: "Folder 3",
      folderId: "3",
      fileType: "video",
    },
    {
      name: "Text File.txt",
      key: "4",
      extension: "TXT",
      descriptions: "test file",
      folderName: "Folder 3",
      folderId: "3",
      fileType: "text",
    },
    {
      name: "Text File.txt",
      key: "5",
      extension: "TXT",
      descriptions: "test file",
      folderName: "Sub Folder",
      folderId: "sub1",
      fileType: "text",
    },
  ]);

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      ...record,
    });
    setIsRenamingKey(record.key);
  };
  const dropDownOption = [
    {
      key: "1",
      label: "Rename",
    },
  ];
  const isKeyMatched = (record) => record?.key === isRenamingKey;

  const onSave = async (record) => {
    const row = await form.validateFields();
    const findFileAndRename = allFiles?.map((item) => {
      if (item?.key === record?.key) {
        item.name = row?.name;
        return item;
      }
    });
    setAllFiles(findFileAndRename);
  };
  const onRemove = async (record) => {
    const findFileAndDelete = folderFiles?.filter((item) => {
      return item?.key !== record?.key;
    });
    setFolderFiles(findFileAndDelete);
  };

  const columns = [
    {
      key: "name",
      dataIndex: "name",
      title: "File Name",
      editable: true,
      render: (_, record) => {
        return (
          <Flex gap={10}>
            {record?.fileType === "image" ? (
              <FileImageFilled />
            ) : record?.fileType === "text" ? (
              <FileTextFilled />
            ) : (
              <VideoCameraFilled />
            )}
            <span
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => {
                setModalOpen(true), setClickedFile(record);
              }}
            >
              {record?.name}
            </span>
          </Flex>
        );
      },
    },
    {
      key: "descriptions",
      dataIndex: "descriptions",
      title: "Description",
    },
    {
      key: "Rename",
      title: "Rename",
      render: (_, record) => {
        const isRenaming = isKeyMatched(record);
        return isRenaming ? (
          <Flex gap={10}>
            <a
              onClick={() => {
                onSave(record);
                setIsRenamingKey("");
              }}
            >
              Save
            </a>
            <a onClick={() => setIsRenamingKey("")}>Cancel</a>
          </Flex>
        ) : (
          <a onClick={() => edit(record)}>Rename</a>
        );
      },
    },
    {
      key: "delete",
      title: "Delete",
      render: (_, record) => {
        return <a onClick={() => onRemove(record)}>Delete</a>;
      },
    },
  ];

  const [folderFiles, setFolderFiles] = useState(allFiles);

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,

        dataIndex: col.dataIndex,
        title: col.title,
        editing: isKeyMatched(record),
      }),
    };
  });
  const handleFolderClick = (data) => {
    setFolderFiles(allFiles.filter((item) => item?.folderId == data?.key));
  };

  useEffect(() => {
    handleFolderClick({ key: "2" });
  }, []);

  const [adds, setadds] = useState(folders);
  const onAddingFolder = (value) => {
    setFolders((prev) => {
      return [
        ...prev,
        {
          key: prev?.length + 1,
          icon: <FolderOutlined />,
          label: value?.FolderName,
          onClick: (data) => {
            handleFolderClick(data);
          },
        },
      ];
    });
    setAddFolderModal(false);
  };
  const onAddingFile = (value) => {
    setFolderFiles((prev) => {
      return [
        ...prev,
        {
          name: value?.FileName,
          key: prev?.length + 1,
          extension: value?.extension,
          descriptions: value?.descriptions,
          folderName: folderFiles[0]?.folderName,
          folderId: folderFiles[0]?.folderName,
          fileType:
            value?.extension === ("JPG" || "PNG")
              ? "image"
              : value?.extension === "TXT"
              ? "text"
              : "video",
        },
      ];
    });
    setAddFileModal(false);
  };

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={[
            {
              key: "1",
              label: "File Manager",
            },
            {
              key: "2",
              label: "Add Folder",
              onClick: () => setAddFolderModal(true),
            },
          ]}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Layout style={{ height: "100vh" }}>
        <Sider>
          <Menu
            style={{
              flex: 1,
              minWidth: 0,
            }}
            defaultSelectedKeys={["2"]}
            mode="inline"
            items={folders}
          ></Menu>
        </Sider>
      </Layout>
      <Layout
        style={{
          position: "fixed",
          top: "80px",
          left: "228px",
          padding: "0",
        }}
      >
        {folderFiles?.length && (
          <Content
            style={{
              padding: 5,
              margin: 0,
              minHeight: 280,
              width: "80vw",
            }}
          >
            <Button type="primary" onClick={() => setAddFileModal(true)}>
              Add File
            </Button>
            <Form form={form} component={false}>
              <Table
                style={{ paddingTop: "10px" }}
                rowClassName="editable-row"
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                dataSource={folderFiles}
                columns={mergedColumns}
              ></Table>
            </Form>
          </Content>
        )}
      </Layout>
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onClose={() => setModalOpen(false)}
        footer={null}
      >
        <ul>
          <li>Name: {clickedFile?.name}</li>
          <li>Description: {clickedFile?.descriptions}</li>
          <li>Extension: {clickedFile?.extension}</li>
          <li>Path: {clickedFile?.folderName}</li>
        </ul>
      </Modal>
      <Modal
        title="Add New Folder"
        open={addFolderModal}
        onCancel={() => setAddFolderModal(false)}
        onClose={() => setAddFolderModal(false)}
        footer={null}
      >
        <Form onFinish={onAddingFolder}>
          <Form.Item name="FolderName" label="Enter Folder Name">
            <Input name="FolderName"></Input>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" block>
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Add New File"
        open={addFileModal}
        onCancel={() => setAddFileModal(false)}
        onClose={() => setAddFileModal(false)}
        footer={null}
      >
        <Form onFinish={onAddingFile}>
          <Form.Item name="FileName" label="File Name">
            <Input name="FileName"></Input>
          </Form.Item>
          <Form.Item name="descriptions" label="Description">
            <Input name="descriptions"></Input>
          </Form.Item>
          <Form.Item name="extension" label="File extension">
            <Select
              name="extension"
              options={[
                {
                  value: "TXT",
                  label: "TEXT",
                },
                {
                  value: "JPG",
                  label: "JPG",
                },
                {
                  value: "PNG",
                  label: "PNG",
                },
                {
                  value: "MP4",
                  label: "MP4",
                },
              ]}
            ></Select>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary" block>
              Add File
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Home;
