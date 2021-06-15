import {useSession} from 'next-auth/client';

import Card from '@/common/components/Card';
import Input from '@/common/components/Input';
import useUser from '@/modules/reactQuery/queries/useUser';

const UserDetails = () => {
  const [session] = useSession();
  const {data: user, isLoading: isLoadingUser} = useUser(session.user._id);

  if (isLoadingUser) {
    return null;
  }

  return (
    <Card label="User Details" className="space-y-4">
      <Input readOnly defaultValue={user.email} label="Email" />
      <Input readOnly defaultValue={user.name} label="Name" />
      <Input readOnly defaultValue={user.role} label="Role" />
      <Input readOnly defaultValue={user.location.city} label="Location" />
    </Card>
  );
};

export default UserDetails;
