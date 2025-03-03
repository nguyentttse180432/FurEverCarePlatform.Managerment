import UserList from '../components/features/UserList';

const UserPage: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>User Management</h1>
      <UserList />
    </div>
  );
};

export default UserPage;