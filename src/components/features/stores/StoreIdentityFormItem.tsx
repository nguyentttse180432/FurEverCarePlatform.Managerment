import { Form, Input, message, Radio, Upload, UploadProps } from "antd";
import { useState } from "react";
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

const StoreIdentityFormItem = () => {
  const [identityTypeName, setIdentityTypeName] = useState<string>(
    "Căn cước công dân (CCCD)"
  );

  function changeIdentity(value: string): void {
    if (value === "newIdentity") {
      setIdentityTypeName("Căn cước công dân (CCCD)");
    }
    if (value === "oldIdentity") {
      setIdentityTypeName("Chứng minh nhân dân (CMND)");
    }
    if (value === "passport") {
      setIdentityTypeName("Hộ chiếu");
    }
  }

  return (
    <div style={{ margin: "0 auto", width: "70%", padding: "40px 0px" }}>
      <Form.Item
        label="Hình thức định danh"
        name="identityType"
        initialValue={"newIdentity"}
      >
        <Radio.Group
          style={{ textAlign: "left" }}
          defaultValue="newIdentity"
          onChange={(e) => changeIdentity(e.target.value)}
        >
          <Radio value="newIdentity">Căn cước công dân (CCCD)</Radio>
          <Radio value="oldIdentity">Chứng minh nhân dân (CMND)</Radio>
          <Radio value="passport">Hộ chiếu</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label={`Số ${identityTypeName}`}
        name="identityNumber"
        validateTrigger="onBlur"
        rules={[
          {
            required: true,
            message: `Số ${identityTypeName} không được trống`,
          },
          {
            pattern: /^[0-9]{9,12}$/,
            message: `Số ${identityTypeName} không hợp lệ`,
          },
        ]}
        style={{ marginBottom: 20, textAlign: "left" }}
      >
        <Input placeholder={`Nhập số ${identityTypeName}`} />
      </Form.Item>

      {/* <Form.Item
        label="Hình chụp mặt trước của thẻ CMND/CCCD/Hộ chiếu"
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
      <Form.Item name="frontIdetityCard" hidden>
        <Input hidden value="url here" />
      </Form.Item> */}

      {/* <Form.Item
        label="Hình chụp mặt sau của thẻ CMND/CCCD/Hộ chiếu"
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
      <Form.Item name="backIdentityCard" hidden>
        <Input hidden value="url here" />
      </Form.Item> */}
    </div>
  );
};

export default StoreIdentityFormItem;
