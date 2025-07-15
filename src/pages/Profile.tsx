import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div style={{ minHeight: "calc(100vh - 64px)" }} className="p-8">
      <h2 className="text-3xl font-bold mb-4">Profilo Utente</h2>
      {user && (
        <ul className="space-y-2">
          <li>
            <strong>Username:</strong> {user.username}
          </li>
          <li>
            <strong>ID:</strong> {user.id}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Profile;
