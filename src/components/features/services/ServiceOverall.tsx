import React from "react";
import { Form, Input, Select } from "antd";
import  useFetchServiceCategories from "../../../hooks/serviceCategories/useFetchServiveCategories.ts";
import {IServiceCategories} from "../../../types/IServiceCategories.ts";

interface ServiceOverallProps {
    form: any; // Replace 'any' with the specific type if available
}

const ServiceOverall: React.FC<ServiceOverallProps> = ({ form }) => {
    const { data: serviceCategories, isLoading } = useFetchServiceCategories();

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={{
                id: null,
                name: "",
                description: "",
                storeId: "",
                estimatedTime: "",
                serviceCategoryId: "",
                status: false,
                petServiceDetails: [],
                petServiceSteps: []
            }}
        >
            <Form.Item
                label="Service Name"
                name="name"
                rules={[{ required: true, message: "Please enter the service name" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: "Please enter the service description" }]}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                label="Store"
                name="storeId"
                rules={[{ required: true, message: "Please enter the store" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Estimated Time"
                name="estimatedTime"
                rules={[{ required: true, message: "Please enter the estimated time" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Service Category"
                name="serviceCategoryId"
                rules={[{ required: true, message: "Please select the service category ID" }]}
            >
                <Select loading={isLoading} placeholder="Select a category">
                    {serviceCategories?.map((category: IServiceCategories) => (
                        <Select.Option key={category.id} value={category.id}>
                            {category.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label="Service Status"
                name="status"
                rules={[{ required: true, message: "Please select the status" }]}
            >
                <Select>
                    <Select.Option value={true}>Active</Select.Option>
                    <Select.Option value={false}>Inactive</Select.Option>
                </Select>
            </Form.Item>

            {/* Hidden fields to maintain the form structure */}
            <Form.Item name="petServiceDetails" hidden>
                <Input />
            </Form.Item>

            <Form.Item name="petServiceSteps" hidden>
                <Input />
            </Form.Item>
        </Form>
    );
};

export default ServiceOverall;