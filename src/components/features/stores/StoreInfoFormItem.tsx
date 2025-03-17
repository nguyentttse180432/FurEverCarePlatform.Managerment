import { Form, Input, message, Select, Upload, UploadProps } from "antd";
import { useEffect, useState } from "react";
import { getStoreAddress } from "../../../services/store.service";

const { Dragger } = Upload;
const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(">>>> ", info.file.name);
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const StoreInfoFormItem = () => {
  const [addresses, setAddresses] = useState<
    { value: string; label: string }[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getStoreAddress();
      const addressOptions = data.map((address) => ({
        value: address.id,
        label: address.addressFullPath,
      }));
      setAddresses(addressOptions);
    };
    fetchData();
  }, []);

  return (
    <div style={{ margin: "0 auto", width: "70%", padding: "40px 0px" }}>
      <Form.Item
        label="Tên cửa hàng"
        name="name"
        validateTrigger="onBlur"
        rules={[
          { required: true, message: "Tên cửa hàng không được trống" },
          { max: 20, message: "Tên cửa hàng không được quá 20 ký tự" },
        ]}
        style={{ marginBottom: 20, textAlign: "left" }}
      >
        <Input showCount maxLength={20} placeholder="Nhập tên cửa hàng" />
      </Form.Item>
      {/* <Form.Item
        label="Địa chỉ lấy hàng"
        name="storeAddress"
        validateTrigger="onBlur"
        rules={[
          { required: true, message: "Địa chỉ lấy hàng không được trống" },
          { max: 100, message: "Địa chỉ lấy hàng không được quá 100 ký tự" },
        ]}
        style={{ marginBottom: 20, textAlign: "left" }}
      >
        <Input showCount maxLength={100} placeholder="Nhập địa chỉ lấy hàng" />
      </Form.Item> */}

      <Form.Item
        label="Địa chỉ lấy hàng"
        name="addressId"
        validateTrigger="onBlur"
        rules={[
          { required: true, message: "Địa chỉ lấy hàng không được trống" },
        ]}
        style={{ marginBottom: 20, textAlign: "left" }}
      >
        <Select
          showSearch
          placeholder="Chọn địa chỉ lấy hàng"
          options={addresses}
        />
      </Form.Item>

      <Form.Item
        label="Số điện thoại"
        name="hotline"
        validateTrigger="onBlur"
        rules={[
          { required: true, message: "Số điện thoại không được trống" },
          { max: 10, message: "Số điện thoại không được quá 10 ký tự" },
          {
            pattern: /^[0-9]+$/,
            message: "Số điện thoại không đúng định dạng",
          },
        ]}
        style={{ marginBottom: 10, textAlign: "left" }}
      >
        <Input placeholder="Nhập số điện thoại" />
      </Form.Item>
      {/* <Form.Item
        label="Email"
        name="storeEmail"
        validateTrigger="onBlur"
        rules={[
          { required: true, message: "Email không được trống" },
          { max: 50, message: "Email không được quá 50 ký tự" },
          { type: "email", message: "Email không đúng định dạng" },
        ]}
        style={{ marginBottom: 20, textAlign: "left" }}
      >
        <Input showCount maxLength={50} placeholder="Nhập email" />
      </Form.Item> */}

      {/* <Form.Item
        label="Store Logo"
        name="logoUrl"
        style={{ marginBottom: 20, textAlign: "left" }}
      >
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <AiOutlineCloudUpload size={30} />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      </Form.Item>
      <Form.Item name="logoUrl" hidden>
        <Input hidden value="asdfsd" />
      </Form.Item> */}

      {/* <Form.Item
        label="Store Banner"
        style={{ marginBottom: 0, textAlign: "left" }}
      >
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <AiOutlineCloudUpload size={30} />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      </Form.Item>
      <Form.Item name="bannerUrl" hidden>
        <Input hidden value="asdfsd" />
      </Form.Item> */}
    </div>
  );
};

export default StoreInfoFormItem;
