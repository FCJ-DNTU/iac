import React from "react";

// Import from objects
import { UserAPI } from "src/objects/user/api";

export default function TodoPage() {
  React.useEffect(() => {
    UserAPI.getUser(1).then(console.log);
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <h1 className="font-bold text-4xl">Todo Page</h1>
    </div>
  );
}
