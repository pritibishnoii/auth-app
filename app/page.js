import AuthForm from "@/components/AuthForm";
import Image from "next/image";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home () {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={ 3000 } />
      <AuthForm />
    </div>
  );
}
