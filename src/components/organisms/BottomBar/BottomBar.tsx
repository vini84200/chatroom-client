import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { useFormik } from "formik";
import * as consts from '../../../consts'
interface Props {
  username: string;
}

function BottomBar(props: Props) {
  // Connection
  let connection = useRef(socketIOClient.connect(consts.CONNECTION_STRING));

  useEffect(function () {
    return () => connection.current.disconnect();
  }, []);


  // Formulario para enviar mensagens
  const {values, handleChange, handleBlur, handleSubmit} = useFormik({
      initialValues: {
          msg: "",
      },
      onSubmit: ({msg}, {setSubmitting}) => {
        if (!msg) return setSubmitting(false)
        connection.current.emit(consts.SEND_MESSEGE, {
            username: props.username,
            message: msg
        })
        setSubmitting(false)
      }
  })

  return (
    <div className="object-bottom p-3">
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
