'use client'

import { Fragment } from "react"
import { Dialog,Transition } from "@headlessui/react"

interface ModalProps {
  isOpen?: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen,onClose,children }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-out duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className="fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="min-h-full flex items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-out duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className="w-full relative transform overflow-hidden bg-white transition-all sm:max-w-lg">
                <button
                  type="button"
                  className="absolute top-0 right-0 hidden sm:block"
                  onClick={onClose}
                >
                  Close
                </button>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default Modal
