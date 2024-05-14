import { ReactNode } from "react";

interface IModal {
    isVisible: boolean
    onClose: () => void
    children: ReactNode
    title: string
    titleColor?: string
}

const Modal = ({ isVisible, onClose, title, titleColor, children }: IModal) => {
    if (!isVisible) return;
    const handleClose = (e: any) => {
        if (e.target.id === 'popup-modal') onClose();
    }
    return (
        <div id="popup-modal" onClickCapture={handleClose} className={`fixed inset-0 bg-black bg-opacity-15 backdrop-blur-sm flex justify-center items-center overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 w-full md:inset-0 lg:py-5 max-h-full h-screen`} onClick={() => { handleClose }}>
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className=" flex justify-around items-center border-b border-palette-line p-2">
                        <p className={`text-xl lg:text-lg pl-4 font-bold ${titleColor}`}>{title}</p>
                        <button onClick={() => onClose()} type="button" className="top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <div className="bg-white rounded-lg">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Modal;