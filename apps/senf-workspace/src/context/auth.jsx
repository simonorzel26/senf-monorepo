import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../firebase";
import { Loader, FlexWrapper } from "senf-atomic-design-system";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <FlexWrapper
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        height="100%"
        width="100%"
      >
        <div style={{ width: "200px" }}>
          <Loader />
        </div>
      </FlexWrapper>
    );
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
