import { Form, Input } from "antd";

const ServiceOverral = () => {
  return (
    <div style={{ margin: "0 auto", width: "70%", padding: "20px" }}>
      <Form.Item
        label="Tên cửa hàng"
        name="storeName"
        validateTrigger="onBlur"
        rules={[
          { required: true, message: "Tên cửa hàng không được trống" },
          { max: 20, message: "Tên cửa hàng không được quá 20 ký tự" },
        ]}
        style={{ marginBottom: 0, textAlign: "left" }}
      >
        <Input showCount maxLength={20} placeholder="Nhập tên cửa hàng" />
      </Form.Item>
    </div>
  );
};

export default ServiceOverral;
