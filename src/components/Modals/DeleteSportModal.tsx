'use client'

import { FaTrash, FaWindowClose } from "react-icons/fa";

interface DeleteModalProps {
    closeModal: () => void,
    handleDeleteSport: () => void
}


const DeleteSportModal: React.FC<DeleteModalProps> = ({ closeModal, handleDeleteSport }) => {

    return (
        <div id="deleteModal"
            tabIndex={-1}
            className="flex backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <button
                        onClick={closeModal}
                        type="button"
                        className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                        <FaWindowClose width={40} height={40} />
                    </button>
                    <div className="flex justify-center items-center p-10">
                        <FaTrash width={100} height={100} className="w-20 h-20"/>
                    </div>
                    <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this item?</p>
                    <div className="flex justify-center items-center space-x-4">
                        <button
                            onClick={closeModal}
                            type="button"
                            className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                            No, cancel
                        </button>
                        <button
                            onClick={handleDeleteSport}
                            type="button"
                            className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                            Yes, I am sure
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteSportModal;