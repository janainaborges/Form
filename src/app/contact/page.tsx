import CustomButton from "@/components/button";
import { useRef, FormEvent, useState } from "react";

function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);

      if (
        !formData.get("name") ||
        !formData.get("email") ||
        !formData.get("message")
      ) {
        setErrorMessage("Please fill in all required fields.");
        return;
      }

      if (!formData.get("attachment")) {
        setErrorMessage("Please upload a file.");
        return;
      }

      setErrorMessage(null);
      const formDataArray = Array.from(formData.entries());
      console.log(formDataArray);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col">
      <input
        name="name"
        placeholder="Name"
        required
        className={`border p-2 rounded-md focus:border-blue-500 focus:outline-none transition-colors`}
      />
      <input
        name="email"
        placeholder="Email"
        required
        className={`border p-2 rounded-md focus:border-blue-500 focus:outline-none transition-colors`}
      />
      <textarea
        name="message"
        placeholder="Message"
        required
        className={`border p-2 rounded-md focus:border-blue-500 focus:outline-none transition-colors`}
      ></textarea>
      <input
        type="file"
        name="attachment"
        required
        className={`border p-2 rounded-md focus:border-blue-500 focus:outline-none transition-colors`}
      />
      <CustomButton type="submit" title="Enviar" />
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </form>
  );
}

export default Contact;
