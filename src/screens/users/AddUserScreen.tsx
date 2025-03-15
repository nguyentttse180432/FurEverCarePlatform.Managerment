import UserForm from "../../components/features/user/UserForm";
import { useAddUser } from "../../hooks/user/useAddUser";

const AddUserScreen = () => {
  const { mutate } = useAddUser();
  return (
    <>
      <div>Add User</div>
      <div>
        <UserForm user={undefined} onSubmit={mutate} action="Add new" />
      </div>
    </>
  );
};

export default AddUserScreen;
