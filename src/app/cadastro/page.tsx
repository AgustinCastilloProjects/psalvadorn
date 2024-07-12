'use client'

import SportsForm from "@/components/Forms/SportsForm";
import { SportForm } from "@/models";
import { api } from "@/utils";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

const Cadastro: React.FC = () => {
    const router = useRouter()

    const handleSubmitForm: SubmitHandler<SportForm> = async (data) => {

        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('playersPerTeam', data.playersPerTeam.toString())
        formData.append('rules', data.rules[0])
        console.log(data.rules[0])
        api.post('sports', formData).then(res => {
            toast.success(res.data.message)
            router.push('/')
        })
    }


    return (
        <div className="mx-auto block max-w-md rounded-lg bg-white p-6 shadow-4 dark:bg-surface-dark">
            <SportsForm handleSubmitForm={handleSubmitForm}/>
        </div>
    )
}

export default Cadastro;