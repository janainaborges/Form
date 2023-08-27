"use client"
import CustomButton from "@/components/button";
import { useRef, FormEvent, useState } from "react";

interface MessageData {
  type: 'success' | 'error';
  content: string;
}

function InputField({ name, placeholder, type = "text" }: { name: string, placeholder: string, type?: string }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required
      className="border p-2 rounded-md focus:border-blue-500 focus:outline-none transition-colors"
    />
  );
}

function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState<MessageData | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (formRef.current) {
      const formData = new FormData(formRef.current);

      if (!formData.get("name") || !formData.get("email") || !formData.get("message")) {
        setMessage({ type: 'error', content: "Please fill in all required fields." });
        return;
      }

      if (!formData.get("attachment")) {
        setMessage({ type: 'error', content: "Please upload a file." });
        return;
      }

      setMessage({ type: 'success', content: "Foi enviado com sucesso" });
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col">
      <InputField name="name" placeholder="Name" />
      <InputField name="email" placeholder="Email" />
      <InputField name="message" placeholder="Message" type="textarea" />
      <InputField name="attachment" placeholder="Upload" type="file" />
      <CustomButton type="submit" title="Enviar" />
      {message && <p className={`mt-2 ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>{message.content}</p>}
    </form>
  );
}

export default Contact;
