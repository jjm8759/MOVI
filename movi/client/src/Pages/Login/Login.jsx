import useFetchData from "./authCalls";
import React from "react";

const Login = () => {
  const {
    data,
    loading,
  } = useFetchData();

  return (
    <div>
    {loading && <div>Loading</div>}
    {!loading && (
      <div>
        <h2>Grabbing user data</h2>
        {data.map(item => (<span>{item.firstName}</span> ,
        <span>{item.lastName}</span>,
        <span>{item.email}</span>,
        <span>{item.password}</span>
        ))}
      </div>
    )}
    </div>
  )
}

export default Login;