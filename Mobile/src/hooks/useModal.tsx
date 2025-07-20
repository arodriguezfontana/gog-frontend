import { useState } from "react"
export function useModal() {
    const [isModalShow, setIsModalShow] = useState<boolean>(false);
    const handleCloseModal = () => setIsModalShow(false);
    const handleOpenModal = () => setIsModalShow(true);

    return { isModalShow, handleCloseModal, handleOpenModal }
}