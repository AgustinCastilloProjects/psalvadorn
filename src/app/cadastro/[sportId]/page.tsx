'use client'

import SportsForm from "@/components/Forms/SportsForm";
import { Sport, SportForm } from "@/models";
import { api } from "@/utils/api";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { FaDownload, FaEdit, FaEye } from "react-icons/fa";


const SingleSportPage: React.FC = () => {
    const sportId = usePathname().split('/')[2]

    const [editing, setEditing] = useState(false)
    const [sport, setSport] = useState<Sport>()

    const router = useRouter()

    useEffect( () => {
        api.get(`sports/${sportId}`).then( (res) => {
            setSport(res.data.data)
        })
    }, [])

    const handleSubmitForm: SubmitHandler<SportForm> = async (data) => {
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('playersPerTeam', data.playersPerTeam.toString())
        formData.append('rules', data.rules[0])

        api.patch(`sports/${sportId}`, formData).then( res => {
            toast.success(res.data.message)
            router.push('/')
        })
    }


    return (
        <div className="mx-auto block w-[30%] rounded-lg bg-white p-6 shadow-4 dark:bg-surface-dark">
        {!editing ?
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-center text-2xl text-black-600 my-4">Consultar esporte</h1>
                <FaEdit className="hover:cursor-pointer" onClick={() => setEditing(true)} width={40} height={40}/>
            </div>
            <table className="w-[80%] text-sm text-center text-gray-500 dark:text-gray-400 mx-auto">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
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
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center justify-center">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {sport?.name}
                    </th>
                    <td className="px-6 py-4">
                        {sport?.playersPerTeam}
                    </td>
                    <td className="px-6 py-4 mx-auto">
                        <div className="flex justify-center items-center">
                        <Link href={(sport) ? sport?.rulesUrl : ''} target="_blank"><FaEye width={50} height={50} /></Link>
                        </div>
                    </td>
                    <td className="px-6 py-4 mx-auto">
                        <div className="flex justify-center items-center">
                        <Link href={`${sport?.rulesUrl}?download=1`} target="_blank"><FaDownload width={50} height={50} /></Link>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </>
        :
            <SportsForm handleSubmitForm={handleSubmitForm} />
        }
        </div>
    )
}

export default SingleSportPage;