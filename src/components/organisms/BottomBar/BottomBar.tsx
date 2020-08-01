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
    <div className="object-bottom p-3 bg-blue-900 text-gray-300">
      <div>
        <span>Username: {props.username}</span>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="flex" >
          <input
            className="flex-1 bg-gray-700 text-blue-100 rounded-lg text-lg py-1 px-2 outline-none focus:border focus:border-gray-200"
            name="msg"
            type="text"
            placeholder="Escreva aqui sua mensagem..."
            value={values.msg}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button name="send" type="submit" className="ml-3 px-3 py-1 text-lg rounded-lg border border-gray-400 hover:bg-gray-200 hover:text-gray-900">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default BottomBar;
