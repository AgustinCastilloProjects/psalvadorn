'use client'

import { FaEye, FaDownload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Sport } from "@/models";
import { api } from "@/utils";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import DeleteSportModal from "@/components/Modals/DeleteSportModal";
import toast from "react-hot-toast";
import Footer from "@/components/Footer/Footer";


export default function Home() {
  const [sports, setSports] = useState<Sport[]>()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteSportId, setDeleteSportId] = useState<number | null>(null)

  useEffect( () => {
    api.get(`sports`).then( res => {
      setSports(res.data.response)
    })
  }, [])

  const openDeleteModal = (sportId: number) => {
      setDeleteSportId(sportId)
      setShowDeleteModal(true)
  }

  const closeDeleteModal = () => {
    console.log('closing modal')
    setShowDeleteModal(false)
  }

  const confirmDeleteSport = () => {
    console.log('Deleting: ', deleteSportId)
    if(deleteSportId){
        api.delete(`sports/${deleteSportId}`).then( (res) => {
          setSports(res.data.data)
          setShowDeleteModal(false)
          setDeleteSportId(null)
          toast.success(res.data.message)
        })
    }
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24">
      <div className="w-full">
          <div className="flex justify-between items-center mb-6 flex-wrap">
            <h1 className="text-3xl">Listagem dos esportes cadastrados</h1>
            <Link href="/cadastro" className="bg-blue-400 text-white rounded-lg p-2 text-sm">Cadastrar novo esporte</Link>
          </div>
          <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400 table-fixed">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sm:text-center">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Esporte
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Jogadores por Equipe
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Ver Livro de Regras
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Baixar Livro de Regras
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Deletar
                      </th>
                  </tr>
              </thead>
                <tbody>
                  {sports?.map( sport => (
                    <tr key={sport.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 sm:text-center sm:justify-center">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <Link href={`cadastro/${sport.id}`}>{sport.name}</Link>
                      </th>
                      <td className="px-6 py-4">
                          {sport.playersPerTeam}
                      </td>
                      <td className="px-6 py-4 mx-auto">
                        <div className="flex justify-center items-center">
                          <Link href={sport.rulesUrl} target="_blank"><FaEye width={50} height={50} /></Link>
                        </div>
                      </td>
                      <td className="px-6 py-4 mx-auto">
                        <div className="flex justify-center items-center">
                          <Link href={`${sport.rulesUrl}?download=1`} target="_blank"><FaDownload width={50} height={50} /></Link>
                        </div>
                      </td>
                      <td className="px-6 py-4 mx-auto">
                        <div className="flex justify-center items-center">
                          <Link href="" onClick={() => openDeleteModal(sport.id)}><MdDelete width={50} height={50} /></Link>
                        </div>
                      </td>
                  </tr>
                  ))}
                </tbody>
          </table>
      </div>
      {showDeleteModal && <DeleteSportModal closeModal={closeDeleteModal} handleDeleteSport={confirmDeleteSport} />}
    </main>
  );
}
