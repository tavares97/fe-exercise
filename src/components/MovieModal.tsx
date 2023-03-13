import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Dispatch, Fragment, SetStateAction } from "react";
import { MoviesI } from "../../types/types";
import { getDateYear } from "../../utils/formatDate";

import { AiFillStar } from "react-icons/ai";

interface MovieModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  movie: MoviesI;
}

const MovieModal: React.FC<MovieModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  movie,
}) => {
  const {
    title,
    poster_path,
    genres,
    release_date,
    vote_average,
    overview,
    direction,
  } = movie;

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm lg:max-w-lg transform overflow-hidden rounded-2xl bg-zinc-900/90 p-6 text-left align-middle shadow-xl transition-all flex flex-col items-center">
                <Image
                  src={poster_path}
                  alt="movie poster"
                  width={200}
                  height={0}
                  className="rounded-md"
                />

                <div className="w-full mt-8">
                  <p className="text-3xl font-bold text-white">{title}</p>

                  <div className="text-yellow-400 flex gap-6">
                    <p>{getDateYear(release_date)}</p>

                    <div className="flex items-center">
                      <AiFillStar />
                      <p className="ml-1 text-sm font-bold text-gray-200 ">
                        {vote_average} / 10
                      </p>
                    </div>

                    <p>{direction}</p>
                  </div>

                  <div className="flex gap-3 mt-3 flex-wrap">
                    {genres.map((genre, index) => (
                      <p
                        className="text-yellow-400 px-4 py-2 bg-zinc-600 rounded-lg"
                        key={index}
                      >
                        {genre}
                      </p>
                    ))}
                  </div>

                  <p className="text-zinc-300 mt-8">{overview}</p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MovieModal;
