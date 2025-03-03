import { Spin } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React from 'react';
import useFetchUsers from "../../hooks/useFetchUsers";
import { IUser } from '../../models/IUser';
import useUserStore from "../../store/userStore";

const UserList: React.FC = () => {
  const {data: users, isLoading, error} = useFetchUsers();
  const setUsers = useUserStore(state => state.setUsers);
  if (isLoading) return <Spin />
  if (error) return <div>Error: {error.message}</div>

  setUsers(users || []);

  const columns: ColumnsType<IUser> = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
  ];

  return <Table dataSource={users} columns={columns} rowKey="id" />;
}

export default UserList;