'use client'

import { SportForm } from "@/models";
import { sportSchema } from "@/utils/";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

interface SportsFormProps {
    handleSubmitForm: SubmitHandler<SportForm>
}


const SportsForm: React.FC<SportsFormProps> = ({ handleSubmitForm }) => {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<SportForm>({
        resolver: zodResolver(sportSchema)
    });



    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <h1 className="text-center text-2xl text-black-600 my-4">Cadastrar novo esporte</h1>
            <div className="grid grid-cols-2 gap-4">
                <div className="relative mb-6" data-twe-input-wrapper-init>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome do Esporte</label>
                    <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                        placeholder="Nome do Esporte"
                        {...register('name')}
                    />
                    {errors.name && <span className='text-mikasa-red text-sm text-center pt-2 mx-auto'>{errors.name.message}</span>}
                </div>
                <div className="relative mb-6" data-twe-input-wrapper-init>
                    <label htmlFor="exampleInput124" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jogadores por equipe</label>
                    <input
                        type="number"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                        placeholder="Número de Jogadores por Equipe"
                        {...register('playersPerTeam')}
                    />
                    {errors.playersPerTeam && <span className='text-mikasa-red text-sm text-center pt-2 mx-auto'>{errors.playersPerTeam.message}</span>}
                </div>
            </div>
            <div className="relative mb-6" data-twe-input-wrapper-init>
                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">Upload file</label>
                <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                    id="file_input"
                    type="file"
                    {...register('rules')}
                />
            </div>
            <button disabled={isSubmitting} type="submit" className="inline-block w-full rounded bg-blue-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2">
                {isSubmitting ? 'Salvando...' : 'Salvar'}
            </button>
        </form>
    )
}

export default SportsForm;