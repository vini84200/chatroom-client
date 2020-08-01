import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as consts from '../../../consts'
import { useSocket } from "../../../services/useSocket";
interface Props {
  username: string;
}

function BottomBar(props: Props) {
  // Connection
  let connection = useSocket()

  useEffect(function () {
    return () => connection.disconnect();
  }, [connection]);


  // Formulario para enviar mensagens
  const {values, handleChange, handleBlur, handleSubmit} = useFormik({
      initialValues: {
          msg: "",
      },
      onSubmit: ({msg}, {setSubmitting, setFieldValue}) => {
        if (!msg) return setSubmitting(false)
        connection.emit(consts.SEND_MESSEGE, {
            username: props.username,
            message: msg
        })
        setFieldValue("msg", "")
        setSubmitting(false)
      }
  })

  return (
    <div className="object-bottom p-3">
      <div>
        <span>Username: {props.username}</span>
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
