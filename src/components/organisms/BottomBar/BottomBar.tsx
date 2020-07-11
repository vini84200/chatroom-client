import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { useFormik } from "formik";
interface Props {
  username: string;
}

function BottomBar(props: Props) {
  let connection = useRef(socketIOClient.connect("localhost:8000"));

  useEffect(function () {
    return () => connection.current.disconnect();
  }, []);

  const {values, handleChange, handleBlur, handleSubmit} = useFormik({
      initialValues: {
          msg: "",
      },
      onSubmit: ({msg}, {setSubmitting}) => {
        connection.current.emit("sendMessage", {
            username: props.username,
            message: msg
        })
      }
  })

  return (
    <div className="object-bottom bg-red-500 p-3">
      <div>
        <h1>Username: {props.username}</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit} >
          <input
            name="msg"
            type="text"
            placeholder="Escreva aqui sua mensagem..."
            value={values.msg}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button name="send" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default BottomBar;
