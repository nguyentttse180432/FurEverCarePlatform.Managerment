import { Button, Form, Space, Steps, theme, Typography } from "antd";
import { colors } from "../../constants/colors";
import { useState } from "react";
import StoreInfoFormItem from "../../components/features/stores/StoreInfoFormItem";
import StoreFaxFormItem from "../../components/features/stores/StoreFaxFormItem";
import StoreIdentityFormItem from "../../components/features/stores/StoreIdentityFormItem";
import StoreFinalCheck from "../../components/features/stores/StoreFinalCheck";
import { useNavigate } from "react-router";
const steps = [
  {
    title: "Thông tin cửa hàng",
    content: <StoreInfoFormItem />,
  },
  {
    title: "Thông tin thuế",
    content: <StoreFaxFormItem />,
  },
  {
    title: "Thông tin định danh",
    content: <StoreIdentityFormItem />,
  },
  {
    title: "Hoàn tất",
    content: <StoreFinalCheck />, //Need component to sumary all data
  },
];
const AddStoreScreen = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  const [form] = Form.useForm();

  const navigate = useNavigate();

  return (
    <>
      <Space
        style={{ width: "100%", padding: "0px 20px" }}
        direction="vertical"
      >
        <Typography style={{ fontSize: 30, marginTop: 20, fontWeight: 600 }}>
          Thêm mới cửa hàng
        </Typography>

        <div
          style={{
            backgroundColor: colors.white,
            width: "100%",
            borderRadius: 10,
            padding: "10px 20px",
            marginTop: 20,
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Steps current={current} items={items} />
          <Form
            form={form}
            labelCol={{ span: 6 }}
            labelWrap={true}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            onFinish={(values: any) => {
              console.log("Received values of form: ", values);
            }}
          >
            <div style={contentStyle}>{steps[current].content}</div>
          </Form>
          <div
            style={{ margin: "20px auto", width: "70%", textAlign: "center" }}
          >
            {current > 0 && current < 3 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                Previous
              </Button>
            )}

            {current < steps.length - 2 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}

            {current === steps.length - 2 && (
              <Button type="primary" onClick={() => next()}>
                Done
              </Button>
            )}

            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() =>
                  navigate("/stores", {
                    replace: true,
                  })
                }
              >
                Cửa hàng của tôi
              </Button>
            )}
          </div>
        </div>
      </Space>
    </>
  );
};

export default AddStoreScreen;
