import { createRef } from "react";
import { FiCheckSquare } from "react-icons/fi";

import { Form } from "./styles";
import { Modal } from "../Modal";
import Input from "../Input";
import { FormHandles } from "@unform/core";

interface ValuesForm {
  image: string;
  price: string;
  description: string;
  name: string;
}

interface Props {
  setIsOpen: () => void;
  handleAddFood: (data: ValuesForm) => void;
  isOpen: boolean;
}

export const ModalAddFood: React.FC<Props> = ({
  setIsOpen,
  handleAddFood,
  isOpen,
}) => {
  const formRef = createRef<FormHandles>();

  const handleSubmit = async (values: ValuesForm) => {
    handleAddFood(values);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};
