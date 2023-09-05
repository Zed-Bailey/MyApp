import { ActionIcon, Alert, Loader, Table } from "@mantine/core";
import { IconAlertCircle, IconEdit } from "@tabler/icons-react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { userActions } from "store/slices/users.slice";
import { weatherActions } from "store/slices/weather.slice";

export default function Customers() {
  const dispatch = useDispatch();
  const { user: authUser } = useSelector((x) => x.auth);
  const { users } = useSelector((x) => x.users);

  useEffect(() => {
    dispatch(userActions.getAll());
  }, []);

  return (
    <>
      <h2>Admin customer management</h2>
      <hr />
      <p className="text-base font-light py-3">There is <span className="font-semibold">{users.length}</span> user </p>

      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>username</th>
            <th>email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.length &&
            users.map((user) => (
              <tr className="" key={user.id}>
                <td className="px-6 py-4">{user.id}</td>
                <td className="px-6 py-4">{user.userName}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <ActionIcon color="cyan" variant="light">
                    <IconEdit />
                  </ActionIcon>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {users.loading && <Loader></Loader>}
      {users.error && (
        <Alert icon={<IconAlertCircle size={25} />} title="Bummer!" color="red">
          {users.error.message}
        </Alert>
      )}
    </>
  );
}
