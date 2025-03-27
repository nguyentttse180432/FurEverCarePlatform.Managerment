import { Button, Card, Form, Input, message, Typography } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/authStore";

const { Title } = Typography;

const Profile = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { user, updateProfile } = useAuthStore();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        username: user.username,
        name: user.name,
        password: user.password,
      });
    }
  }, [user, form]);

  const handleUpdate = async (values: {
    name: string;
    password: string;
    phone: string;
  }) => {
    const success = await updateProfile(
      values.name,
      values.password,
      values.phone
    );
    if (success) {
      message.success("Profile updated successfully!");
      navigate("/profile");
    } else {
      message.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Card style={{ width: 400, padding: 24, backgroundColor: "white" }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Update Profile
        </Title>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleUpdate}
          size="large"
        >
          {/* Username - Read Only */}
          <Form.Item name="email" label="Email">
            <Input placeholder="Email" disabled />
          </Form.Item>

          {/* Full Name - Editable */}
          <Form.Item
            name="name"
            label="Full Name"
            rules={[
              { required: true, message: "Please enter your full name!" },
            ]}
          >
            <Input placeholder="Enter your full name" allowClear />
          </Form.Item>

          {/* Password - Editable */}
          <Form.Item
            name="password"
            label="New Password"
            rules={[
              {
                min: 6,
                message: "Password must be at least 6 characters long!",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter new password (optional)"
              allowClear
            />
          </Form.Item>

          {/* Phone - Editable */}
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please enter your phone number!" },
            ]}
          >
            <Input placeholder="Enter your phone number" allowClear />
          </Form.Item>

          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Update Profile
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;
