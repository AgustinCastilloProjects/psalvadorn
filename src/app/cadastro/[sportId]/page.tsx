'use client'

import { SportForm } from "@/models";
import { sportSchema } from "@/utils/";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const SingleSportPage: React.FC = () => {
    const sportId = usePathname().split('/')[2]

    const [editing, setEditing] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<SportForm>({
        resolver: zodResolver(sportSchema)
    });

    const handleSubmitForm: SubmitHandler<SportForm> = async (data) => {
        api.patch(`/api/sports/${sportId}`, {
            name: data.name,
            playersPerTeam: data.playersPerTeam,
            rules: data.rules
        })
    }


    return (
        <div className="mx-auto block max-w-md rounded-lg bg-white p-6 shadow-4 dark:bg-surface-dark">
            <form onSubmit={handleSubmit(handleSubmitForm)}>
            <h1 className="text-center text-2xl text-black-600 my-4">Cadastrar novo esporte</h1>
            {!editing && <button type="button" onClick={() => setEditing(true)} className="inline-block w-full rounded bg-blue-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2">
                    Editar Esporte
                </button>}
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative mb-6" data-twe-input-wrapper-init>
                        <input
                            disabled={!editing}
                            type="text"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0" 
                            placeholder="Nome do Esporte"
                            {...register('name')}
                        />
                        <label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-300 dark:peer-focus:text-primary">Nome do Esporte</label>
                        {errors.name && <span className='text-mikasa-red text-sm text-center pt-2 mx-auto'>{errors.name.message}</span>}
                    </div>
                    <div className="relative mb-6" data-twe-input-wrapper-init>
                        <input
                            disabled={!editing}
                            type="number"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                            placeholder="Número de Jogadores por Equipe"
                            {...register('playersPerTeam')}
                        />
                        <label htmlFor="exampleInput124" className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-300 dark:peer-focus:text-primary">Número de Jogadores por equipe</label>
                        {errors.playersPerTeam && <span className='text-mikasa-red text-sm text-center pt-2 mx-auto'>{errors.playersPerTeam.message}</span>}
                    </div>
                </div>
                <div className="relative mb-6" data-twe-input-wrapper-init>
                    <input
                        disabled={!editing}
                        type="text"
                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                        {...register('rules')}
                    />
                    <label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-300 dark:peer-focus:text-primary">Livro de Regras</label>
                </div>
                {editing && <button disabled={isSubmitting} type="submit" className="inline-block w-full rounded bg-blue-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2">
                    {isSubmitting ? 'Salvando...' : 'Salvar'}
                </button>}
            </form>
        </div>
    )
}

export default SingleSportPage;